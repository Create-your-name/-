using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcExcludePointTxn
    {
        public string historySysId { get; set; }
        public string briefDescription { get; set; }
        public string detailDescription { get; set; }
        public bool excludeFlag { get; set; }





        public bool store(out Result<bool> result)
        {
            result = new Result<bool>();
            // exclude or include a data point and create an annotation 
            // NOTE: we can pull the history reference into ref mgt
            // without the rest of the hierarchy because it does not
            // have a reference to the parent as a  data member
            // (circular references) and so ref mgt cleanup is not an issue

            string ownerId = historySysId;
            if (SPCUtils.classIdOf(ownerId) != typeof(TEdcDataPointHistory))
            {
                // wrong type of sysId passed
                throw new Exception(SPCErrCodes.invalidSysId.ToString());
            }

            TEdcDataPointHistory histRef = new TEdcDataPointHistory(ownerId);
            if (histRef == null)
            {
                throw new Exception(SPCErrCodes.invalidSysId.ToString());
            }

            // important: get the plan from the top down
            // so ownerId is properly constructed on each reference

            Exception nilErr = new Exception(SPCErrCodes.unexpectedNilObj.ToString());
            string dataCollSysId;
            string measKey;
            int dataKey = -1;

            //========= scope the bottom up references to get removed ====
            //========= from reference management at end of block ========

            {
                TEdcDataPoint tmpDataPt = new TEdcDataPoint(histRef.dataSysId);
                if (tmpDataPt == null)
                {
                    // data point not found
                    throw new Exception(SPCErrCodes.invalidSysId.ToString());

                }

                dataKey = tmpDataPt.sequence;

                TEdcMeasurement tmpMeas = tmpDataPt.measurement;
                if (tmpMeas == null)
                {
                    throw (nilErr);
                }

                measKey = tmpMeas.measurementSpec;

                TEdcDataCollection tmpDataColl = tmpMeas.dataCollection;
                dataCollSysId = tmpDataColl.sysId;
            }

            // now reconstruct the hierarchy top down with properly initialized
            // owner references

            TEdcDataCollection collRef = new TEdcDataCollection(dataCollSysId);
            if (collRef == null)
            {
                result.error = (SPCErrCodes.unexpectedNilObj);
                return false;
            }

            TEdcMeasurement measRef = collRef.findMeasurement(measKey);
            if (measRef == null)
            {
                result.error = (SPCErrCodes.unexpectedNilObj);
                return false;
            }

            TEdcDataPoint dataPtRef = measRef.findData(dataKey);
            if (dataPtRef == null)
            {
                result.error = (SPCErrCodes.unexpectedNilObj);
                return false;
            }

            histRef.isExcluded = (excludeFlag);

            if ((StringUtil.NullString(briefDescription) ||
                StringUtil.NullString(detailDescription)))
            {
                // create and add an exclusion annotation
                TEdcAnnotation noteRef = new TEdcAnnotation();
                noteRef.annotationCode = ("EXCLUSION");
                noteRef.briefDescription = (briefDescription);
                noteRef.detailDescription = (detailDescription);
                noteRef.username = ("system");

                // sets historySysId of annotation and marks the dirty bit
                try
                { histRef.addAnnotation(noteRef); }
                catch
                {
                    result.error = (SPCErrCodes.globalErr);
                    return false;
                }
            }

            // check if dirty ( if the old value was different 
            // and/or an exclusion annotation was added ) then
            // we need a store and also to publish an update

            if (histRef.dirty)
            {
                collRef.markDirty();
                measRef.markDirty();

                // data point has no post fetch method,
                // do so that updated history gets stored and published
                try
                { 
                    dataPtRef.addHistory(histRef);
                }
                catch
                {
                    result.error = (SPCErrCodes.globalErr);
                    return false;
                }

                bool bresult = collRef.store();
                if (!bresult)
                {
                    result.error = SPCErrCodes.storeErr ;
                    return false ;
                }

                // set-up to publish the notification 
                // don't publish to SPC Rules server since it is using a snapshot

                //FwTry
                //  {
                //    _objToPublish =
                //        FwEdcData::asBBDMsg(collRef, measRef, dataPtRef, histRef);
                //}
                //FwCatchAll()
                //  {
                //    result.error(FwError::getGlobal());
                //    return FALSE;
                //}
            }

            return true ;
        }


    }
}

