interface GetAppSettingReq {
	name?: string;
	version?: number;
}

interface GetAppSettingResp {
	maxVersion?: number;
	version?: number;
	data?: string;
}

interface SetAppSettingReq {
	name?: string;
	data?: string;
}

interface SetAppSettingResp {
	maxVersion?: number;
	version?: number;
	data?: string;
}

interface DeptCreateReq {
	LOGIN_NAME?: string;
	PARENT_ID?: string;
	DEPT_NAME?: string;
	ORDER_NUM?: string;
	LEADER?: string;
	PHONE?: string;
	EMAIL?: string;
	STATUS?: string;
}

interface DeptCreateResp {
}

interface DeptSelectReq {
	DEPT_NAME?: string;
	STATUS?: string;
}

interface DeptSelectResp {
	allDepts?: DeptInfoPb[];
}

interface DeptInfoPb {
	DEPT_NAME?: string;
	ORDER_NUM?: string;
	STATUS?: string;
	CREATE_TIME?: string;
	DEPT_ID?: string;
}

interface SelectDeptByIDReq {
	DEPT_ID?: string;
}

interface SelectDeptByIDResp {
	PARENT_ID?: string;
	DEPT_NAME?: string;
	ORDER_NUM?: string;
	LEADER?: string;
	PHONE?: string;
	EMAIL?: string;
	STATUS?: string;
}

interface DeptDeleteReq {
	DEPT_ID?: string;
}

interface DeptDeleteResp {
}

interface DeptUpdateReq {
	PARENT_ID?: string;
	DEPT_NAME?: string;
	ORDER_NUM?: string;
	LEADER?: string;
	PHONE?: string;
	EMAIL?: string;
	STATUS?: string;
	DEPT_ID?: string;
	LOGIN_NAME?: string;
}

interface DeptUpdateResp {
}

interface ChooseDeptReq {
}

interface ChooseDeptResp {
	DEPT_ID?: string;
	ANCESTORS?: string;
	DEPT_NAME?: string;
	PARENT_ID?: string;
}

interface MenuCreateReq {
	MENU_NAME?: string;
	PARENT_ID?: string;
	ORDER_NUM?: string;
	URL?: string;
	TARGET?: string;
	MENU_TYPE?: string;
	VISIBLE?: string;
	IS_REFRESH?: string;
	PERMS?: string;
	ICON?: string;
	CREATE_BY?: string;
	REMARK?: string;
}

interface MenuCreateResp {
}

interface MenuSelectReq {
	MENU_NAME?: string;
	VISIBLE?: string;
}

interface MenuSelectResp {
	allMenus?: MenuInfoPb[];
}

interface MenuInfoPb {
	MENU_ID?: string;
	MENU_NAME?: string;
	PARENT_ID?: string;
	ORDER_NUM?: string;
	URL?: string;
	TARGET?: string;
	MENU_TYPE?: string;
	VISIBLE?: string;
	IS_REFRESH?: string;
	PERMS?: string;
	ICON?: string;
	CREATE_BY?: string;
	CREATE_TIME?: string;
	UPDATE_BY?: string;
	UPDATE_TIME?: string;
	REMARK?: string;
}

interface MenuDeleteReq {
	Menu_ID?: string;
}

interface MenuDeleteResp {
}

interface MenuUpdateReq {
	MENU_NAME?: string;
	PARENT_ID?: string;
	ORDER_NUM?: string;
	URL?: string;
	TARGET?: string;
	MENU_TYPE?: string;
	VISIBLE?: string;
	IS_REFRESH?: string;
	PERMS?: string;
	ICON?: string;
	UPDATE_BY?: string;
	REMARK?: string;
	MENU_ID?: string;
}

interface MenuUpdateResp {
}

interface RoleMenuCreateReq {
	MENU_ID?: string[];
	ROLE_ID?: string;
}

interface RoleMenuCreateResp {
}

interface RoleMenuInfoPb {
	ID?: string;
	MENU_ID?: string;
	ROLE_ID?: string;
}

interface RoleMenuSelectByIDReq {
	ROLE_ID?: string;
}

interface RoleMenuSelectByIDResp {
	singleRoleMenus?: RoleMenuInfoPb[];
}

interface RoleCreateReq {
	ROLE_NAME?: string;
	ROLE_KEY?: string;
	ROLE_SORT?: string;
	STATUS?: string;
	REMARK?: string;
}

interface RoleCreateResp {
}

interface RoleSelectReq {
	ROLE_NAME?: string;
	ROLE_KEY?: string;
	STATUS?: string;
	STARTTIME?: string;
	ENDTIME?: string;
}

