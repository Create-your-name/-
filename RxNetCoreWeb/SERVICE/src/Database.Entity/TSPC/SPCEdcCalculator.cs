using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;


namespace SPCService.BusinessModel
{



    public class SpcEdcCalculator
    {
        private const string min = "MIN()";
        private const string max = "MAX()";
        private const string range = "RANGE()";
        private const string sum = "SUM()";
        private const string mean = "MEAN()";
        private const string stddev = "STDDEV()";
        private const string count = "COUNT()";
        private const string abs = "Abs()";
        private const string cp = "Cp()";
        private const string cpk = "Cpk()";
        private const string cpl = "Cpl()";
        private const string cpu = "Cpu()";
        private const string ccr = "Ccr()";
        private const string exponent = "Exp()";
        private const string logarithm = "Log10()";
        private const string lognatural = "LogN()";
        private const string delta = "Delta(,)";
        private const string add = "Add(,)";
        private const string subtract = "Subtract(,)";
        private const string multiply = "Multiply(,)";
        private const string divide = "Divide(,)";
        private const string mod = "Mod(,)";
        private const string div = "Div(,)";
        private const string power = "Power(,)";

        private const int DATA_TYPE_FLOAT = 0;
        private const int DATA_TYPE_INTEGER = 1;
        private const int DATA_FLOAT_DIV_BY_ZERO = 2;
        private const int DATA_INT_DIV_BY_ZERO = 3;
        private const int DATA_LOG_OF_NEGATIVE = 4;

        private const int HANDLING_BY_UNIT = 0;
        private const int HANDLING_BY_SITE = 1;
        private const int HANDLING_ENTIRE_SAMPLE = 2;

        private const string byUnit = "BYUNIT";
        private const string bySite = "BYSITE";
        private const string derived = "DERIVED";
        private const string entireSample = "ENTIRESAMPLE";
        private const string individually = "INDIVIDUALLY";


        private const string PositiveInf = " TooLarge";
        private const string NegativeInf = " TooSmall";

        static uint HashStr4(string s)
        {
            byte[] bytes = System.Text.Encoding.Default.GetBytes(s.Substring(0, 4));
            if (BitConverter.IsLittleEndian)
                Array.Reverse(bytes);

            return (uint)BitConverter.ToInt32(bytes, 0);


            //        static unsigned int HashStr4(const FwString&s)
            //{
            //            unsigned int hash;
            //            if (RWCString::getCaseSensitiveFlag())
            //                memcpy(&hash, s.data(), 4);
            //            else
            //                memcpy(&hash, ::toUpper(s).data(), 4);
            //            return hash;
            //        }
        }


        public static SPCErrCodes validate(string mtype, string op, string dhtype)
        {
            // validate this combination of measurement type, operator,
            // and data handling type


            SPCErrCodes noErr = SPCErrCodes.ok;
            int opHash = HashValidOp(op);


            if ( opHash != (int) EdcOpName.EDC_OP_UNKNOWN)
            {
                if (isMath(opHash) || isConversion(opHash))
                {
                    if (dhtype == "INDIVIDUALLY")
                    {
                        return noErr;
                    }
                    else
                    {
                        return SPCErrCodes.invalidHandlingTypeForOp ; 
                    }
                }
                if (isStat(opHash))
                {
                    if (dhtype == "ENTIRESAMPLE")  // valid for all meas types
                    {
                        return noErr;
                    }
                    else if (dhtype == "INDIVIDUALLY") // not valid for these operators
                    {
                        return SPCErrCodes.invalidHandlingTypeForOp; 
                    }
                    else if ((mtype == "SITE") &&
                         ((dhtype == "BYSITE") || (dhtype == "BYUNIT")))
                    {
                        // site level measurements can be grouped by site or unit

                        return noErr;
                    }
                    else
                    {
                        return SPCErrCodes.invalidMeasType; 
                    }
                }
            }

              return SPCErrCodes.notYetImplemented;
        }

        public bool limitOperand(List<TEdcDataPoint> dataSet,
                              string dataSelection,
                             TEdcMeasurement operand)
        {
            bool noErr;
            string val;

            if (operand == null)
            {
                throw new Exception(SPCErrCodes.badArgsPassed.ToString());
            }
            TEdcMeasurementSpec specRef = operand.getMeasurementSpec();
            if (dataSelection == "UpperScreeningLimit")
            {
                val = specRef.customUpperScreeningLimit;
            }
            else if (dataSelection == "LowerScreeningLimit")
            {
                val = specRef.customLowerScreeningLimit;
            }
            else if (dataSelection == "UpperSpecLimit")
            {
                val = specRef.customUpperSpecLimit;
            }
            else if (dataSelection == "LowerSpecLimit")
            {
                val = specRef.customLowerSpecLimit;
            }
            else
            {
                val = specRef.customTarget;
            }

            TEdcDataPoint objPtr;
            TEdcDataPoint tmpRef;
            int numEntries = dataSet.Count;

            for (int indx = 0; indx < numEntries; indx++)
            {
                objPtr = dataSet[indx];

                tmpRef = objPtr;
                tmpRef.value = val;
            }

            return true;
        }

