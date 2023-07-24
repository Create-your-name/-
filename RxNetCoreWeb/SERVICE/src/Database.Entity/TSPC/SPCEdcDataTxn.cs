using Arch;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;

namespace SPCService.BusinessModel
{

    public class SpcEdcDataTxn
    {

        public CEdcDataCollection _interchange { get; set; }
        private TEdcDataCollection _dataCollRef = new TEdcDataCollection();
        private CEdcSpecRpt _specReport = new CEdcSpecRpt();
        private TEdcPlanVersion _planVRef;
        private TEdcMeasurement _measRef;
        private const string PositiveInf = (" TooLarge");
        private const string NegativeInf = (" TooSmall");
        private const string SpcNilString = ("NULL");

        private void CopyDataCollToEdcSpecPrt(CEdcSpecRpt specRpt, CEdcDataCollection dataCollInter)
        {
            specRpt.edcPlanId = dataCollInter.edcPlanId;
            specRpt.productName = dataCollInter.productName;
            specRpt.planId = dataCollInter.planId;
            specRpt.initialStepId = dataCollInter.initialStepId;
            specRpt.lotId = dataCollInter.lotId;
            specRpt.batchId = dataCollInter.batchId;
            specRpt.stageId = dataCollInter.stageId;
            specRpt.areaId = dataCollInter.areaId;
        }
        private void BaseCopyCToTDataCollection(TEdcDataCollection specRpt, CEdcDataCollection dataCollInter)
        {

            specRpt.edcPlan = dataCollInter.edcPlanId;
            specRpt.product = dataCollInter.productName;
            specRpt.processPlan = dataCollInter.planId;
            specRpt.initialStep = dataCollInter.initialStepId;
            specRpt.lot = dataCollInter.lotId;
            specRpt.batch = dataCollInter.batchId;
            specRpt.stage = dataCollInter.stageId;
            specRpt.area = dataCollInter.areaId;
            specRpt.tag1 = dataCollInter.tag1;
            specRpt.tag2 = dataCollInter.tag2;
            specRpt.groupHistKey = dataCollInter.groupHistKey;
            specRpt.clientId = dataCollInter.edcPlanId;



        }