interface RoleSelectResp {
	allRoles?: RoleInfoPb[];
}

interface RoleInfoPb {
	ROLE_ID?: string;
	ROLE_NAME?: string;
	ROLE_KEY?: string;
	ROLE_SORT?: string;
	STATUS?: string;
	CREATE_TIME?: string;
	REMARK?: string;
}

interface RoleSelectRoleByIDReq {
	ROLE_ID?: string;
}

interface RoleSelectRoleByIDResp {
	ROLE_NAME?: string;
	ROLE_KEY?: string;
	ROLE_SORT?: string;
	STATUS?: string;
	REMARK?: string;
}

interface RoleDeleteReq {
	ROLE_ID?: string;
}

interface RoleDeleteResp {
}

interface RoleUpdateReq {
	ROLE_ID?: string;
	ROLE_NAME?: string;
	ROLE_KEY?: string;
	ROLE_SORT?: string;
	STATUS?: string;
	REMARK?: string;
}

interface RoleUpdateResp {
}

interface SpcCatagoryNode {
	title?: string;
	key?: string;
	isLeaf?: boolean;
	cataLevel?: number;
	children?: SpcCatagoryNode[];
}

interface GetSpcCatagoryNodesReq {
}

interface GetSpcCatagoryNodesResp {
	nodes?: SpcCatagoryNode[];
}

interface AddSpcCatagoryNodeReq {
	title?: string;
	cataLevel?: number;
	isLeaf?: boolean;
	parent?: string;
}

interface AddSpcCatagoryNodeResp {
}

interface UpdateSpcCatagoryNodeReq {
	key?: string;
	title?: string;
}

interface UpdateSpcCatagoryNodeResp {
}

interface QueryCatagoryMSpecReq {
	catagoryId?: string;
}

interface QueryCatagoryMSpecResp {
	globalList?: CEdcMeasSpec[];
	cataList?: CEdcMeasSpec[];
}

interface UpdateCatagoryMSpecReq {
	catagoryId?: string;
	mspecList?: string[];
}

interface UpdateCatagoryMSpecResp {
}

interface CreateSpcPlanReq {
}

interface SaveEdcMeasurementSpecReq {
	Object?: CEdcMeasSpec;
}

interface QueryEdcMeasurementSpecsReq {
	CatagoryId?: string;
	Name?: string;
}

interface QueryEdcChartsReq {
	CatagoryId?: string;
	Name?: string;
}

interface SpcEdcDeleteObjectsTxnReq {
	ClassName?: string;
	SpcObjects?: string;
}

interface SpcEdcDeleteSingleObjectTxnReq {
	ClassName?: string;
	SpcObject?: string;
}

interface SpcEdcFetchObjectsTxnReq {
	ClassName?: string;
	IsDeepFetch?: boolean;
	sWhere?: string;
}

interface SpcEdcFetchSingleObjectTxnReq {
	ClassName?: string;
	IsDeepFetch?: boolean;
	sWhere?: string;
}

interface SpcEdcSaveObjectsTxnReq {
	ClassName?: string;
	SpcObjects?: string;
}

interface SpcEdcSaveSingleObjectTxnReq {
	ClassName?: string;
	SpcObject?: string;
}

interface SPCEdcQueryChartTxnReq {
	Name?: string;
}

interface SPCEdcQueryDataTxnReq {
	edcPlan?: string;
	fromDate?: string;
	historicalPoints?: number;
	toDate?: string;
	measurementSpec?: string;
	unitId?: string;
	siteId?: string;
	numberOfGroups?: number;
	groupSize?: string;
	productName?: string;
	planId?: string;
	initialStepId?: string;
	batchId?: string;
	stageId?: string;
	areaId?: string;
	tag1?: string;
	tag2?: string;
	groupHistKey?: string;
	measurementResource?: string;
	userId?: string;
	processStep?: string;
	processResource?: string;
	lotId?: string;
	measurementStep?: string;
}

interface SpcEdcAnnotationTxnReq {
	historySysId?: string;
	annotationCode?: string;
	reasonCode?: string;
	briefDescription?: string;
	detailDescription?: string;
	userId?: string;
	datetime?: string;
	statusFlag?: string;
}

interface SpcEdcQueryPointTxnReq {
	dataSysId?: string;
	chart?: string;
	graph?: string;
	dataset?: string;
	annotationCode?: string;
	initialValue?: string;
}