        public int SpcEdcAsInt(string str)
        {
            // for now use dtpf, but EDC has to support add'l formats

            int retval = int.Parse(str);
            return retval;
        }


        public double SpcEdcAsDouble(string str)
        {
            // for now use dtpf, but EDC has to support add'l formats

            double retval = double.Parse(str);
            return retval;
        }


        public string SpcEdcFromInt(int i)
        {
            // for now use dtpf, but EDC has to support add'l formats

            // FwString retval = FwString::fromInt(i);

            string retval = i.ToString();
            return retval;
        }


        public string SpcEdcFromDouble(double d)
        {
            // for now use dtpf, but EDC has to support add'l formats

            string retval;
            float f = (float)d;
            //retval << f;
            retval = f.ToString();
            return retval;
        }


        public static int SpcEdcDoubleToInt(double dVal)
        {
            // convert from double-precision floating point 
            // to the nearest integer

            if (dVal > 0)
                dVal = dVal + 0.5;
            else if (dVal < 0)
                dVal = dVal - 0.5;

            return (int)dVal;  // auto truncate
        }

        public SPCErrCodes performCalculation(TEdcMeasurementSpec specRef,
                            TEdcMeasurementSpec sourceSpecRef,
                            TEdcMeasurement operand1,
                            TEdcMeasurement operand2,
                            List<TEdcDataPoint> results)
        {

            // validate the inputs

            if (specRef == null || sourceSpecRef == null)
            {
                return SPCErrCodes.badArgsPassed;
            }

            TEdcSamplingPlan samplRef = sourceSpecRef.samplingPlan;
            TEdcDerivation derivRef = specRef.derivation;

            if (!sourceSpecRef.isDerived && samplRef == null)
            {
                return SPCErrCodes.incompleteObject;
            }

            // extract the operator, datasets, data type, and data handling type
            int opHash;
            opHash = HashValidOp(derivRef.edcOperator);
            if (opHash == (int)EdcOpName.EDC_OP_UNKNOWN)
            {
                return SPCErrCodes.notYetImplemented;
            }

            List<TEdcDataPoint> dataSetOne = new List<TEdcDataPoint>();
            if (operand1 != null)
            {
                foreach (TEdcDataPoint bRef in operand1.datapoints)
                {
                    if (bRef != null)
                    {
                        TEdcDataPoint aRef = bRef;
                        string key = aRef.sequence.ToString().PadLeft(2, '0');

                        dataSetOne.Add(aRef);
                    }
                }

                if (derivRef.data1 != "DataCollection" && derivRef.data1 != "")
                    limitOperand(dataSetOne, derivRef.data1, operand1);
            }
            else if (derivRef.operand1 == " ")
            {
                TEdcDataPoint dataPtRef = new TEdcDataPoint();
                dataPtRef.sequence = 0;
                dataPtRef.value = derivRef.operand1;
                dataSetOne.Add(dataPtRef);
            }
            int dataType;
            int dataHandlingType = -1;  // Need to initialize this to something or else is used without being init'ed below.

            // we will be converting inputs to the data type of the result, ie. 
            // floating point arithmetic is supported for integers, and
            // integer math for floats

            if (specRef.dataType == "FLOAT")
                dataType = DATA_TYPE_FLOAT;
            else if (specRef.dataType == "INTEGER")
                dataType = DATA_TYPE_INTEGER;
            else
            {
                // the data type is invalid for calculations
                return SPCErrCodes.invalidDataTypeForCalc;
            }

            results.Clear();

            // now do the actual calculation

            bool retStatus;
            int groupSize = -1;

            if (isStat(opHash))
            {
                if (derivRef.dataHandlingType == byUnit)
                {
                    dataHandlingType = HANDLING_BY_UNIT;
                    // by unit subgrouping is the most common
                    if (samplRef != null)
                    {
                        if (operand1 == null)    // optional meas not provided
                            groupSize = samplRef.numberOfUnits; // number of groups
                        else
                            groupSize = samplRef.numberOfSites;
                    }
                }
                else if (derivRef.dataHandlingType == bySite)
                {
                    dataHandlingType = HANDLING_BY_SITE;
                    if (samplRef != null)
                    {
                        if (operand1 == null)    // optional meas not provided
                            groupSize = samplRef.numberOfSites; // number of groups
                        else
                            groupSize = samplRef.numberOfUnits;
                    }
                }
                else if (derivRef.dataHandlingType == entireSample)
                {
                    dataHandlingType = HANDLING_ENTIRE_SAMPLE;
                    if (operand1 == null)
                        groupSize = 1;                 // number of groups
                    else
                        groupSize = dataSetOne.Count;
                }

                if (groupSize == -1)
                {
                    return SPCErrCodes.invalidDataHandlingType;
                }

                if (operand1 != null)
                {
                    derivRef.dataHandlingType = derived;
                    return statistic(opHash, dataSetOne, dataType,
                             dataHandlingType, groupSize, out results);
                }
            }
            else
            {
                if (derivRef.dataHandlingType != individually)
                {
                    return SPCErrCodes.invalidDataHandlingType;

                }
                if (isMath(opHash))
                {
                    List<TEdcDataPoint> dataSetTwo = new List<TEdcDataPoint>();
                    if (operand2 != null)
                    {
                        foreach (TEdcDataPoint bRef in operand2.datapoints)
                        {
                            TEdcDataPoint aRef = bRef;

                            dataSetTwo.Add(aRef);
                        }


                        if (derivRef.data2 != "DataCollection" && derivRef.data2 != null)
                            limitOperand(dataSetTwo, derivRef.data2, operand2);

                        if (operand1 == null)
                        {
                            groupSize = dataSetTwo.Count;
                        }
                    }
                    else if (derivRef.operand2 == " ")
                    {
                        if (operand1 != null)
                        {
                            // const operand
                            TEdcDataPoint dataPtRef = new TEdcDataPoint();
                            dataPtRef.sequence = 0;
                            dataPtRef.value = derivRef.operand2;
                            dataSetTwo.Add(dataPtRef);
                        }
                        else
                        {
                            groupSize = sourceSpecRef.sampleSize;
                        }
                    }
                    else if (operand1 != null)
                    {
                        // operand2 is optional and missing ; operand1 provided
                        groupSize = dataSetOne.Count;
                    }
                    else
                    {
                        // both operands are optional and missing
                        groupSize = sourceSpecRef.sampleSize;
                    }
                    if (groupSize == -1)
                        return mathematics(opHash, dataSetOne, dataType,
                               dataSetTwo, out results);
                }
                else
                {
                    if (operand1 != null)
                        return conversion(opHash, dataSetOne, dataType, out results);
                    groupSize = sourceSpecRef.sampleSize;
                }
            }

            // insert the missing value for the derived data
            for (int indx = 0; indx < groupSize; indx++)
            {
                TEdcDataPoint dataPtRef = new TEdcDataPoint();
                dataPtRef.sequence = indx;
                results.Add(dataPtRef);

            }

            return SPCErrCodes.ok;
        }