        private SPCErrCodes applyDataPointUpdates(List<CEdcDataPoint> datapoints)
        {
            // update the _measRef with each datapoint interchange,
            // check limits on the data point values,
            // validates sampling plan for this measurement,
            // and constructing a  spec limit report for publication at postCommit


            bool status = false;

            //FwError measSpecIdErr(FwErrorCode(FwEdc, invalidMeasSpecId));
            //FwError constructErr(FwErrorCode(FwEdc, unableToConstructInter));
            //FwError samplingErr(FwErrorCode(FwEdc, badSampleSize));

            // get the measurement spec associated with the measurement, 
            // to validate the data and and set the spec limits in report

            TEdcMeasurementSpec specRef = _planVRef.findMeasurementSpec(_measRef.measurementSpec);
            if (specRef == null)
            {
                // missing measurementSpec
                return SPCErrCodes.invalidMeasSpecId;
            }

            int sampleSize = specRef.sampleSize;

            // create a spec result to store the results of limit checks
            // for publication post commit of this txn

            CEdcSpecRes specResult = new CEdcSpecRes();
            //  *specResult = *(FwEdcMeasurementBase*)_measRef.object();

            specResult.dataType = specRef.dataType;
            specResult.measurementType = specRef.measurementType;

            // check for no spec limits

            string uscl = specRef.upperScreeningLimit;
            string uspl = specRef.upperSpecLimit;
            string lspl = specRef.lowerSpecLimit;

            string lscl = specRef.lowerScreeningLimit;

            //  using custom spec limit to replace Measurement Spec Limits.
            if (_measRef.specLimits != null)
            {
                TEdcSpecLimit customLimit = _measRef.specLimits;

                uscl = customLimit.upperScreeningLimit;
                uspl = customLimit.upperSpecLimit;
                lspl = customLimit.lowerSpecLimit;
                lscl = customLimit.lowerScreeningLimit;
            }

            bool specLimits = !(specRef.validSet == null || specRef.validSet.Count == 0) || !(StringUtil.NullString(uspl) && StringUtil.NullString(lspl));
            bool screenLimits = (!(specRef.validSet == null || specRef.validSet.Count == 0) && specRef.dataType == "STRING") || !(StringUtil.NullString(uscl) && StringUtil.NullString((lscl)));
            if (!specLimits)
            {
                //  specResult.specStatus(FwEdcSpecResInterchange::specLimitStatusNoSpecs);
            }

            specResult.upperSpecLimit = uspl;
            specResult.lowerSpecLimit = lspl;
            _specReport.specResults.Add(specResult);

            //if (!(specResult = (FwEdcSpecResInterchange*)_specReport.addSpecResult(specResult)))
            //{
            //    return constructErr; /* purecov: inspected */
            //}

            foreach (CEdcDataPoint dataPtInter in datapoints)
            {
                bool isNewOutOfScreen = false;
                bool isNewOutOfSpec = false;
                bool isNewDataPoint = false;

                // look up the persist datapoint on the measurement

                int sequence = dataPtInter.sequence;
                TEdcDataPoint dataPtRef = _measRef.findData(sequence);

                if (dataPtRef != null)
                {
                    // the datapoint exists, only its value, unitName, siteName,
                    // sampleName, and exclude status can change through this txn
                    dataPtRef.isExcluded = dataPtInter.isExcluded; /* purecov: tested */
                    dataPtRef.unitId = dataPtInter.unitId;     // allow unitName change /* purecov: tested */
                    dataPtRef.siteId = dataPtInter.siteId;     // allow siteName change /* purecov: tested */
                    dataPtRef.sampleId = dataPtInter.sampleId; // allow sampleName change /* purecov: tested */
                    dataPtRef.value = dataPtInter.value; /* purecov: tested */
                }
                else
                {
                    // datapoint doesn't exist, create it
                    isNewDataPoint = true;
                    if ((sequence >= sampleSize) || (sequence < 0))
                    {
                        return SPCErrCodes.sequenceOutOfRange;
                    }

                    dataPtRef = new TEdcDataPoint(dataPtInter);
                }

                if (_measRef.specLimits != null && specRef.allowLimitOverride && !specRef.customLimit)
                {
                    specRef.customLimits(_measRef.specLimits);
                }

                if ((status = specRef.checkLimits(dataPtRef, specResult, isNewDataPoint, specLimits, screenLimits)))
                    return SPCErrCodes.ok; /* purecov: inspected */

                if (isNewDataPoint)
                {


                }

                _measRef.addData(dataPtRef);

            }
            int numEntries = _measRef.datapoints.Count;

            if ((numEntries > sampleSize)
                || (_dataCollRef.done && (numEntries < sampleSize)))
            {
                return SPCErrCodes.badSampleSize;
            }

            return SPCErrCodes.ok;
            //return status;
        }

        private SPCErrCodes applyDataCollectionUpdates(CEdcDataCollection dataCollInter)
        {
            // apply the interchange updates to the data collection _dataCollRef


            bool status = false;    // init SUCCESS

            // don't have any spec results yet, so can use base copy
            CopyDataCollToEdcSpecPrt(_specReport, dataCollInter);
            _specReport.dataCollSysId = dataCollInter.dataCollSysId;

            _planVRef = TEdcPlan.extractActive(_dataCollRef.edcPlan);

            if (_planVRef == null)
            {
                return SPCErrCodes.noActivePlan; /* purecov: inspected */
            }

            // NOTE: users can't change the edcPlan field once the 
            // data collection exists. The logic is in the store method 
            // to distinguish between the two cases, for now don't set.

            string edcPlan = _dataCollRef.edcPlan;
            BaseCopyCToTDataCollection(_dataCollRef, dataCollInter); // use base oper=
            _dataCollRef.edcPlan = edcPlan;

            return SPCErrCodes.ok;
        }