interface SpcEdcCreateSpcRuleTxnReq {
	name?: string;
	reason?: string;
	testCount?: number;
	outOf?: number;
	comparison?: string;
	withRespectTo?: string;
	value?: string;
	stdDevs?: string;
	datasetName?: string;
	intervalFrom?: string;
	intervalTo?: string;
}

interface SpcEdcUpdateSpcRuleTxnReq {
	name?: string;
	reason?: string;
	testCount?: number;
	outOf?: number;
	comparison?: string;
	withRespectTo?: string;
	value?: string;
	stdDevs?: string;
	datasetName?: string;
	intervalFrom?: string;
	intervalTo?: string;
}

interface SpcEdcDeleteSpcRuleTxnReq {
	name?: string;
}

interface SpcEdcExcludePointTxnReq {
	historySysId?: string;
	briefDescription?: string;
	detailDescription?: string;
	excludeFlag?: boolean;
}

interface SpcEdcFetchMeasSpecTxnReq {
	name?: string;
}

interface SpcEdcListChartsTxnReq {
	partition?: string;
	measurementSpec?: string;
	startupCheck?: boolean;
}

interface SpcEdcListPlansTxnReq {
}

interface SpcEdcListSpcRulesTxnReq {
}

interface SpcEdcFetchDataTxnReq {
	dataCollSysId?: string;
}

interface DeleteMeasurementSpecReq {
	Name?: string;
	Client?: ClientInfo;
}

interface CreateSpcPlanResp {
}

interface KeyValue {
	Key?: string;
	Value?: string;
}

interface CEdcSpecRpt {
	dataCollSysId?: string;
	edcPlanId?: string;
	productName?: string;
	planId?: string;
	initialStepId?: string;
	lotId?: string;
	batchId?: string;
	stageId?: string;
	areaId?: string;
	specResults?: CEdcSpecRes[];
}

interface CEdcSpecRes {
	measurementSpec?: string;
	measurementType?: string;
	dataType?: string;
	measurementStep?: string;
	measurementResource?: string;
	processStep?: string;
	processResource?: string;
	userId?: string;
	specStatus?: string;
	upperSpecLimit?: string;
	lowerSpecLimit?: string;
	datapoints?: CEdcDataPoint[];
	username?: string;
}

interface CEdcRuleRpt {
	dataCollSysId?: string;
	edcPlanId?: string;
	productName?: string;
	planId?: string;
	initialStepId?: string;
	lotId?: string;
	batchId?: string;
	stageId?: string;
	areaId?: string;
	tag1?: string;
	tag2?: string;
	groupHistKey?: string;
	ruleResults?: CEdcRuleRes[];
}

interface SpcEdcMegaAnnotationTxnReq {
	dataCollSysId?: string;
	edcPlanId?: string;
	productName?: string;
	planId?: string;
	initialStepId?: string;
	lotId?: string;
	batchId?: string;
	stageId?: string;
	areaId?: string;
	tag1?: string;
	tag2?: string;
	groupHistKey?: string;
	clientId?: string;
	ruleResults?: CEdcRuleRes[];
}

interface SpcEdcQueryContextTxnReq {
	edcPlanId?: string;
	productName?: string;
	planId?: string;
	initialStepId?: string;
	lotId?: string;
	batchId?: string;
	stageId?: string;
	areaId?: string;
	tag1?: string;
	tag2?: string;
	groupHistKey?: string;
	includeMeasurements?: boolean;
}

interface SpcEdcQueryPlanTxnReq {
	planName?: string;
}

interface SpcEdcQuerySpcRuleTxnReq {
	name?: string;
}

interface CEdcRuleRes {
	measurementSpec?: string;
	measurementStep?: string;
	measurementResource?: string;
	processStep?: string;
	processResource?: string;
	userId?: string;
	chartResults?: CEdcChartRes[];
}

interface CEdcChartRes {
	chartName?: string;
	displayOption?: string;
	chartStatus?: string;
	errorInfo?: string;
	dataPointHistories?: CEdcDataPtHistory[];
}

interface CEdcDataCollection {
	dataCollSysId?: string;
	dataCollTimeStamp?: number;
	edcPlanId?: string;
	productName?: string;
	planId?: string;
	initialStepId?: string;
	lotId?: string;
	batchId?: string;
	stageId?: string;
	areaId?: string;
	tag1?: string;
	tag2?: string;
	groupHistKey?: string;
	done?: boolean;
	returnDerived?: string;
	clientId?: string;
	datetime?: string;
	measurements?: CEdcMeas[];
}

