//namespace SPCService.src.Framework.Common
//{
//    public class ErrorMessage 
//    { 
//    // generalEdcError
//    "Unspecified EDC error",

//    // noCurrentEdcPlanVersion
//    "No current version of EDC plan: $1.",

//    // infFetchingWhereUsed
//    "Fetching where used information.",

//    // planNotStored
//    "Plan $1 not saved.",

//    // noPlanSelected
//    "No plan currently selected.  Please select a plan and try again.",

//    // noUnassignedSpecSelected
//    "No measurement spec selected for assignment.",

//    //noAssignedSpecSelected
//    "No measurement spec selected for deassignemnt.",

//    // noUnassignedChartSelected
//    "No chart selected for assignment.",

//    //noAssignedChartSelected
//    "No chart selected for deassignemnt.",

//    //selectedMeasSpecNotFound
//    "Measurement spec $1 not found.",

//    //infStoringObject
//    "Storing $1 to database.",

//    //measSpecAlreadyInPlan
//    "Measurement spec $1 is already in plan.",

//    //chartAlreadyInPlan
//    "Chart $1 is already in plan.",
    
//    //invalidMeasSpecId
//    "Invalid measurement spec name.",

//    //measSpecNotSaved
//    "Unable to save measurement spec $1.",

//    //errBadSpecLimits
//    "Invalid range for spec or screening Limits.",

//    //errBadTargetVal
//    "Target value out of range.",

//    // errSpecLimitsInvalid
//    "Illegal spec limits for dataType=STRING",

//    // errBadMeasQty 
//    "Measurement quantities must be positive.",

//    // errBadDataType
//    "Invalid data type - valid types are STRING, FLOAT, or INTEGER.",

//    //errMissingParam
//    "Missing parameter in plan.",

//    //errPlanIsActive
//    "Can not delete plan - plan is Active.",

//    //errPlanHasIssueHist
//    "Can not delete plan - Issue history exists.",

//    //errFrozenPlanExists
//    "Can not delete plan - Frozen version exists.",

//    //errNoSpecsNoIssue
//    "Plans without measurement specs can not be issued beyond Unfrozen.", 

//    //confirmSaveBeforeVersionsDlg
//    "This version must be saved before selecting a new version.  Save it now?",

//    //samplingValOutOfRange
//    "Sampling count out of range, must be positive integer between $1 and $2.",

//    // fwcore messages
//    "Do you wish to deactivate version: $1.$2?",
//    "This version must be saved before it is issued.  Save it now?",
//    "Unable to access issue controller.",
//    "Creating new $1 version.",
//    "Can not open $1 window.",
//    "Can not delete. Unable to confirm if $1 is in use.",
//    "No storage adaptor for this transaction.",
//    "Can not delete. This $1 is in use.",
//    "Create of $1 failed.",

//    // server messages
//    "Invalid interchange syntax: $1.",
//    "Unable to construct the plan instance.",
//    "Invalid sysId or object does not exist.",
//    "Unexpected nil object.",
//    "Insert failed.",
//    "Invalid interchange syntax, multiple plans.",
//    "Can not open file for write.",
//    "Invalid plan name, plan does not exist.",
//    "Plan has no active version.",
//    "Server validation of '$1' failed.",

//    // error codes for SPCmstr

//    // unknownBusObj
//    "Unknown object of Type: $1 received.",

//    //incompleteMsg
//    "Incomplete bulletin board message received, unable to process. ",

//    // invalidParameters
//    "Invalid or wrong number of parameters.",

//    // dropChartFail
//    "Drop chart failed.",

//    // addChartFail
//    "Add chart failed.",

//    //modifyChartFail
//    "Modify chart failed.",

//    // noChartListFound
//    "No chart list found.",

//    // noChartFound
//    "No chart found.",

//    // noDataFound
//    "No data found.",

//    // chartAlreadyAdded
//    "Chart: $1 has already been added to $2.",

//    // chartNeverAdded
//    "Chart: $1 was never added to $2.",

//    // invalidChartName
//    "Invalid chart name, chart does not exist.",

//    // noTemplateFound
//    "No chart template found.",

//    // new error messages for 2.1 release
//    //
//    "Element $1 is missing from window.",
//    "This $1 is not in use.",
//    "Retrieving where-used information from database.",
//    "Bad arguments passed.",
//    "Invalid parameter name, parameter does not exist.",
//    "Invalid sample size specified.",
//    //
//    // introduced for 2.2 release
//    //
//    "Unable to construct interchanges for BBD notification.",
//    "No data publication scheme specified.",
//    "Invalid measurement type specified.",
//    "Invalid collection type specified.",
//    //
//    // 3.0 assoc release
//    // 
//    "Object is incomplete.",
//    "Bad objects on collection. $1 objects expected.",
//    "Updates are not permitted after publication.",
//    "Sampling plan not followed.  Missing or extra data",
//    "Data type $1 is invalid for calculations.",
//    "Data handling type $1 is invalid for the $2 operation.",
//    "Unsupported operator or not yet implemented.",
//    "Invalid data handling type.",
//    "Operand `$1' of Derived Measurement Spec `$2' not in Plan.",
//    "This Measurement Spec has outstanding unpublished\n\n    data collection(s). Change sampling size?",
//    "Checking for outstanding unpublished data collection.",
//    "Multiple measurements for the same measurementSpec `$1'.",
//    "Sequence `$1' out of range for measurementSpec `$2'.",
//    "Custom Spec Limit does not allow for MeasurementSpec `$1'.",
//    "Invalid custom spec limit.",
//    "Invalid spc rule name.",
//    "Invalid comparison operator.",
//    "Invalid spc rule condition.",
//    "Invalid Operand Data: DataCollection, UpperScreeningLimit, UpperSpecLimit, Target, LowerSpecLimit, LowerScreeningLimit.",
//    "Invalid limit selection: Spec or Screening.",
//    "Spc Rule `$1' already exists.",
//    "Spc Rule `$1' does not exist.",
//    "Invalid type. Must be Plan or Chart or ChartTemplate or MeasurementSpec.",

//    nil
//    };

//}
//}