        private SPCErrCodes applyMeasurementUpdates(CEdcMeas measInter)
        {
            // apply updates at the measurement level to _measRef 
            _measRef = _dataCollRef.findMeasurement(measInter.measurementSpec);

            if (_measRef != null)
            {
                _measRef = new TEdcMeasurement(measInter); // use base oper=
            }
            else
            {
                // the measurement does not exist, make a new one

                _measRef = new TEdcMeasurement(measInter);
                _dataCollRef.addMeasurement(_measRef);



                if (measInter.overRideLimits)
                {
                    // If Measurement Spec did not set up Spec Limits, custom Spec Limits can not be set up here.
                    // overRideLimits should be FALSE, and specLimits should be NULL.
                    TEdcMeasurementSpec _specRef = _measRef.getMeasurementSpec();

                    if (_specRef == null)
                    {
                        return SPCErrCodes.invalidMeasSpecId;
                    }
                    else if (!_specRef.allowLimitOverride || _specRef.validSet.Count > 0)
                    {
                        return SPCErrCodes.customSpecLimits;
                    }

                    if (StringUtil.NullString(measInter.upperScreeningLimit) &&
                        StringUtil.NullString(measInter.upperSpecLimit) &&
                       StringUtil.NullString(measInter.target) &&
                       StringUtil.NullString(measInter.lowerSpecLimit) &&
                       StringUtil.NullString(measInter.lowerScreeningLimit))
                    {
                        throw new Exception(SPCErrCodes.invalidCustomLimit.ToString());
                    }
                    else
                    {
                        TEdcSpecLimit _specLimit = new TEdcSpecLimit();


                        _specLimit.dataType = _specRef.dataType;
                        _specLimit.upperScreeningLimit = measInter.upperScreeningLimit;
                        _specLimit.upperSpecLimit = measInter.upperSpecLimit;
                        _specLimit.target = measInter.target;
                        _specLimit.lowerSpecLimit = measInter.lowerSpecLimit;
                        _specLimit.lowerScreeningLimit = measInter.lowerScreeningLimit;
                        _specLimit.autoExclude = measInter.autoExclude;
                        _specLimit.measurementSysId = _measRef.sysId;
                        _measRef.specLimits = _specLimit;

                        var limitErr = _specLimit.validateLimits();
                        if (limitErr != SPCErrCodes.ok)
                            return limitErr;

                        _specRef.customLimits(_specLimit);

                    }
                }
            }
            return SPCErrCodes.ok;
        }





        private SPCErrCodes applyUpdates(CEdcDataCollection dataCollInter, bool correctData)
        {
            if (!correctData)
            {
                var status = applyDataCollectionUpdates(dataCollInter);
                if (status != SPCErrCodes.ok)
                    return status;
            }
            foreach (CEdcMeas measInt in dataCollInter.measurements)
            {
                if (!correctData)
                {
                    var status = applyMeasurementUpdates(measInt);
                    if (status != SPCErrCodes.ok)
                        return status;
                }

                var result = correctData ? applyDataPointCorrection(measInt)
                                     : applyDataPointUpdates(measInt.datapoints);

                if (result != SPCErrCodes.ok)
                    return result;

            }
            return SPCErrCodes.ok;
        }
        private SPCErrCodes applyDataPointCorrection(CEdcMeas measInt)
        {
            DateTime now = DateTime.Now;
            string detail = "Data excluded for modification by ";
            _measRef = _dataCollRef.findMeasurement(measInt.measurementSpec);
            detail = detail + _measRef.username + " on " + now.ToString();

            foreach (CEdcDataPoint dataPtInter in measInt.datapoints)
            {
                // look up the persist datapoint on the measurement
                int sequence = dataPtInter.sequence;
                TEdcDataPoint dataPtRef = _measRef.findData(sequence);

                // if (!dataPtRef.object() || !dataPtInter.isExcluded )
                if (dataPtRef == null || !dataPtInter.isExcluded)
                {
                    // reject data updates after published
                    return SPCErrCodes.noUpdatesAfterPubl;

                }

                // only exclude status can be corrected change through this txn
                dataPtRef.isExcluded = true; /* purecov: tested */
                dataPtRef.Annotation("GENERAL", "Modification", "Data Exclusion",
                                      detail, measInt.dataType, false, true);
            }

            return SPCErrCodes.ok;
        }