        public SPCErrCodes conversion(int op, List<TEdcDataPoint> dataSetOne,
              int dataType, out List<TEdcDataPoint> results)
        {
            // this method handles calculations that perform a conversion
            // or other transformation on individual values from the input
            // dataset
            results = new List<TEdcDataPoint>();

            if (!isConversion(op))
            {
                return SPCErrCodes.notYetImplemented;
            }

            TEdcDataPoint objPtr;
            TEdcDataPoint tmpRef;

            int numEntries = dataSetOne.Count;

            for (int indx = 0; indx < numEntries; indx++)
            {
                objPtr = dataSetOne[indx];

                tmpRef = objPtr;

                TEdcDataPoint dataPtRef = new TEdcDataPoint();

                dataPtRef.sequence = (indx);

                // has the same identifiers as the input data regardless

                dataPtRef.sampleId = (tmpRef.sampleId);
                dataPtRef.unitId = (tmpRef.unitId);
                dataPtRef.siteId = (tmpRef.siteId);

                string valStr = (tmpRef.value);
                double newVal;

                // don't convert missing values
                if (valStr == PositiveInf || valStr == NegativeInf)
                {
                    newVal = valStr == PositiveInf ? (double)1e31 : (double)-1e31;
                    dataPtRef.convertValue(newVal, dataType);
                }
                else if (!((StringUtil.NullString(valStr)) || tmpRef.isExcluded))
                {
                    // use double for the actual operation and convert back if nec.
                    newVal = SpcEdcAsDouble(valStr);

                    switch (op)
                    {
                        case (int)EdcOpName.EDC_OP_ABS:
                            if (newVal < 0)
                                newVal = -newVal;
                            break;
                        case (int)EdcOpName.EDC_OP_EXPONENT:
                            newVal = Math.Exp(newVal);
                            break;
                        case (int)EdcOpName.EDC_OP_LOGARITHM:
                            if (newVal <= 0)
                                dataType = DATA_LOG_OF_NEGATIVE;
                            else
                                newVal = Math.Log10(newVal);
                            break;
                        default:             // case EDC_OP_LOGNATURAL:
                            if (newVal <= 0)
                                dataType = DATA_LOG_OF_NEGATIVE;
                            else
                                newVal = Math.Log(newVal);
                            break;
                    }
                    dataPtRef.convertValue(newVal, dataType);
                }

                results.Add(dataPtRef);


            } // for

            return SPCErrCodes.ok;
        }


