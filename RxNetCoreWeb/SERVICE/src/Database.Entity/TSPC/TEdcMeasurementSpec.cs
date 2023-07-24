using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;
using Oracle.ManagedDataAccess.Client;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_MEASUREMENTSPEC")]
    public class TEdcMeasurementSpec : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; }
        [SpcDbField("DESCRIPTION")]
        public string description { get; set; }
        [SpcDbField("MEASUREMENTTYPE")]
        public string measurementType { get; set; }
        [SpcDbField("DATATYPE")]
        public string dataType { get; set; }
        [SpcDbField("UNIT")]
        public string unit { get; set; }
        [SpcDbField("ISDERIVED")]
        public bool isDerived { get; set; }
        [SpcDbField("AUTOEXCLUDE")]
        public bool autoExclude { get; set; }
        [SpcDbField("ALLOWLIMITOVERRIDE")]
        public bool allowLimitOverride { get; set; }
        [SpcDbField("UPPERSCREENINGLIMIT")]
        public string upperScreeningLimit { get; set; }
        [SpcDbField("UPPERSPECLIMIT")]

        public string upperSpecLimit { get; set; }
        [SpcDbField("TARGET")]
        public string target { get; set; }
        [SpcDbField("LOWERSPECLIMIT")]
        public string lowerSpecLimit { get; set; }
        [SpcDbField("LOWERSCREENINGLIMIT")]
        public string lowerScreeningLimit { get; set; }
        public string prompt { get; set; }
        [SpcDbField("SAMPLINGPLAN")]
        public string samplingPlanId { get; set; }
        [SpcDbField("DERIVATION")]
        public string derivationId { get; set; }
        public List<string> validSet { get; set; }

        [SpcDbField("SAMPLINGPLAN", true)]
        public TEdcSamplingPlan samplingPlan
        {
            get
            {
                return _samplingPlan;
            }
            set
            {
                _samplingPlan = value;
            }
        }
        [SpcDbField("DERIVATION", true)]
        public TEdcDerivation derivation { get; set; }

        public bool customLimit { get; set; }
        public bool customAutoExclude { get; set; }

        public string customUpperScreeningLimit { get; set; }

        public string customUpperSpecLimit { get; set; }

        public string customTarget { get; set; }

        public string customLowerSpecLimit { get; set; }

        public string customLowerScreeningLimit { get; set; }
        public int sampleSize { get; set; }
        public string collectionType { get; set; }
        public int numberOfUnits { get; set; }
        public int numberOfSites { get; set; }
        public int numberOfSamples { get; set; }

        public TEdcMeasurementSpec()
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcMeasurementSpec));
        }

        public TEdcMeasurementSpec(CEdcMeasSpec _interchange)
        {
            TEdcMeasurementSpec tempSpec = fetch(_interchange.name);

            if (!(tempSpec == null) && !(tempSpec.sysId ==null))
            {
                sysId = tempSpec.sysId;
            }
            else
            {
                sysId = SPCUtils.GetSysID(typeof(TEdcMeasurementSpec));
            }
            name = _interchange.name;
            description = _interchange.description;
            measurementType = _interchange.measurementType;
            dataType = _interchange.dataType;
            unit = _interchange.unit;
            isDerived = _interchange.isDerived;
            autoExclude = _interchange.autoExclude;
            allowLimitOverride = _interchange.allowLimitOverride;
            upperScreeningLimit = _interchange.upperScreeningLimit;
            upperSpecLimit = _interchange.upperSpecLimit;
            target = _interchange.target;
            lowerSpecLimit = _interchange.lowerSpecLimit;
            lowerScreeningLimit = _interchange.lowerScreeningLimit;
            collectionType = _interchange.collectionType;
            prompt = _interchange.prompt;
            numberOfSamples = _interchange.numberOfSamples;
            numberOfUnits = _interchange.numberOfUnits;
            numberOfSites = _interchange.numberOfSites;


            samplingPlan = new TEdcSamplingPlan()
            {
                collectionType = _interchange.collectionType,
                prompt = _interchange.prompt,
                numberOfSamples = _interchange.numberOfSamples,
                numberOfUnits = _interchange.numberOfUnits,
                numberOfSites = _interchange.numberOfSites
            };
           
            if (!(tempSpec == null) && !StringUtil.NullString(tempSpec.samplingPlanId))
            {
                samplingPlan.sysId = tempSpec.samplingPlanId; 
            }
            samplingPlanId = samplingPlan.sysId;
        }

        public CEdcMeasSpec makeInterchange()
        {
            // Construct an interchange object from this

            // use the base copy constructor to get common contents

            CEdcMeasSpec measSpecInter = new CEdcMeasSpec();
            measSpecInter.name = name;
            measSpecInter.description = description;
            measSpecInter.measurementType = measurementType;
            measSpecInter.dataType = dataType;
            measSpecInter.unit = unit;
            measSpecInter.isDerived = isDerived;
            measSpecInter.allowLimitOverride = allowLimitOverride;
            measSpecInter.upperScreeningLimit = upperScreeningLimit;
            measSpecInter.upperSpecLimit = upperSpecLimit;
            measSpecInter.target = target;
            measSpecInter.lowerSpecLimit = lowerSpecLimit;
            measSpecInter.lowerScreeningLimit = lowerScreeningLimit;

            if (samplingPlan != null)
            {
                measSpecInter.collectionType = samplingPlan.collectionType;
                measSpecInter.prompt = samplingPlan.prompt;
                measSpecInter.numberOfUnits = samplingPlan.numberOfUnits;
                measSpecInter.numberOfSites = samplingPlan.numberOfSites;
                measSpecInter.numberOfSamples = samplingPlan.numberOfSamples;

            }
            else
            {
                measSpecInter.measurementType = (TEdcDerivation.derived);
            }

            // send back derived specs, but without derivation details
            // copy over the valid set entries
            if (_validSet != null && _validSet.Count > 0)
            {
                foreach (string primStr in _validSet)
                {

                    measSpecInter.validset.Add(primStr);
                }
            }

            return measSpecInter;
        }


        public void customLimits(TEdcSpecLimit customLimitRef)
        {
            if (allowLimitOverride && customLimitRef != null)
            {
                customLimit = true;
                customAutoExclude = customLimitRef.autoExclude;
                customUpperScreeningLimit = customLimitRef.upperScreeningLimit;
                customUpperSpecLimit = customLimitRef.upperSpecLimit;
                customTarget = customLimitRef.target;
                customLowerSpecLimit = customLimitRef.lowerSpecLimit;
                customLowerScreeningLimit = customLimitRef.lowerScreeningLimit;
            }
        }



        private SPCErrCodes checkWhereUsed()
        {
            // check where-used in edc plans


            string n2mWhereClause = ("keydata=:keydata and linkname=:linkname");

            List<OracleParameter> n2mDataSet = new List<OracleParameter>();

            SpcDbBindItem.bindValue(":keydata", name, ref n2mDataSet);
            SpcDbBindItem.bindValue(":linkname", "measurementSpecs", ref n2mDataSet);

            string linkname = "";  // work-around for PRS#10898 in persist/LIB
            List<TN2M> allIds = TEdcPlanVersion.fetchN2Mwhere<TEdcPlanVersion>(n2mWhereClause, linkname, n2mDataSet);


            if (!(allIds == null) || allIds.Count > 0)
            {
                return (SPCErrCodes.objectInUse);

            }

            // check where-used in edc analyses

            string whereClause = ("measurementspec=:measurementspec");

            List<OracleParameter> dataSet = new List<OracleParameter>();

            SpcDbBindItem.bindValue(":measurementspec", name, ref dataSet);

            // don't fetch collections in chart, 
            // just need to know if the entry exists

            List<TEdcChart> fetchColl = TEdcChart.fetchWhere<TEdcChart>(whereClause,
                                                            dataSet,
                                                            false);


            if (!(fetchColl == null))
            {
                return (SPCErrCodes.objectInUse);
            }
            return SPCErrCodes.ok;


        }

        private SPCErrCodes validateLimits()
        {
            SPCErrCodes noErr = SPCErrCodes.ok;
            // validate the spec and screening limits

            // >>>>>>> field validation <<<<<<<
            //   Field               Test 
            // ----------------      --------------------------
            // Upper Spec Limit      Greater than Lower Spec Limit
            // Target Value          Between upper and lower
            // Lower Spec Limit      Less than Upper Spec Limit
            //
            // Extract data from Upper and Lower spec field in 
            // format according to selected meas type.


            if (dataType == "FLOAT")
            {
                double maxScrn = double.MaxValue;

                // check maxScrn >= uprScrn >= uprSpec
                double uprScrn = StringUtil.NullString(customUpperScreeningLimit)
                                 ? (maxScrn) : double.Parse(customUpperScreeningLimit);
                double uprSpec = StringUtil.NullString(customUpperSpecLimit)
                                 ? (uprScrn) : double.Parse(customUpperSpecLimit);
                if (/* maxScrn < uprScrn || */ uprScrn < uprSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check -maxScrn <= lwrScrn <= lwrSpec
                double lwrScrn = StringUtil.NullString(customLowerScreeningLimit)
                                 ? (-maxScrn) : double.Parse(customLowerScreeningLimit);
                double lwrSpec = StringUtil.NullString(customLowerSpecLimit)
                                 ? (lwrScrn) : double.Parse(customLowerSpecLimit);
                if (/* -maxScrn > lwrScrn || */ lwrScrn > lwrSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check lwrSpec <= targVal <= uprSpec
                if (StringUtil.NullString(customTarget))
                {
                    if (lwrSpec > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
                else
                {
                    double targVal = double.Parse(customTarget);
                    if (lwrSpec > targVal || targVal > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
            }
            else if (dataType == "INTEGER")
            {
                double maxScrn = int.MaxValue;
                int iMaxScrn = (int)maxScrn;

                // check maxScrn >= uprScrn >= uprSpec
                double uprScrn = StringUtil.NullString(customUpperScreeningLimit)
                                 ? (maxScrn) : double.Parse(customUpperScreeningLimit);
                double uprSpec = StringUtil.NullString(customUpperSpecLimit)
                                 ? (uprScrn) : double.Parse(customUpperSpecLimit);
                if (maxScrn < uprScrn || uprScrn < uprSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                int iUprScrn = StringUtil.NullString(customUpperScreeningLimit)
                               ? (iMaxScrn) : int.Parse(customUpperScreeningLimit);
                int iUprSpec = StringUtil.NullString(customUpperSpecLimit)
                               ? (iUprScrn) : int.Parse(customUpperSpecLimit);
                if (iUprScrn != uprScrn || iUprSpec != uprSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check -maxScrn <= lwrScrn <= lwrSpec
                double lwrScrn = StringUtil.NullString(customLowerScreeningLimit)
                                 ? (-maxScrn) : double.Parse(customLowerScreeningLimit);
                double lwrSpec = StringUtil.NullString(customLowerSpecLimit)
                                 ? (lwrScrn) : double.Parse(customLowerSpecLimit);
                if (-maxScrn > lwrScrn || lwrScrn > lwrSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                int iLwrScrn = StringUtil.NullString(customLowerScreeningLimit)
                               ? (-iMaxScrn) : int.Parse(customLowerScreeningLimit);
                int iLwrSpec = StringUtil.NullString(customLowerSpecLimit)
                               ? (iLwrScrn) : int.Parse(customLowerSpecLimit);
                if (iLwrScrn != lwrScrn || iLwrSpec != lwrSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check lwrSpec <= targVal <= uprSpec
                if (StringUtil.NullString(customTarget))
                {
                    if (lwrSpec > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
                else
                {
                    double targVal = double.Parse(customTarget);
                    if (lwrSpec > targVal || targVal > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                    int iTargVal = int.Parse(customTarget);
                    if (iTargVal != targVal)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
            }
            else if (dataType != "STRING")
            {
                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                return SPCErrCodes.errBadDataType;

            } // end-if dataType

            return noErr;
        }

        private SPCErrCodes validateDerivation()
        {
            // validate the derivation

            SPCErrCodes noErr = SPCErrCodes.ok; ;

            // assign a measurement type based on the first operand and
            // the data handling type

            string whereClause = "name=:name";

            List<OracleParameter> dataSet = new List<OracleParameter>();

            SpcDbBindItem.bindValue(":name", derivation.operand1, ref dataSet);

            List<TEdcMeasurementSpec> fetchColl = TEdcMeasurementSpec.fetchWhere<TEdcMeasurementSpec>(whereClause, dataSet, true);


            TEdcMeasurementSpec specRef;
            if (fetchColl != null && fetchColl.Count == 1)
            {
                specRef = fetchColl[0];
            }
            else
            {
                return SPCErrCodes.invalidMeasSpecId;

            }

            //        if (!(specRef.object() &&
            //          specRef->isKindOf(classIdOf(FwEdcMeasurementSpec))))
            //{
            //            FwError err(FwErrorCode(FwEdc, unexpectedNilObj));
            //            return err;
            //        }

            // validate the measurement type of the input(s), 
            // and the operator and data handling type match

            string mType = (specRef.measurementType);
            string edcOp = (derivation.edcOperator);
            string hType = (derivation.dataHandlingType);

            SPCErrCodes matchErr = SpcEdcCalculator.validate(mType, edcOp, hType);
            if (matchErr != SPCErrCodes.ok)
                return matchErr;

            // set this derived specs measurement type

            if ((mType == "SITE") && (hType == "BYUNIT"))
            {
                measurementType = ("UNIT");
            }
            else if (((mType == "SITE") || (mType == "UNIT")) &&
                 (hType == "ENTIRESAMPLE"))
            {
                measurementType = ("LOT");
            }
            else
            {
                measurementType = (mType);
            }

            return noErr;
        }


        private SPCErrCodes validateSamplingPlan()
        {
            // validate the sampling plan

            SPCErrCodes noErr = SPCErrCodes.ok;

            //------------ validate the collection type ----------------

            if (!((_samplingPlan.collectionType == "OPTIONAL") ||
                  (_samplingPlan.collectionType == "REQUIRED") ||
                  (_samplingPlan.collectionType == "DEFERABLE") ||
                  (_samplingPlan.collectionType == "PRE") ||
                  (_samplingPlan.collectionType == "POST")))
            {
                // invalid collection type

                return SPCErrCodes.invalidCollType;
            }

            //------------ validate the sample size ---------------

            if (measurementType == "SITE")
            {
                if ((_samplingPlan.numberOfSites < 1) ||
                    (_samplingPlan.numberOfUnits < 1) ||
                    (_samplingPlan.numberOfSamples != 0))
                {
                    return SPCErrCodes.invalidSampleSize;
                }
            }
            else if (measurementType == "UNIT")
            {
                if ((_samplingPlan.numberOfUnits < 1) ||
                    (_samplingPlan.numberOfSites != 0) ||
                    (_samplingPlan.numberOfSamples != 0))
                {
                    return SPCErrCodes.invalidSampleSize;

                }
            }
            else
            {
                if ((_samplingPlan.numberOfSamples < 1) ||
                    (_samplingPlan.numberOfUnits != 0) ||
                    (_samplingPlan.numberOfSites != 0))
                {
                    return SPCErrCodes.invalidSampleSize;
                }
            }

            return noErr;
        }
        public bool postBeginTxnCheck(ref Result<bool> result)
        {

            if (deleted)
            {
                SPCErrCodes whereUsedErr = checkWhereUsed();
                if (!(whereUsedErr == SPCErrCodes.ok))
                {
                    result.error = (SPCErrCodes.infWhereUsed);
                    return false;
                }
                return true; // exit point - don't do further validations
                             // if object is marked deleted
            }  // if (deleted())

            SPCErrCodes limitErr = validateLimits();
            if (limitErr != SPCErrCodes.ok)
            {
                result.error = (limitErr);
                return false;
            }

            SPCErrCodes incObjErr = SPCErrCodes.incompleteObject;

            if (isDerived)
            {
                // validate the derivation

                if (_derivation == null)
                {
                    result.error = (incObjErr);
                    return false;
                }
                SPCErrCodes derivedErr = validateDerivation();
                if (derivedErr != SPCErrCodes.ok)
                {
                    result.error = (derivedErr);
                    return false;
                }
            }
            else
            {
                // validate the sampling plan

                if (_samplingPlan == null)
                {
                    result.error = (incObjErr);
                    return false;
                }

                SPCErrCodes samplingPlanErr = validateSamplingPlan();
                if (samplingPlanErr != SPCErrCodes.ok)
                {
                    result.error = (samplingPlanErr);
                    return false;
                }
            }

            //------------ validate the measurementType ---------------

            // for derived specs, gets set in validateDerivation method 

            if (!((measurementType == "LOT") ||
                  (measurementType == "UNIT") ||
                  (measurementType == "SITE") ||
                  (measurementType == "EQUIPMENT") ||
                  (measurementType == "ENVIRONMENT")))
            {
                // invalid measurement type

                SPCErrCodes error = SPCErrCodes.invalidMeasType;
                result.error = (error);
                return false;
            }

            return true;
        }


        private TEdcSamplingPlan _samplingPlan;
        private TEdcDerivation _derivation;
        private string _measurementType;
        private List<string> _validSet;
        private bool _calculating = false;

        // Handle custom Spec Limit
        private bool _customLimit = false;
        private bool _customAutoExclude = false;
        private string _customUpperScreeningLimit;
        private string _customUpperSpecLimit;
        private string _customTarget;
        private string _customLowerSpecLimit;
        private string _customLowerScreeningLimit;

        private const string PositiveInf = " TooLarge";
        private const string NegativeInf = " TooSmall";


        private const int DATA_TYPE_FLOAT = 0;
        private const int DATA_TYPE_INTEGER = 1;
        private const int DATA_FLOAT_DIV_BY_ZERO = 2;
        private const int DATA_INT_DIV_BY_ZERO = 3;
        private const int DATA_LOG_OF_NEGATIVE = 4;

        private TEdcMeasurementSpec fetch(string name)
        {
            Result<bool> result = new Result<bool>();

            return fetch(name, out result);
            // TEdcMeasurementSpec aRef = EdcMeasurementSpecService.GetTEdcMeasurementSpecByName(name);
            //if (aRef == null)
            //{
            //    throw new System.Exception(SPCErrCodes.invalidMeasSpecId.ToString());
            //}
            //return aRef;

        }
        public Result<bool> store()
        {
            Result<bool> result = new Result<bool>();
            if (postBeginTxnCheck(ref result))
            {
                TrySaveObject(this);
                TrySaveObject(this.samplingPlan);

                 
            }

            return result;
        }
        public static TEdcMeasurementSpec fetch(string name, out Result<bool> result)
        {
            result = new Result<bool>();
            string whereClause = "name=:name";
            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcMeasurementSpec> fetchColl = new List<TEdcMeasurementSpec>();
            TEdcMeasurementSpec aRef =null ;

            // First, bind data values.
            SpcDbBindItem.bindValue(":name", (name), ref dataSet);

            fetchColl = TEdcMeasurementSpec.fetchWhere<TEdcMeasurementSpec>(whereClause,  dataSet, true);

            if (fetchColl == null || fetchColl.Count==0)
            {

                result.error = (SPCErrCodes.invalidMeasSpecId);
                return aRef;
            }
            aRef = fetchColl[0];
            if (aRef == null)
            {
                result.error = SPCErrCodes.unexpectedNilObj;
            }
            return aRef;
        }



        public SPCErrCodes checkOperand(TEdcPlanVersion planVRef,
                          TEdcDataCollection dataCollRef,
                          CEdcSpecRpt specReport,
                          TEdcMeasurement operand)
        {
            if (isDerived)
            {
                if (_calculating == false)
                {
                    if (SPCErrCodes.ok == calculate(planVRef, dataCollRef, specReport))
                    {
                        return SPCErrCodes.ok;
                    }
                }
            }
            operand = dataCollRef.findMeasurement(name);
            if (operand == null &&
                (isDerived || samplingPlan.collectionType != "OPTIONAL"))
            {
                return SPCErrCodes.badArgsPassed;
            }
            return SPCErrCodes.ok;
        }




        public bool dataNormalization(List<TEdcDataPoint> data)
        {
            TEdcDataPoint objPtr;
            TEdcDataPoint tmpRef;
            int numEntries = data.Count;
            string valStr;
            double limit1;
            double limit2;
            double upper;
            double lower;
            double newVal;

            if (isDerived && _derivation != null)
            {
                limit1 = double.Parse(_derivation.upperLimit);
                limit2 = double.Parse(_derivation.lowerLimit);
                if (_derivation.limitSelection == "Screening")
                {
                    upper = double.Parse(customUpperScreeningLimit);
                    lower = double.Parse(customLowerScreeningLimit);
                }
                else
                {
                    upper = double.Parse(customUpperSpecLimit);
                    lower = double.Parse(customLowerSpecLimit);
                }
            }
            else
            {
                return false;
            }

            for (int indx = 0; indx < numEntries; indx++)
            {
                objPtr = data[indx];

                tmpRef = objPtr;
                valStr = tmpRef.value;
                if (valStr == PositiveInf || valStr == NegativeInf)
                {
                    newVal = valStr == PositiveInf ? (double)1e31 : (double)-1e31;
                }
                else
                {
                    newVal = double.Parse(valStr);
                    if ((upper - lower) < (double)1e-150 && (upper - lower) > (double)-1e-150)
                        newVal = 0;
                    else
                        newVal = limit2 + (newVal - lower) * (limit1 - limit2) / (upper - lower);
                }
                if (dataType == "FLOAT")
                {
                    tmpRef.convertValue(newVal, DATA_TYPE_FLOAT);
                }
                else if (dataType == "INTEGER")
                {
                    tmpRef.convertValue(newVal, DATA_TYPE_INTEGER);
                }
            }


            return true;
        }
        public SPCErrCodes calculate(TEdcPlanVersion planVRef,
                       TEdcDataCollection dataCollRef,
                       CEdcSpecRpt specReport)
        {
            bool success = true;

            if (_calculating == true)
                return SPCErrCodes.ok;

            _calculating = true;

            TEdcDerivation derivRef = derivation;
            if (derivRef == null)
            {
                return SPCErrCodes.incompleteObject;
            }

            TEdcMeasurementSpec op1SpecRef =
                            planVRef.findMeasurementSpec(derivRef.operand1);
            TEdcMeasurementSpec op2SpecRef =
                           planVRef.findMeasurementSpec(derivRef.operand2);

            TEdcMeasurement operand1 = null;
            if (op1SpecRef != null)
            {
                var status = op1SpecRef.checkOperand(planVRef, dataCollRef,
                                  specReport, operand1);
                if (status != SPCErrCodes.ok)
                {
                    return status;
                }
            }

            // if operand1 is cannot be constant -- enforced by EDCdev
            TEdcMeasurementSpec sourceSpecRef = op1SpecRef;

            TEdcMeasurement operand2 = null;
            if (op2SpecRef != null)
            {
                var status = op2SpecRef.checkOperand(planVRef, dataCollRef,
                                  specReport, operand2);
                if (status != SPCErrCodes.ok)
                {
                    return status;
                }

                if (!(op1SpecRef != null && op1SpecRef.samplingPlan != null) &&
                     op2SpecRef.samplingPlan != null)
                    sourceSpecRef = op2SpecRef;
            }

            if (sourceSpecRef == null)
            {
                return SPCErrCodes.badArgsPassed;
            }

            TEdcSamplingPlan oldSampRef = _samplingPlan;
            string oldMeasType = _measurementType;
            if (sourceSpecRef.samplingPlan != null &&
                sourceSpecRef._samplingPlan != _samplingPlan)
            {
                _samplingPlan = sourceSpecRef._samplingPlan;
                _measurementType = sourceSpecRef._measurementType;
            }

            List<TEdcDataPoint> results = new List<TEdcDataPoint>();
            SpcEdcCalculator edcCalc = new SpcEdcCalculator();

            var calcErr = edcCalc.performCalculation(this, sourceSpecRef,
                            operand1, operand2, results);

            // Normalization the derived data
            if (calcErr != SPCErrCodes.ok && !StringUtil.NullString(_derivation.limitSelection))
                dataNormalization(results);

            // dataHandlingType of stat calculation is "derived" after calculation.
            if (TEdcDerivation.derived == derivRef.dataHandlingType)
            {
                _samplingPlan = oldSampRef;
                _measurementType = TEdcDerivation.derived;
            }

            if (calcErr == SPCErrCodes.ok)
            {
                return calcErr;
            }

            if (oldMeasType != _measurementType)
            {
                //markDirty();
                //planVRef->markDirty();
            }

            // create an FwEdcMeasurement for the results
            // give it the first operand's meas context - correct??? ljs
            // and set the meas spec name from the derived spec ref

            TEdcMeasurement newRef = new TEdcMeasurement();

            if (operand1 != null)
            {
                newRef = operand1;
            }
            else if (operand2 != null)
            {
                newRef = operand2;
            }
            newRef.measurementSpec = name;

            CEdcSpecRes specResult = new CEdcSpecRes();
            specResult = newRef.GetCEdcSpecRes();

            specResult.dataType = dataType;
            specResult.measurementType = measurementType;

            // check for no spec limits
            string uspl = (customUpperSpecLimit);
            string lspl = (customLowerSpecLimit);
            string uscl = (customUpperScreeningLimit);
            string lscl = (customLowerScreeningLimit);
            bool specLimits = (!(validSet == null || validSet.Count == 0) ||
                         !(StringUtil.NullString(uspl) && StringUtil.NullString(lspl)));
            bool screenLimits = ((!(validSet == null || validSet.Count == 0) && dataType == "STRING") ||
                       !(StringUtil.NullString(uscl) && StringUtil.NullString(lscl)));

            if (!specLimits)
            {
                specResult.specStatus = TEdcSpecRes.specLimitStatusNoSpecs;
            }

            specResult.upperSpecLimit = (uspl);
            specResult.lowerSpecLimit = (lspl);

            specReport.specResults.Add(specResult);


            foreach (TEdcDataPoint dataPtRef in results)
            {
                if (checkLimits(dataPtRef, specResult, true, specLimits, screenLimits))
                    return SPCErrCodes.ok;

                // add data point from the results returned by the calculator

                newRef.addData(dataPtRef);
            }

            newRef.specPtr(this);
            dataCollRef.addMeasurement(newRef);
            return SPCErrCodes.ok;
        }
        public static TEdcMeasurementSpec getMeasurementSpec(string name)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_MEASUREMENTSPEC
                         where c.NAME == name
                         select new TEdcMeasurementSpec()
                         {
                             sysId = c.SYSID,
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             measurementType = c.MEASUREMENTTYPE,
                             dataType = c.DATATYPE,
                             unit = c.UNIT,
                             isDerived = c.ISDERIVED == "T" ? true : false,
                             autoExclude = c.AUTOEXCLUDE == "T" ? true : false,
                             allowLimitOverride = c.ALLOWLIMITOVERRIDE == "T" ? true : false,
                             upperScreeningLimit = c.UPPERSCREENINGLIMIT,
                             upperSpecLimit = c.UPPERSPECLIMIT,
                             target = c.TARGET,
                             lowerSpecLimit = c.LOWERSPECLIMIT,
                             lowerScreeningLimit = c.LOWERSCREENINGLIMIT,
                             samplingPlan = (from d in db.SPC_SAMPLINGPLAN
                                             where d.SYSID == c.SAMPLINGPLAN
                                             select new TEdcSamplingPlan()
                                             {
                                                 collectionType = d.COLLECTIONTYPE,
                                                 prompt = d.COLLECTIONTYPE,
                                                 operatorInstructions = d.COLLECTIONTYPE,
                                                 numberOfUnits = d.NUMBEROFUNITS,
                                                 numberOfSites = d.NUMBEROFSITES,
                                                 numberOfSamples = d.NUMBEROFSAMPLES
                                             }).FirstOrDefault<TEdcSamplingPlan>(),
                             derivation = (from d in db.SPC_DERIVATION
                                           where d.SYSID == c.DERIVATION
                                           select new TEdcDerivation()
                                           {
                                               edcOperator = d.EDCOPERATOR,
                                               operand1 = d.OPERAND1,
                                               operand2 = d.OPERAND2,
                                               dataHandlingType = d.DATAHANDLINGTYPE,
                                               data1 = d.DATA1,
                                               data2 = d.DATA2,
                                               limitSelection = d.LIMITSELECTION,
                                               upperLimit = d.UPPERLIMIT,
                                               lowerLimit = d.LOWERLIMIT,
                                               storeInDatabase = d.STOREINDATABASE == "T" ? true : false
                                           }).FirstOrDefault<TEdcDerivation>()
                         }).ToList<TEdcMeasurementSpec>().FirstOrDefault<TEdcMeasurementSpec>();

            return query;
        }



        private bool dataTypeMismatch(string val)
        {
            // check if the value is in an unacceptable format for the data type
            // of this measurement spec 
            // check for missing values which are allowed
            if (StringUtil.NullString(val))
                return false;


            //  cout << "Magnitude match index: " << FwString::fromInt(val_indx) << endl;
            int i = 0;
            float f = 0;
            bool bi = int.TryParse(val, out i);
            bool bf = float.TryParse(val, out f);

            if ((dataType == "STRING") ||
                (dataType == "INTEGER" && bi) ||
                (dataType == "FLOAT" && bf))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public bool outOfSpec(string val)
        {
            // determine if val is outside of spec limits

            // check for INFINITY (which is preceeded with ' ')
            if (val == PositiveInf || val == NegativeInf)
                return true;

            // check for missing values which are allowed
            if (StringUtil.NullString(val))
                return false;

            // make sure the data is in the correct format for this spec
            if (dataTypeMismatch(val))
                return true;

            if (validSet != null && validSet.Count > 0)
                return (!validSet.Contains(val));

            if (dataType == "STRING")
            {
                return false;
            }
            else if (dataType == "INTEGER")
            {
                int ival = int.Parse(val);
                int usl = int.Parse(customUpperSpecLimit);
                int lsl = int.Parse(customLowerSpecLimit);

                if ((!(StringUtil.NullString(customUpperSpecLimit)) && (ival > usl)) ||
                     (!(StringUtil.NullString(customLowerSpecLimit)) && (ival < lsl)))
                {
                    // value is outside of spec limits
                    return true;
                }
                else
                    return false;
            }
            else if (dataType == "FLOAT")
            {
                float fval = float.Parse(val);
                float usl = float.Parse(customUpperSpecLimit);
                float lsl = float.Parse(customLowerSpecLimit);

                if ((!(StringUtil.NullString(customUpperSpecLimit)) && (fval > usl)) ||
                     (!(StringUtil.NullString(customLowerSpecLimit)) && (fval < lsl)))
                {
                    // value is outside of spec limits
                    return true;
                }
                else
                    return false;
            }
            else
                // we could not validate, pass the value
                return true;
        }

        public bool outlier(string val)
        {
            // determine if val is outside of sreening limits 
            // check for INFINITY (which is preceeded with ' ')
            if (val == PositiveInf || val == NegativeInf)
                return true;

            // check for missing values which are allowed
            if (StringUtil.NullString(val))
                return false;

            // check if the data is in an unacceptable format for this meas spec
            if (dataTypeMismatch(val))
                return true;

            if (dataType == "STRING")
            {
                if (validSet.Count == 0 || validSet.Contains(val))
                    return false;
                else
                    return true;
            }
            else if (dataType == "INTEGER")
            {
                int ival = int.Parse(val);
                int usl = int.Parse(customUpperScreeningLimit);
                int lsl = int.Parse(customLowerScreeningLimit);

                if ((!(StringUtil.NullString(customUpperScreeningLimit)) && (ival > usl)) ||
                    (!(StringUtil.NullString(customLowerScreeningLimit)) && (ival < lsl)))
                {
                    // value is outside of screening limits
                    return true;
                }
                else
                    return false;
            }
            else if (dataType == "FLOAT")
            {
                float fval = float.Parse(val);
                float usl = float.Parse(customUpperScreeningLimit);
                float lsl = float.Parse(customLowerScreeningLimit);

                if (((!StringUtil.NullString(customUpperScreeningLimit)) && (fval > usl)) ||
                    ((!StringUtil.NullString(customLowerScreeningLimit)) && (fval < lsl)))
                {
                    // value is outside of screening limits
                    return true;
                }
                else
                    return false;
            }
            else
                // we could not validate, pass the value
                return false;
        }


        public bool checkLimits(TEdcDataPoint dataPtRef, CEdcSpecRes specResult, bool isNewDataPoint, bool specLimits, bool screenLimits)
        {
            bool isNewOutOfScreen = false;
            bool isNewOutOfSpec = false;

            // check the spec limits on the derived results
            // don't update specResult for empty (missing) values
            string val = dataPtRef.value;
            if (!StringUtil.NullString(val))
            {
                // test for outside of screening limits
                isNewOutOfScreen = screenLimits && outlier(val);
                if (isNewOutOfScreen)
                {
                    if (customAutoExclude)
                        dataPtRef.isExcluded = true;
                }

                // test for outside of spec limits
                isNewOutOfSpec = specLimits && outOfSpec(val);
                if (isNewOutOfSpec)
                {
                    // specResult.specStatus(FwEdcSpecResInterchange::specLimitStatusFail);
                    CEdcDataPoint dataPtCopy = dataPtRef.GetCEdcData();
                    specResult.datapoints.Add(dataPtCopy);
                }
            }

            if (isNewOutOfSpec || isNewOutOfScreen)
            {
                string desc = "DataPointValue: ";
                string reason, annotation, brief;
                if (isNewOutOfScreen)
                {
                    if (dataPtRef.isExcluded)
                    {
                        annotation = "EXCLUSION";
                        reason = "Automatic Exclusion";
                    }
                    else
                    {
                        annotation = "GENERAL";
                        reason = "Screening Limit Violation";
                    }
                    brief = "SCREEN";
                    desc = desc + val + ", UScrnL: " + customUpperScreeningLimit + ", LScrnL: " + customLowerScreeningLimit;
                }
                else
                {
                    annotation = "GENERAL";
                    brief = "SPEC";
                    reason = "Spec Limit Violation";
                    desc = desc + val + ", US: " + customUpperSpecLimit + ", LS: " + customLowerSpecLimit + ", TGT: " + customTarget;
                }

                return dataPtRef.Annotation(annotation,
                                             reason,
                                             brief,
                                             desc,
                                             dataType,
                                             isNewDataPoint);
            }
            return true;
        }

        public void deriveSamplingPlan(TEdcPlanVersion plan)
        {
            if (_calculating || _samplingPlan != null)
                return;
            _calculating = true;

            TEdcDerivation derivRef = _derivation;
            if (derivRef == null)
                return;

            int op = SpcEdcCalculator.HashValidOp(derivRef.edcOperator);
            if (!(SpcEdcCalculator.isMath(op) || SpcEdcCalculator.isConversion(op)))
                return;        // statistics operation or unknown operator.

            TEdcMeasurementSpec op1SpecRef;

            if (plan != null)
            {
                op1SpecRef = plan.findMeasurementSpec(derivRef.operand1);
            }
            else
            {
                op1SpecRef = fetch(derivRef.operand1);
            }
            if (op1SpecRef == null)
                return;


            if (op1SpecRef.samplingPlan == null)
            {
                if (op1SpecRef.isDerived)
                    op1SpecRef.deriveSamplingPlan(plan);
            }
            if (op1SpecRef._samplingPlan != null)
            {
                _samplingPlan = op1SpecRef._samplingPlan;
                _measurementType = op1SpecRef._measurementType;
                return;
            }

            TEdcMeasurementSpec op2SpecRef;
            if (plan != null)
            {
                op2SpecRef = plan.findMeasurementSpec(derivRef.operand2);
            }
            else
            {
                op2SpecRef = fetch(derivRef.operand2);
            }
            if (op2SpecRef == null)
                return;

            if (op2SpecRef._samplingPlan == null)
            {
                if (op2SpecRef.isDerived)
                    op2SpecRef.deriveSamplingPlan(plan);
            }
            _samplingPlan = op2SpecRef._samplingPlan;
            _measurementType = op2SpecRef._measurementType;
        }

    }

}