        private SPCErrCodes calculateResults()
        {
            // calculate the derived results for derived meas specs
            // in the EDC plan



            // for each measurement in the FwEdcPlan
            foreach (TEdcMeasurementSpec specRef in _planVRef.measurementSpecs)
            {
                if (specRef.isDerived)
                {
                    if (_measRef.specLimits != null && specRef.allowLimitOverride && !specRef.customLimit)
                    {
                        specRef.customLimits(_measRef.specLimits);
                    }

                    var status = specRef.calculate(_planVRef, _dataCollRef, _specReport);
                    if (status != SPCErrCodes.ok)
                        return status;
                }
            }



            //if (_planVRef->dirty())
            //    _planVRef->store();

            // NOTE: store and prepare interchanges takes place on data coll as a whole

            return SPCErrCodes.ok;
        }


        //      public bool prepareInterchanges()
        //      {
        //          // Construct interchanges that consists of only those data points 
        //          // that are modified or being published for the first time by this 
        //          // transaction, and the required owner object(s),


        //          bool success;
        //          //FwError insertErr(FwErrorCode(FwEdc, cltnInsertErr));
        //          //FwError constructErr(FwErrorCode(FwEdc, unableToConstructInter));

        //          TEdcData ;
        //          FwTry
        //          {
        //              gcRef = FwEdcData::asBBDMsg(_dataCollRef,
        //                                          _planVRef, _dataCollRef->done());
        //          }
        //          FwCatchAll()
        //          {
        //              FwError retErr(FwError::getGlobal()); /* purecov: inspected */
        //              return retErr; /* purecov: inspected */
        //          }

        //          // First create the publication for the SPC Rules server,
        //          // which consists of a multi chart data message

        //          GcRef(FwEdcMultiChartData) multiChartData;

        //          FwTry
        //        {
        //              multiChartData = gcRef->asMultiChartDataMsg();
        //          }
        //          FwCatchAll()
        //          {
        //              FwError retErr(FwError::getGlobal()); /* purecov: inspected */
        //              return retErr; /* purecov: inspected */
        //          }

        //          FwString key(FwEdcMultiChartData::bbdName());
        //          const FwObject* objPtr =
        //              _bbdMessages.insert(multiChartData, (FwObject*)key.copy());
        //          if (!objPtr)
        //          {
        //              return insertErr; /* purecov: inspected */
        //          }

        //          // Now create the publication for the SPC Display client.
        //          // Make an entry in _bbdMessages for each partition and chart name
        //          // mailbox, containing the updates for a single measurement, 
        //          // keyed by mailbox name

        //          FOREACH_PTR(gcRef->interchanges(), FwEdcDataCollInterchange, dataCollObj)
        //        {
        //              FOREACH_PTR(dataCollObj->measurements(), FwEdcMeasInterchange, measObj)
        //  {
        //                  FOREACH_REF(measObj->publicationNames(), FwString, pubName)
        //    {
        //                      // don't copy measurements since we are only publishing one at a time
        //                      GcRef(FwEdcDataCollInterchange) dataCollInter = new FwEdcDataCollInterchange();

        //                      // copy datapoints
        //                      GcRef(FwEdcMeasInterchange) measInter = new FwEdcMeasInterchange(*measObj);

        //                      if (!(dataCollInter && measInter && dataCollInter->addMeasurement(measInter)))
        //                      {
        //                          return constructErr; /* purecov: inspected */
        //                      }

        //                      *dataCollInter = *(FwEdcDataCollectionBase*)dataCollObj;
        //                      dataCollInter->dataCollSysId(dataCollObj->dataCollSysId());
        //                      dataCollInter->done(dataCollObj->done());
        //                      dataCollInter->dataCollTimeStamp(dataCollObj->dataCollTimeStamp());
        //                      dataCollInter->datetime(dataCollObj->datetime());