        public static bool isMath(int op)
        {
            // is this a math operator
            switch (op)
            {
                case (int)EdcOpName.EDC_OP_DELTA:
                case (int)EdcOpName.EDC_OP_ADD:
                case (int)EdcOpName.EDC_OP_SUBTRACT:
                case (int)EdcOpName.EDC_OP_MULTIPLY:
                case (int)EdcOpName.EDC_OP_DIVIDE:
                case (int)EdcOpName.EDC_OP_MOD:
                case (int)EdcOpName.EDC_OP_DIV:
                case (int)EdcOpName.EDC_OP_POWER:
                    return true;

                default:
                    break;
            }
            return false;
        }
        public static bool isStat(int op)
        {
            // is this a statistical operator
            switch (op)
            {
                case (int)EdcOpName.EDC_OP_MEAN:
                case (int)EdcOpName.EDC_OP_RANGE:
                case (int)EdcOpName.EDC_OP_STDDEV:
                case (int)EdcOpName.EDC_OP_MIN:
                case (int)EdcOpName.EDC_OP_MAX:
                case (int)EdcOpName.EDC_OP_COUNT:
                case (int)EdcOpName.EDC_OP_SUM:
                    return true;

                default:
                    break;
            }
            return false;
        }


        public SPCErrCodes SpcEdcGroupByUnit(List<TEdcDataPoint> srcColl,
                int groupSize, out List<List<TEdcDataPoint>> subgroups)
        {
            // NOTE: This method assumes that it is receiving a collection
            // of data points from a site-based sample, in unit order, 
            // with missing values filled, and it separates the data into 
            // nested collections of sugroups by unit
            //
            // IMPORTANT: The results collection should be empty and own its objects.

            subgroups = new List<List<TEdcDataPoint>>();

            int numEntries = srcColl.Count;
            TEdcDataPoint objPtr;
            TEdcDataPoint tmpRef;
            List<TEdcDataPoint> tmpColl = new List<TEdcDataPoint>();

            // NB: FwOrdered collections are zero-based

            for (int indx = 0; indx < numEntries;)
            {
                objPtr = srcColl[indx];

                tmpRef = objPtr;

                tmpColl.Add(tmpRef);

                if (((++indx) % groupSize) == 0)
                {
                    subgroups.Add(tmpColl);

                    tmpColl = new List<TEdcDataPoint>();
                }
            }
            return SPCErrCodes.ok;
        }


        public SPCErrCodes SpcEdcGroupBySite(List<TEdcDataPoint> srcColl,
                                 int groupSize, out List<List<TEdcDataPoint>> subgroups)
        {
            // NOTE: This method assumes that it is receiving a collection
            // of data points from a site-based sample, in unit order, 
            // with missing values filled, and it separates the data into 
            // nested collections of sugroups by site

            // IMPORTANT: The results collection should be empty and own its objects.

            subgroups = new List<List<TEdcDataPoint>>();

            int numEntries = srcColl.Count;

            // make sure the number of inputs is divisible by the group size

            if ((numEntries % groupSize) != 0)
            {
                return SPCErrCodes.badSampleSize;
            }

            // create a nested collection for each subgroup

            int numOfGroups = numEntries / groupSize;

            for (int cnt = 0; cnt < numOfGroups; cnt++)
            {
                List<TEdcDataPoint> tmpColl = new List<TEdcDataPoint>();
                subgroups.Add(tmpColl);
            }

            // now add the inputs to the appropriate subgroup
            for (int indx = 0; indx < numEntries; indx++)
            {
                // get the target subgroup

                int sub_indx = indx % numOfGroups;

                List<TEdcDataPoint> tmpColl = subgroups[sub_indx];
                TEdcDataPoint objPtr = srcColl[indx];

                TEdcDataPoint tmpRef = objPtr;

                tmpColl.Add(tmpRef);
                //if (!tmpColl->append(newRef))
                //{
                //    // ERROR!!! Inserting a pointer into a collection will garbage-collect
                //    // the object if it fails to be inserted. DO NOT DELETE ON FAILURE!
                //    //        delete newRef;
                //    FwError err(FwErrorCode(FwEdc, cltnInsertErr));
                //    return err;
                //}
            }

            return SPCErrCodes.ok;
        }