interface CEdcDataPtHistory {
	dataSysId?: string;
	historySysId?: string;
	chart?: string;
	graph?: string;
	dataset?: string;
	initialValue?: string;
	dataType?: string;
	isExcluded?: boolean;
	hasViolations?: boolean;
	hasComments?: boolean;
	isDataBoundary?: boolean;
	annotations?: CEdcAnnotation[];
}

interface CEdcAnnotation {
	annotationCode?: string;
	reasonCode?: string;
	briefDescription?: string;
	detailDescription?: string;
	dataset?: string;
	userId?: string;
	datetime?: string;
}

interface CEdcMeas {
	measurementSpec?: string;
	measurementType?: string;
	isDerived?: boolean;
	dataType?: string;
	measurementStep?: string;
	measurementResource?: string;
	procAessStep?: string;
	processResource?: string;
	userId?: string;
	chartNames?: string[];
	allowLimitOverride?: boolean;
	specLimits?: CEdcSpecLimit;
	datapoints?: CEdcDataPoint[];
	overRideLimits?: boolean;
	upperScreeningLimit?: string;
	upperSpecLimit?: string;
	target?: string;
	lowerSpecLimit?: string;
	lowerScreeningLimit?: string;
	autoExclude?: boolean;
}

interface CEdcSpecLimit {
	measurementSysId?: string;
	upperScreeningLimit?: string;
	upperSpecLimit?: string;
	target?: string;
	lowerSpecLimit?: string;
	lowerScreeningLimit?: string;
	isExcluded?: boolean;
}

interface CEdcDataPoint {
	dataSysId?: string;
	modified?: boolean;
	unitId?: string;
	siteId?: string;
	sampleId?: string;
	sequence?: number;
	value?: string;
	isExcluded?: boolean;
	isDataBoundary?: boolean;
	hasHistory?: boolean;
	dataPointHistories?: CEdcDataPtHistory[];
}

interface CEdcChart {
	Sysid?: string;
	name?: string;
	spcTemplate?: string;
	measurementSpec?: string;
	edcPlan?: string;
	planId?: string;
	productName?: string;
	stepId?: string;
	lotId?: string;
	equipment?: string;
	partition?: string;
	publishToName?: boolean;
	loadOnStartup?: boolean;
	whenToDisplay?: string;
	historicalHours?: number;
	historicalPoints?: number;
	rulesDatas?: string[];
	edcParameters?: CEdcChartParameter[];
	description?: string;
}

interface CEdcVrMinMax {
	Name?: string;
	Min?: string;
	Max?: string;
}

interface CEdcSpcCustomRule {
	name?: string;
	reason?: string;
	testCount?: number;
	outOf?: number;
	comparison?: string;
	withRespectTo?: string;
	value?: string;
	stdDevs?: string;
	datasetName?: string;
	intervalFrom?: string;
	Sysid?: string;
}

interface CEdcChartTemplate {
	Sysid?: string;
	Name?: string;
	Description?: string;
	spcTemplate?: string;
	defaultParameters?: CEdcChartParameter[];
}

interface CEdcSpcSystemRule {
	Sysid?: string;
	name?: string;
	description?: string;
	detaildesc_en?: string;
	detaildesc_zh?: string;
	seq?: number;
}

interface CEdcMeasSpec {
	name?: string;
	description?: string;
	measurementType?: string;
	dataType?: string;
	unit?: string;
	isDerived?: boolean;
	allowLimitOverride?: boolean;
	upperScreeningLimit?: string;
	upperSpecLimit?: string;
	target?: string;
	lowerSpecLimit?: string;
	lowerScreeningLimit?: string;
	autoExclude?: boolean;
	prompt?: string;
	collectionType?: string;
	numberOfUnits?: number;
	numberOfSites?: number;
	numberOfSamples?: number;
	validset?: string[];
	Sysid?: string;
}

interface CEdcDataReply {
	specReport?: CEdcSpecRpt;
	derivedMeasurements?: CEdcMeas[];
}

interface CEdcPlanVersion {
	Name?: string;
	Description?: string;
	operatorInstructions?: string;
	Owner?: string;
	Revision?: string;
	RevState?: string;
}

interface CEdcPlan {
	name?: string;
	description?: string;
	owner?: string;
	revision?: string;
	revState?: string;
}

interface CEdcSamplingPlan {
	collectionType?: string;
	prompt?: string;
	operatorInstructions?: string;
	numberOfUnits?: number;
	numberOfSites?: number;
	numberOfSamples?: number;
}

interface CEdcChartParameter {
	sysid?: string;
	property?: string;
	value?: string;
}