        //                      GcRef(FwEdcData) edcData = new FwEdcData();
        //                      if (!(edcData && edcData->addInterchange(dataCollInter)))
        //                      {
        //                          return constructErr; /* purecov: inspected */
        //                      }

        //                      FwString mbox("FwEdcData." + pubName + ".BBD");
        //                      const FwObject* objPtr =
        //                          _bbdMessages.insert(edcData, (FwObject*)mbox.copy());
        //                      if (!objPtr)
        //                      {
        //                          return insertErr;
        //                      }
        //                  }
        //                  END_FOREACH

        //  }
        //              END_FOREACH

        //}
        //          END_FOREACH

        //return success;
        //      }



        public Result<CEdcDataReply> store()
        {
            // The data interchanges contain updates for a single (new or existing) 
            // data collection.  If it is an existing data collection, the interchanges 
            // may contain modifications to data collection, measurement or 
            // data point properties, or additional (new) measurements 
            // and/or datapoints, or a combination

            CEdcDataReply retval = new CEdcDataReply();

            bool correctData = false;

            // the first record should be a data collection interchange,
            // and will tell us if this is a new or existing data collection 
            // that we are updating

            // STEP1: Get the data collection interchange

            CEdcDataCollection dataCollInter = _interchange;
            // make sure we got a valid interchange

            if (dataCollInter == null)
            {
                return SPCErrCodes.invalidInterSyntax;
            }



            // STEP 2: Determine if we are working on a new or existing data collection,
            // and modify the publication flags accordingly.

            string dataCollId = dataCollInter.dataCollSysId;

            if (StringUtil.NullString(dataCollId))
            {
                // no sysId was specified,
                // create a new data collection from the interchange

                _dataCollRef = new TEdcDataCollection(dataCollInter);
                if (_dataCollRef == null)
                {
                    // data collection construction failed
                    return SPCErrCodes.dataCollCtorFailed;
                }

                // NOTE: users can't change the edcPlan field once the data collection
                // exists so we set it here rather than in applyDataCollectionUpdates,
                // where we ignore any value supplied for an existing data collection

                _dataCollRef.edcPlan = dataCollInter.edcPlanId;
                //  _dataCollRef..->clientId(dataCollInter->clientId());

                // only allow user to set the datetime on a new data collection,
                // ie. the time that the first data was collected is used

                if (ServerConfig.GetBool("dateTimeOverride"))
                    _dataCollRef.modifiedDatetime = DateTime.Now;
                else
                    _dataCollRef.modifiedDatetime = TimeUtil.ParseSPC(dataCollInter.datetime).Value;

                // set the sysId back on the interch, needed for the bbd publications

                dataCollInter.dataCollSysId = _dataCollRef.sysId;

            }
            else
            {
                // a sysId was specified, construct a reference to
                // retrieve the existing data collection from the database

                string sysId = dataCollId;
                _dataCollRef = TEdcDataCollection.deepFetch(sysId);

                // we should now have a valid data collection reference 
                if (_dataCollRef == null)
                {
                    // invalid sysId or object does not exist
                    return SPCErrCodes.invalidSysId;
                }

                _dataCollRef.clientId = dataCollInter.clientId;
                if (_dataCollRef.done)
                {
                    correctData = true;
                    goto Correction;
                }

                if (!ServerConfig.GetBool("_BC_modifiedDate"))
                {
                    if (ServerConfig.GetBool("dateTimeOverride"))
                        _dataCollRef.modifiedDatetime = DateTime.Now;
                    else
                        _dataCollRef.modifiedDatetime = TimeUtil.ParseSPC(dataCollInter.datetime).Value;
                }
            }

            // NOTE: this may be a new or existing data collection 
            if (dataCollInter.done)
            {
                // user is ready to publish
                _dataCollRef.done = true;
            }


        // STEP 3:  Apply updates to the data collection, meas, and datapoints, 
        Correction:
            var updateErr = applyUpdates(dataCollInter, correctData);
            if (updateErr != SPCErrCodes.ok)
            {
                return updateErr;           //  return false; /* purecov: 
            }

            if (correctData)
            {
                foreach (TEdcMeasurement mRef in _dataCollRef.measurements)
                {
                    foreach (TEdcDataPoint dRef in mRef.datapoints)
                    {
                        if (dRef.isExcluded == false) /* purecov: tested */
                        {
                            return SPCErrCodes.noUpdatesAfterPubl; /* purecov: tested */
                        }
                    }
                }
            }

            if (!correctData && _dataCollRef.done)
            {
                // STEP 4:  Calculate derived results 

                var calcErr = calculateResults();
                if (calcErr != SPCErrCodes.ok)
                {
                    return calcErr;    //  return false; /* purecov: inspected */
                }

                // STEP 5: Remove intermediate values

                foreach (TEdcMeasurementSpec specRef in _planVRef.measurementSpecs)
                {
                    if (specRef.isDerived)
                    {
                        TEdcDerivation derivRef = specRef.derivation;
                        if (derivRef == null)
                        {
                            return SPCErrCodes.incompleteObject;
                        }
                        if (!derivRef.storeInDatabase)
                        {
                            _dataCollRef.removeMeasurement(specRef.name);
                        }
                    }
                }


                // filter out OVERFLOW marks

                foreach (TEdcMeasurement measRef in _dataCollRef.measurements)
                {
                    foreach (TEdcDataPoint dataPtRef in measRef.datapoints)
                    {
                        string val = dataPtRef.value;
                        if (val == PositiveInf || val == NegativeInf)
                            dataPtRef.value = (SpcNilString);
                    }
                }



                // STEP 6: Construct the interchange objects for publication to the 
                // analysis bulletin board

                //bool prepErr = prepareInterchanges();
                //if (prepErr.isError())
                //{
                //    result.error(prepErr); /* purecov: inspected */
                //    return FALSE;
                //}
            }

            // STEP 7: store the data collection, first updating its time stamp.
            // Nnotification to the general bbd happens in the 
            // FwEdcDataCollection postCommitToStore method.

            if (_dataCollRef.inStore)
            {
                // only allow user to specify the time stamp for an existing data coll
                _dataCollRef.timeStamp = dataCollInter.dataCollTimeStamp;
                // _dataCollRef->markDirty();
            }

            var storStat = _dataCollRef.Save();
            if (storStat != SPCErrCodes.ok)
            {
                return storStat;
                //throw new Exception("data collection store error ");
            }

            // STEP 8:  return the spec report - do each time updates are stored,
            // where or not we published.

            if (correctData)
            {
                //复制DataCollectionBase中的字段
                _specReport.edcPlanId = dataCollInter.edcPlanId;
                _specReport.productName = dataCollInter.productName;
                _specReport.planId = dataCollInter.planId;
                _specReport.initialStepId = dataCollInter.initialStepId;
                _specReport.lotId = dataCollInter.lotId;
                _specReport.batchId = dataCollInter.batchId;
                _specReport.stageId = dataCollInter.stageId;
                _specReport.areaId = dataCollInter.areaId;


                _specReport.dataCollSysId = dataCollInter.dataCollSysId; /* purecov: tested */
            }


            retval.specReport = _specReport;
            if (dataCollInter.returnDerived == "OnPublish")
            {
                //  retval.derivedMeasurements.AddRange(_dataCollRef.measurements);
                addDerivedMeasurements(retval, _dataCollRef.measurements);

            }
            //result.value(retval);




            return retval;
        }
        public bool addDerivedMeasurements(CEdcDataReply retval, List<TEdcMeasurement> measurements)
        {
            foreach (TEdcMeasurement mRef in measurements)
            {
                CEdcMeas mInter = mRef.makeInterchange();

                retval.derivedMeasurements.Add(mInter);
                foreach (TEdcDataPoint ptRef in mRef.datapoints)

                {
                    CEdcDataPoint ptInter = ptRef.makeInterchange(false);

                    mInter.datapoints.Add(ptInter);

                }
            }
            return true;
        }


    }


}