        private SPCErrCodes SpcEdcGroupSample(List<TEdcDataPoint> srcColl,
                                 out List<List<TEdcDataPoint>> subgroups)
        {
            // NOTE: This method assumes that it is receiving a collection
            // of data points and it nests it in an inner collection for 
            // compatibility with the SITE measurement type

            subgroups = new List<List<TEdcDataPoint>>();

            List<TEdcDataPoint> tmpColl = new List<TEdcDataPoint>();
            subgroups.Add(tmpColl);


            int numEntries = srcColl.Count;

            for (int indx = 0; indx < numEntries; indx++)
            {
                TEdcDataPoint objPtr = srcColl[indx];
                tmpColl.Add(objPtr);

            }

            return SPCErrCodes.ok;
        }


        public SPCErrCodes statistic(int op, List<TEdcDataPoint> dataSetOne,
                   int dataType, int dataHandlingType,
                               int groupSize, out List<TEdcDataPoint> results)
        {
            // this method handles calculates a statistic for subgroups
            // or a single group comprised of the input dataset
            results = new List<TEdcDataPoint>();

            // dataSetOne.entries() == 0 means measSpec is optional and thus no data
            if ((int)dataSetOne.Count > 0 && groupSize > (int)dataSetOne.Count)
            {
                return SPCErrCodes.badSampleSize;
            }

            List<List<TEdcDataPoint>> subgroups = new List<List<TEdcDataPoint>>();

            // STEP 1: scrub the data

            if (!isStat(op))
            {
                return SPCErrCodes.notYetImplemented;
            }

            SPCErrCodes retStat;
            int numGroups;

            switch (dataHandlingType)
            {
                case HANDLING_BY_UNIT:
                    retStat = SpcEdcGroupByUnit(dataSetOne, groupSize, out subgroups);
                    break;
                case HANDLING_BY_SITE:
                    retStat = SpcEdcGroupBySite(dataSetOne, groupSize, out subgroups);
                    break;
                default:
                    retStat = SpcEdcGroupSample(dataSetOne, out subgroups);
                    break;
            }
            if (retStat != SPCErrCodes.ok)
                return retStat;

            numGroups = subgroups.Count;

            // STEP 2: calculate statistics

            List<TEdcDataPoint> objPtr;
            List<TEdcDataPoint> tmpColl;
            TEdcDataPoint tmpRef;

            for (int indx = 0; indx < numGroups; indx++)
            {
                // extract the first nested collection
                objPtr = subgroups[indx];

                tmpColl = objPtr;

                // do the arithmetic as double-precision floating point 
                // and convert back later if nec.

                int iCount = 0; // number of non-missing values
                double dMin = 0;
                double dMax = 0;
                double dSum = 0;

                string unitId = "";  // for group by unit
                string siteId = "";  // for group by site

                groupSize = tmpColl.Count;
                double[] dVals = new double[0];
                if ((int)EdcOpName.EDC_OP_STDDEV == op)
                    dVals = new double[groupSize];

                int sub_indx = 0;
                double dVal = 0;
                double newVal = 0;
                bool doMath = true;

                for (sub_indx = 0; sub_indx < groupSize; sub_indx++)
                {
                    tmpRef = tmpColl[sub_indx];


                    // don't include missing or excluded values
                    string valStr = tmpRef.value;
                    if (valStr == PositiveInf || valStr == NegativeInf)
                    {
                        newVal = valStr == PositiveInf ? (double)1e31 : (double)-1e31;
                        doMath = false;
                        iCount = 1;
                        break;
                    }
                    if (!(StringUtil.NullString(valStr) || tmpRef.isExcluded))
                    {
                        dVal = SpcEdcAsDouble(valStr);

                        if (iCount == 0)
                        {
                            dMin = dVal;
                            dMax = dVal;
                        }
                        else if (dVal < dMin)
                            dMin = dVal;
                        else if (dVal > dMax)
                            dMax = dVal;

                        dSum = dSum + dVal;
                        if ((int)EdcOpName.EDC_OP_STDDEV == op)
                            dVals[iCount] = dVal;
                        iCount++;
                    }

                    // get a valid identifier for this group
                    if (dataHandlingType == HANDLING_BY_UNIT &&
                        (StringUtil.NullString(unitId) && (!StringUtil.NullString(valStr))))
                    {
                        unitId = tmpRef.unitId;
                    }
                    else if (dataHandlingType == HANDLING_BY_SITE &&
                         (StringUtil.NullString(siteId) && (!StringUtil.NullString(valStr))))
                    {
                        siteId = tmpRef.siteId;
                    }

                }  // end for

                TEdcDataPoint dataPtRef = new TEdcDataPoint();
                dataPtRef.sequence = (indx);

                if (iCount > 0)
                {
                    if (doMath)
                    {
                        // we found at least one valid value, set value based on
                        // what we are calculating (the operator)
                        switch (op)
                        {
                            case (int)EdcOpName.EDC_OP_MIN:
                                newVal = dMin;
                                break;
                            case (int)EdcOpName.EDC_OP_MAX:
                                newVal = dMax;
                                break;
                            case (int)EdcOpName.EDC_OP_RANGE:
                                newVal = dMax - dMin;
                                break;
                            case (int)EdcOpName.EDC_OP_SUM:
                                newVal = dSum;
                                break;
                            case (int)EdcOpName.EDC_OP_MEAN:
                                newVal = dSum / iCount;
                                break;
                            case (int)EdcOpName.EDC_OP_COUNT:
                                newVal = iCount;
                                break;
                            default:            // case EDC_OP_STDDEV:
                                newVal = 0;
                                dSum /= iCount;
                                for (sub_indx = 0; sub_indx < iCount; sub_indx++)
                                {
                                    dVal = dVals[sub_indx] - dSum;
                                    newVal += dVal * dVal;
                                }
                                newVal = Math.Sqrt(newVal / iCount);
                                dVals = null;
                                break;
                        }
                    }

                    // convert to correct data type
                    dataPtRef.convertValue(newVal, dataType);
                }
                switch (dataHandlingType)
                {
                    case HANDLING_BY_UNIT:
                        dataPtRef.unitId = (unitId);
                        break;
                    case HANDLING_BY_SITE:
                        dataPtRef.siteId = (siteId);
                        break;
                    default:
                        {
                            // for entiresample
                            string sampleId = "Sample" + indx.ToString();
                            dataPtRef.sampleId = (sampleId);
                        }
                        break;
                }
                results.Add(dataPtRef);
            }

            return SPCErrCodes.ok;
        }

