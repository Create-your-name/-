using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SPCService.src.Framework.Common
{
    public enum SPCErrCodes
    {
        ok,        // messages start at 1--not 0
        generalEdcError,
        //
        // user errors and notifications
        //
        measSpecNameAlreadyExist,
        noCurrentEdcPlanVersion,
        infFetchingWhereUsed,
        planNotStored,
        noPlanSelected,
        noUnassignedMeasSpecSelected,
        noAssignedMeasSpecSelected,
        noUnassignedChartSelected,
        noAssignedChartSelected,
        selectedMeasSpecNotFound,
        infStoringObject,
        measSpecAlreadyInPlan,
        chartAlreadyInPlan,
        invalidMeasSpecId,
        measSpecNotSaved,
        errBadSpecLimits,
        errBadTargetVal,
        errSpecLimitsInvalid,
        errBadMeasQty,
        errBadDataType,
        errMissingParam,
        errPlanIsActive,
        errPlanHasIssueHist,
        errFrozenPlanExists,
        errNoSpecsNoIssue,
        confirmSaveBeforeVersionsDlg,
        samplingValOutOfRange,
        //
        // fwcore messages
        //
        confirmDeactivateCurrentVersion,
        confirmSaveBeforeIssue,
        noIssueController,
        infCreateNewVersion,
        cantOpenWindow,
        unableToConfirmWhereUsed,
        missingStorageAdaptor,
        objectInUse,
        objCreateFailed,
        //
        //  server errors
        // 
        invalidInterSyntax,
        dataCollCtorFailed,
        invalidSysId,
        unexpectedNilObj,
        cltnInsertErr,
        multipleDataCollErr,
        cantOpenFile,
        invalidPlanName,
        noActivePlan,
        serverValidationFailed,
        //
        // error codes for SPCmstr
        //
        unknownBusObj,
        incompleteMsg,
        invalidParameters,
        dropChartFail,
        addChartFail,
        modifyChartFail,
        noChartListFound,
        noChartFound,
        noDataFound,
        chartAlreadyAdded,
        chartNeverAdded,
        invalidChartName,
        noTemplateFound,
        //
        // new error codes for 2.1 release
        //
        missingElement,
        objectNotInUse,
        infWhereUsed,
        badArgsPassed,
        invalidParameterName,
        invalidSampleSize,
        //
        // introduced in 2.2
        //
        unableToConstructInter,
        nowhereToPublish,
        invalidMeasType,
        invalidCollType,
        //
        //  3.0 assoc release
        //
        incompleteObject,
        badObjectsOnCltn,
        noUpdatesAfterPubl,
        badSampleSize,
        invalidDataTypeForCalc,
        invalidHandlingTypeForOp,
        notYetImplemented,
        invalidDataHandlingType,
        operandNotInPlan,
        pendingDataCollection,
        checkPendingDataCollection,
        dupMeasInterchange,
        sequenceOutOfRange,
        customSpecLimits,
        invalidCustomLimit,
        invalidSpcRuleName,
        invalidComparison,
        invalidRuleValue,
        invalidOperandData,
        invalidLimitSelection,
        spcAlreadyExists,
        spcRuleDoesNotExists,
        errInvalidType,

        numMessages ,
        globalErr,
        storeErr
    };
}
