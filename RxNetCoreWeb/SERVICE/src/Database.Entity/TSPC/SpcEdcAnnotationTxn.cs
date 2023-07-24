using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcAnnotationTxn
    {
        public string historySysId { get; set; }
        public bool statusFlag { get; set; }
        public string annotationCode { get; set; }
        public string reasonCode { get; set; }
        public string briefDescription { get; set; }
        public string detailDescription { get; set; }

        public string userId { get; set; }

        public string datetime { get; set; }


        public bool store()
        {
            // Create, modify, or delete a annotation



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
                    throw nilErr;
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
                throw (nilErr);
            }

            TEdcMeasurement measRef = collRef.findMeasurement(measKey);
            if (measRef == null)
            {
                throw (nilErr);
            }

            TEdcDataPoint dataPtRef = measRef.findData(dataKey);
            if (dataPtRef == null)
            {
                throw (nilErr);
            }

            //===========  now make the transaction changes ============

            TEdcAnnotation noteRef = new TEdcAnnotation();

            noteRef.annotationCode = annotationCode;
            noteRef.reasonCode = reasonCode;
            noteRef.briefDescription = briefDescription;
            noteRef.detailDescription = detailDescription;
            noteRef.username= userId;
            if (ServerConfig.GetBool("dateTimeOverride"))   
                noteRef.datetime = TimeUtil.GetSPCTime(DateTime.Now); 
            else
                noteRef.datetime = (datetime );

            if (annotationCode  == "DATABOUNDARY")
            {
                histRef.isDataBoundary =true  ;
            }
            else if (annotationCode  == "EXCLUSION")
            {
                histRef.isExcluded =  true  ;
            }

            // sets historySysId of annotation and marks the dirty bit
            histRef.addAnnotation(noteRef);

            //collRef->markDirty();
            //measRef->markDirty();

            // data point has no post fetch method,
            // do so that updated history gets stored and published
              dataPtRef.addHistory(histRef); 
            //FwCatchAll()
            // {
            //    FwError globalErr(FwError::getGlobal());
            //    result.error(globalErr);
            //    return FALSE;
            //}
             collRef.store();
            //if (err)
            //{
            //    result.error(err);
            //    return FALSE;
            //}

            // set-up to publish the notification 
            // don't publish to SPC Rules server since it is using a snapshot

            //FwTry
            // {
            //    _objToPublish =
            //        FwEdcData::asBBDMsg(collRef, measRef, dataPtRef, histRef);
            //}
            //FwCatchAll()
            // {
            //    result.error(FwError::getGlobal());
            //    return FALSE;
            //}

            return true ;
        }
    }
}