        public SPCErrCodes mathematics(int op, List<TEdcDataPoint> dataSetOne,
               int dataType, List<TEdcDataPoint> dataSetTwo,
                          out List<TEdcDataPoint> results)
        {
            // this method handles mathematical operations on paired 
            // values from two input datasets
            results = new List<TEdcDataPoint>();

            if (!isMath(op))
            {
                return SPCErrCodes.notYetImplemented;
            }

            // pass off to calculation routine
            // all of these are methods that treat data individually 

            int op1Size = dataSetOne.Count;
            int op2Size = dataSetTwo.Count;
            int numEntries;

            numEntries = (op1Size == 1) ? op2Size : op1Size;

            string valStr, valStr2;
            bool doMath1 = true, doMath2 = true;

            if (op1Size != 1 && op2Size != 1 && op1Size != op2Size)
            {
                return SPCErrCodes.badSampleSize;
            }

            TEdcDataPoint objPtr;
            TEdcDataPoint tmpRef;

            string sampleId1 = "", sampleId2 = "";
            string unitId1 = "", unitId2 = "";
            string siteId1 = "", siteId2 = "";
            double d1 = 0;
            double d2 = 0;
            int i1 = 0;
            int i2 = 0;
            double newVal = 0;

            for (int indx = 0; indx < numEntries; indx++)
            {
                TEdcDataPoint dataPtRef = new TEdcDataPoint();
                dataPtRef.sequence = (indx);

                // get the first value
                if (indx < op1Size)
                {
                    objPtr = dataSetOne[indx];

                    tmpRef = objPtr;
                    valStr = tmpRef.value;

                    // check for valid value
                    if (valStr == PositiveInf || valStr == NegativeInf)
                    {
                        newVal = valStr == PositiveInf ? (double)1e31 : (double)-1e31;
                        doMath1 = false;
                    }
                    else if (StringUtil.NullString(valStr) || tmpRef.isExcluded)
                    {
                        doMath1 = false;
                    }
                    else
                    {
                        doMath1 = true;
                        d1 = SpcEdcAsDouble(valStr);
                        i1 = SpcEdcAsInt(valStr);
                    }

                    sampleId1 = tmpRef.sampleId;
                    unitId1 = tmpRef.unitId;
                    siteId1 = tmpRef.siteId;
                }

                // get the second value
                if (indx < op2Size)
                {
                    objPtr = dataSetTwo[indx];

                    tmpRef = objPtr;
                    valStr2 = tmpRef.value;

                    // check for valid value
                    if (valStr2 == PositiveInf || valStr2 == NegativeInf)
                    {
                        newVal = valStr2 == PositiveInf ? (double)1e31 : (double)-1e31;
                        doMath2 = false;
                    }
                    else if (StringUtil.NullString(valStr2) || tmpRef.isExcluded)
                    {
                        doMath2 = false;
                    }
                    else
                    {
                        doMath2 = true;
                        d2 = SpcEdcAsDouble(valStr2);
                        i2 = SpcEdcAsInt(valStr2);
                    }

                    sampleId2 = tmpRef.sampleId;
                    unitId2 = tmpRef.unitId;
                    siteId2 = tmpRef.siteId;
                }

                if (doMath1 && doMath2)
                {
                    switch (op)
                    {
                        case (int)EdcOpName.EDC_OP_DELTA:
                            newVal = d1 - d2;
                            if (newVal < 0)
                                newVal = -newVal;
                            break;
                        case (int)EdcOpName.EDC_OP_ADD:
                            newVal = d1 + d2;
                            break;
                        case (int)EdcOpName.EDC_OP_SUBTRACT:
                            newVal = d1 - d2;
                            break;
                        case (int)EdcOpName.EDC_OP_MULTIPLY:
                            newVal = d1 * d2;
                            break;
                        case (int)EdcOpName.EDC_OP_DIVIDE:
                            if (d2 < (double)1e-150 && d2 > (double)-1e-150)
                                dataType = DATA_FLOAT_DIV_BY_ZERO;
                            else
                                newVal = d1 / d2;    // floating point (double) division
                            break;
                        case (int)EdcOpName.EDC_OP_MOD:
                            if (i2 == 0)
                                dataType = DATA_INT_DIV_BY_ZERO;
                            else
                                newVal = i1 % i2;    // requires integer args
                            break;
                        case (int)EdcOpName.EDC_OP_DIV:
                            if (i2 == 0)
                                dataType = DATA_INT_DIV_BY_ZERO;
                            else
                                newVal = i1 / i2;    // integer division
                            break;
                        default:            // case EDC_OP_POWER:
                            newVal = Math.Pow(d1, d2);    // d1 to the d2
                            break;
                    }

                    dataPtRef.convertValue(newVal, dataType);
                }

                dataPtRef.unitId = (StringUtil.NullString(unitId1) ? unitId2 : unitId1);
                dataPtRef.siteId = (StringUtil.NullString(siteId1) ? siteId2 : siteId1);
                dataPtRef.sampleId = (StringUtil.NullString(sampleId1) ? sampleId2 : sampleId1);
                results.Add(dataPtRef);


            } // for

            return SPCErrCodes.ok;
        }

