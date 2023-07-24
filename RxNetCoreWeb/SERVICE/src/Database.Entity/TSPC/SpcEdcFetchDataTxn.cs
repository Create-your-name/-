using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcFetchDataTxn
    {
        public string dataCollSysId { get; set; }
        public string filename { get; set; }
        public string fieldSeparator { get; set; }
        public string nullIndicator { get; set; }




        public Result<TEdcData> store()
        {
            Result<TEdcData> result = new Result<TEdcData>();
            Exception fileErr = new Exception(SPCErrCodes.cantOpenFile.ToString());
            Exception nilErrr = new Exception(SPCErrCodes.unexpectedNilObj.ToString());
            Exception constructErrr = new Exception(SPCErrCodes.unableToConstructInter.ToString());
            Exception badIdErrr = new Exception(SPCErrCodes.invalidSysId.ToString());

            // Verify the mode of result return, file or bus 

            // attempt to open the file

            //ofstream outFile(_filename);

            bool replyFlag = true;
            //if (_filename != FwNilString())
            //{
            //    // output results to a file

            //    replyFlag = FALSE;

            //    // validate the filename

            //    if (!outFile)
            //    {
            //        // can't open file for write

            //        result.error(fileErr);
            //        return FALSE;
            //    }
            //}

            // fetch just the datapoints for the data collection

            string sysId = dataCollSysId;
            if (SPCUtils.classIdOf(sysId) != typeof(TEdcDataCollection))
            {
                // wrong type of sysId passed 
                throw badIdErrr;
            }

            //  FwEdcDataCollection::deepFetch(sysId, dataCollRef, FALSE); // don't lock

            TEdcDataCollection dataCollRef = new TEdcDataCollection(sysId);

            if (dataCollRef == null)
            {
                throw new Exception(SPCErrCodes.invalidSysId.ToString());
            }

            if (replyFlag)
            {
                TEdcData edcData = TEdcData.asReply(dataCollRef);

                if (edcData == null)
                    throw constructErrr;

                result.value = (edcData);
            }
            else
            {
                //不考虑文件情况
                //      // need to determine which measurements are derived and
                //      // not return them (or add a derived flag to the measurement interchange)

                //      FOREACH_REF(dataCollRef->measurements(), FwRef(FwEdcMeasurement), measRef)
                //        if (!measRef.object())
                //{
                //          result.error(nilErr);
                //          return FALSE;
                //      }

                //      // Somewhat inefficient to get meas spec for interchange on a per
                //      // measurement basis rather than from the plan, but plan version may
                //      // have changed since data coll was stored

                //      FwRef(FwEdcMeasurementSpec) specRef = measRef->getMeasurementSpec();
                //      if (!specRef.object())
                //{
                //          // missing measurementSpec
                //          FwError measSpecIdErr(FwErrorCode(FwEdc, invalidMeasSpecId));
                //          result.error(measSpecIdErr);
                //          return FALSE;
                //      }

                //      FOREACH_REF(measRef->datapoints(), FwRef(FwEdcDataPoint), dataPtRef)
                //          if (!dataPtRef.object())
                //  {
                //          result.error(nilErr);
                //          return FALSE;
                //      }

                //      FwString linebuf = FwEdcData::formatForFile(dataCollRef,
                //          measRef, dataPtRef, fieldSeparator(), nullIndicator());
                //      outFile << linebuf << endl;

                //      END_FOREACH
                //    END_FOREACH


            }

            return result;
        }
    }
}