interface CEdcDerivation {
	edcOperator?: string;
	operand1?: string;
	operand2?: string;
	Value?: string;
	dataHandlingType?: string;
	Data1?: string;
	Data2?: string;
	limitSelection?: string;
	upperLimit?: string;
	lowerLimit?: string;
	storeInDatabase?: boolean;
}

interface ClientInfo {
	UserName?: string;
	IPAddress?: string;
	MACInfo?: string;
	LoginUser?: string;
}

enum ValidateType {
	Limits = "Limits",
	ValueSet = "ValueSet",
	NoVaidation = "NoVaidation",
}

enum EnumLinkName {
	defaultParameters = "defaultParameters",
	overrideParameters = "overrideParameters",
	spcCustomRule = "spcCustomRule",
	measurementSpecs = "measurementSpecs",
	attributes = "attributes",
	versions = "versions",
	rules = "rules",
	objectUserSet = "objectUserSet",
	validRangeCollection = "validRangeCollection",
	vrSet = "vrSet",
	catagory = "catagory",
}

enum EnumOpType {
	Create = "Create",
	Modify = "Modify",
	Delete = "Delete",
}

enum DataType {
	STRING = "STRING",
	INTEGER = "INTEGER",
	FLOAT = "FLOAT",
}

enum ConnectionFlag {
	REQUIRED = "REQUIRED",
	OPTIONAL = "OPTIONAL",
	DEFERABLE = "DEFERABLE",
}

enum MeasurementType {
	ENVIRONMENT = "ENVIRONMENT",
	EQUIPMENT = "EQUIPMENT",
	LOT = "LOT",
	SITE = "SITE",
	WAFER = "WAFER",
}

enum ChartWhentoDisplay {
	ALWAYS = "ALWAYS",
	ONREQUEST = "ONREQUEST",
	RULEVIOLATION = "RULEVIOLATION",
	NEVER = "NEVER",
}

interface PostQueryReq {
}

interface PostQueryResp {
	allPosts?: PostInfoPb[];
}

interface PostInfoPb {
	postId?: string;
	postCode?: string;
	postName?: string;
	postSort?: string;
	status?: string;
	createTime?: string;
	createBy?: string;
	updateTime?: string;
	updateBy?: string;
	remark?: string;
}

interface PostRemoveReq {
	postId?: string;
}

interface PostRemoveResp {
}

interface PostCreateReq {
	postCode?: string;
	postName?: string;
	postSort?: string;
	status?: string;
}

interface PostCreateResp {
}

interface PostAlertReq {
	postId?: string;
	postCode?: string;
	postName?: string;
	postSort?: string;
	status?: string;
}

interface PostAlertResp {
}

interface UserLoginReq {
	account?: string;
	pwd?: string;
}

interface UserLoginResp {
	authToken?: string;
	account?: string;
	role?: string;
	param?: string;
}

interface UserRolePb {
	role?: string;
	param?: string;
}

interface UserCreateReq {
	LOGIN_NAME?: string;
	USER_NAME?: string;
	DEPT_ID?: string;
	USER_TYPE?: string;
	PHONENUMBER?: string;
	PASSWORD?: string;
	STATUS?: string;
	REMARK?: string;
	ROLE_KEY?: string;
}

interface UserCreateResp {
}

interface UserQueryReq {
}

interface UserQueryResp {
	allUsers?: UserInfoPb[];
}

interface UserInfoPb {
	USER_ID?: string;
	DEPT_ID?: string;
	LOGIN_NAME?: string;
	USER_NAME?: string;
	PHONENUMBER?: string;
	STATUS?: string;
	CREATE_TIME?: string;
	USER_TYPE?: string;
	REMARK?: string;
	ROLE_KEY?: string;
}

interface UserRemoveReq {
	USER_ID?: string;
}

interface UserRemoveResp {
}

interface UserSelectByIDReq {
	USER_ID?: string;
}

interface UserSelectByIDResp {
	User_ID?: string;
	LOGIN_NAME?: string;
	USER_NAME?: string;
	DEPT_ID?: string;
	USER_TYPE?: string;
	PHONENUMBER?: string;
	STATUS?: string;
	REMARK?: string;
}

interface UserResetPwdReq {
	USER_ID?: number;
	OLD_PASSWORD?: string;
	NEW_PASSWORD?: string;
}

interface UserResetPwdResp {
}

interface UserUpdateReq {
	USER_ID?: string;
	LOGIN_NAME?: string;
	USER_NAME?: string;
	DEPT_ID?: string;
	USER_TYPE?: string;
	PHONENUMBER?: string;
	STATUS?: string;
	REMARK?: string;
	ROLE_KEY?: string;
}

interface UserUpdateResp {
}