        public static bool isConversion(int op)
        {
            // is this a conversion operator
            switch (op)
            {
                case (int)EdcOpName.EDC_OP_ABS:
                case (int)EdcOpName.EDC_OP_EXPONENT:
                case (int)EdcOpName.EDC_OP_LOGARITHM:
                case (int)EdcOpName.EDC_OP_LOGNATURAL:
                    return true;

                default:
                    break;
            }
            return false;
        }

        public static int HashValidOp(string op)
        {
            uint h4_min = 0;
            uint h4_max = 0;
            uint h4_range = 0;
            uint h4_sum = 0;
            uint h4_mean = 0;
            uint h4_stddev = 0;
            uint h4_count = 0;
            uint h4_abs = 0;
            uint h4_cp = 0;
            uint h4_cpk = 0;
            uint h4_cpl = 0;
            uint h4_cpu = 0;
            uint h4_ccr = 0;
            uint h4_exponent = 0;
            uint h4_logarithm = 0;
            uint h4_lognatural = 0;
            uint h4_delta = 0;
            uint h4_add = 0;
            uint h4_subtract = 0;
            uint h4_multiply = 0;
            uint h4_divide = 0;
            uint h4_mod = 0;
            uint h4_div = 0;
            uint h4_power = 0;

            string validOp;
            uint h4_op = HashStr4(op);
            int iOp;

            if (h4_min == 0)
            {
                h4_min = HashStr4(min);
                h4_max = HashStr4(max);
                h4_range = HashStr4(range);
                h4_sum = HashStr4(sum);
                h4_mean = HashStr4(mean);
                h4_stddev = HashStr4(stddev);
                h4_count = HashStr4(count);
                h4_abs = HashStr4(abs);
                h4_cp = HashStr4(cp);
                h4_cpk = HashStr4(cpk);
                h4_cpl = HashStr4(cpl);
                h4_cpu = HashStr4(cpu);
                h4_ccr = HashStr4(ccr);
                h4_exponent = HashStr4(exponent);
                h4_logarithm = HashStr4(logarithm);
                h4_lognatural = HashStr4(lognatural);
                h4_delta = HashStr4(delta);
                h4_add = HashStr4(add);
                h4_subtract = HashStr4(subtract);
                h4_multiply = HashStr4(multiply);
                h4_divide = HashStr4(divide);
                h4_mod = HashStr4(mod);
                h4_div = HashStr4(div);
                h4_power = HashStr4(power);
            }

            if (h4_min == h4_op)
            {
                validOp = min;
                iOp = (int)EdcOpName.EDC_OP_MIN;
            }
            else if (h4_max == h4_op)
            {
                validOp = max;
                iOp = (int)EdcOpName.EDC_OP_MAX;
            }
            else if (h4_range == h4_op)
            {
                validOp = range;
                iOp = (int)EdcOpName.EDC_OP_RANGE;
            }
            else if (h4_sum == h4_op)
            {
                validOp = sum;
                iOp = (int)EdcOpName.EDC_OP_SUM;
            }
            else if (h4_mean == h4_op)
            {
                validOp = mean;
                iOp = (int)EdcOpName.EDC_OP_MEAN;
            }
            else if (h4_stddev == h4_op)
            {
                validOp = stddev;
                iOp = (int)EdcOpName.EDC_OP_STDDEV;
            }
            else if (h4_count == h4_op)
            {
                validOp = count;
                iOp = (int)EdcOpName.EDC_OP_COUNT;
            }
            else if (h4_cp == h4_op)
            {
                validOp = cp;
                iOp = (int)EdcOpName.EDC_OP_CP;
            }
            else if (h4_cpk == h4_op)
            {
                validOp = cpk;
                iOp = (int)EdcOpName.EDC_OP_CPK;
            }
            else if (h4_cpl == h4_op)
            {
                validOp = cpl;
                iOp = (int)EdcOpName.EDC_OP_CPL;
            }
            else if (h4_cpu == h4_op)
            {
                validOp = cpu;
                iOp = (int)EdcOpName.EDC_OP_CPU;
            }
            else if (h4_ccr == h4_op)
            {
                validOp = ccr;
                iOp = (int)EdcOpName.EDC_OP_CCR;
            }
            else if (h4_abs == h4_op)
            {
                validOp = abs;
                iOp = (int)EdcOpName.EDC_OP_ABS;
            }
            else if (h4_exponent == h4_op)
            {
                validOp = exponent;
                iOp = (int)EdcOpName.EDC_OP_EXPONENT;
            }
            else if (h4_logarithm == h4_op)
            {
                validOp = logarithm;
                iOp = (int)EdcOpName.EDC_OP_LOGARITHM;
            }
            else if (h4_lognatural == h4_op)
            {
                validOp = lognatural;
                iOp = (int)EdcOpName.EDC_OP_LOGNATURAL;
            }
            else if (h4_delta == h4_op)
            {
                validOp = delta;
                iOp = (int)EdcOpName.EDC_OP_DELTA;
            }
            else if (h4_add == h4_op)
            {
                validOp = add;
                iOp = (int)EdcOpName.EDC_OP_ADD;
            }
            else if (h4_subtract == h4_op)
            {
                validOp = subtract;
                iOp = (int)EdcOpName.EDC_OP_SUBTRACT;
            }
            else if (h4_multiply == h4_op)
            {
                validOp = multiply;
                iOp = (int)EdcOpName.EDC_OP_MULTIPLY;
            }
            else if (h4_divide == h4_op)
            {
                validOp = divide;
                iOp = (int)EdcOpName.EDC_OP_DIVIDE;
            }
            else if (h4_mod == h4_op)
            {
                validOp = mod;
                iOp = (int)EdcOpName.EDC_OP_MOD;
            }
            else if (h4_div == h4_op)
            {
                validOp = div;
                iOp = (int)EdcOpName.EDC_OP_DIV;
            }
            else if (h4_power == h4_op)
            {
                validOp = power;
                iOp = (int)EdcOpName.EDC_OP_POWER;
            }
            else
            {
                return (int)EdcOpName.EDC_OP_UNKNOWN;
            }

            if (op == validOp)
                return iOp;
            return (int)EdcOpName.EDC_OP_UNKNOWN;
        }

    }




}
