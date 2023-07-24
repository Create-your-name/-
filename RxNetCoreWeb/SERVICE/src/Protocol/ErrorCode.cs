public class ErrorCode 
{
	public const int OK = 0;		//成功
	public const int DefaultError = 1;		//默认错误
	public const int PermissionDenied = 10;		//权限不足
	public const int CantOpenAddress = 100;		//无法连接地址
	public const int BadRequest = 1000;		//错误的请求消息
	public const int ServerException = 1001;		//服务器错误
	public const int TimeOut = 1002;		//超时
	public const int RequestParaError = 1005;		//请求参数异常
	public const int ServerDataError = 1006;		//服务器数据错误
	public const int BadDataFormat = 1016;		//提交数据格式有误
	public const int InitDraftCantDrop = 1017;		//初始草稿无法丢弃
	public const int IdDuplicate = 1018;		//ID已存在
	public const int MissRequiredField = 1019;		//缺少必填数据
	public const int OperationFail = 1020;		//操作失败
	public const int UserAlreadyExist = 1101;		//用户已存在
	public const int AccountOrPwdError = 1102;		//用户名或密码错
	public const int PasswordError = 1118;		//密码错误
	public const int UserNotExist = 1121;		//用户不存在
	public const int PostAlreadyExist = 1201;		//岗位已存在
	public const int PostNotExist = 1221;		//岗位不存在
	public const int FormatNotRecog = 1300;		//格式未识别
	public const int FileNotExist = 1301;		//文件不存在
	public const int EditNoConfirm = 1302;		//有未审核的编辑
	public const int BadFileName = 1303;		//文件名格式错误
	public const int BadMesResponse = 1304;		//MES系统响应失败
	public const int DeviceNotExist = 1305;		//设备不存在
	public const int FormatConflict = 1306;		//格式冲突
	public const int FormatParseException = 1307;		//格式解析异常
	public const int FormatHandlerNotFound = 1308;		//无法找到处理程序
	public const int NotchNotExist = 1309;		//角度信息不存在
	public const int UserConfirmSame = 1310;		//二次确认不能是同一个用户
	public const int UserConfirmNeed = 1311;		//操作需要二次确认
	public const int UserConfirmFail = 1312;		//二次确认失败
	public const int WaferMapNotFound = 1313;		//WaferMap未找到
	public const int MissWaferID = 1314;		//缺少钢印号
	public const int HasSubMenu = 1400;		//目录下还有子菜单
	public const int MenuNotExist = 1401;		//菜单不存在
	public const int GMAuthenticationFail = 5000;		//认证失败

	public static string CodeToDesc(int code) {
		switch(code) {
			case 0:
				return "成功";
			case 1:
				return "默认错误";
			case 10:
				return "权限不足";
			case 100:
				return "无法连接地址";
			case 1000:
				return "错误的请求消息";
			case 1001:
				return "服务器错误";
			case 1002:
				return "超时";
			case 1005:
				return "请求参数异常";
			case 1006:
				return "服务器数据错误";
			case 1016:
				return "提交数据格式有误";
			case 1017:
				return "初始草稿无法丢弃";
			case 1018:
				return "ID已存在";
			case 1019:
				return "缺少必填数据";
			case 1020:
				return "操作失败";
			case 1101:
				return "用户已存在";
			case 1102:
				return "用户名或密码错";
			case 1118:
				return "密码错误";
			case 1121:
				return "用户不存在";
			case 1201:
				return "岗位已存在";
			case 1221:
				return "岗位不存在";
			case 1300:
				return "格式未识别";
			case 1301:
				return "文件不存在";
			case 1302:
				return "有未审核的编辑";
			case 1303:
				return "文件名格式错误";
			case 1304:
				return "MES系统响应失败";
			case 1305:
				return "设备不存在";
			case 1306:
				return "格式冲突";
			case 1307:
				return "格式解析异常";
			case 1308:
				return "无法找到处理程序";
			case 1309:
				return "角度信息不存在";
			case 1310:
				return "二次确认不能是同一个用户";
			case 1311:
				return "操作需要二次确认";
			case 1312:
				return "二次确认失败";
			case 1313:
				return "WaferMap未找到";
			case 1314:
				return "缺少钢印号";
			case 1400:
				return "目录下还有子菜单";
			case 1401:
				return "菜单不存在";
			case 5000:
				return "认证失败";
			default:
				return "未知错误";
		}
	}

	public static string CodeToString(int code)
	{
		switch(code)
		{
			case 0:
				return "OK";
			case 1:
				return "DefaultError";
			case 10:
				return "PermissionDenied";
			case 100:
				return "CantOpenAddress";
			case 1000:
				return "BadRequest";
			case 1001:
				return "ServerException";
			case 1002:
				return "TimeOut";
			case 1005:
				return "RequestParaError";
			case 1006:
				return "ServerDataError";
			case 1016:
				return "BadDataFormat";
			case 1017:
				return "InitDraftCantDrop";
			case 1018:
				return "IdDuplicate";
			case 1019:
				return "MissRequiredField";
			case 1020:
				return "OperationFail";
			case 1101:
				return "UserAlreadyExist";
			case 1102:
				return "AccountOrPwdError";
			case 1118:
				return "PasswordError";
			case 1121:
				return "UserNotExist";
			case 1201:
				return "PostAlreadyExist";
			case 1221:
				return "PostNotExist";
			case 1300:
				return "FormatNotRecog";
			case 1301:
				return "FileNotExist";
			case 1302:
				return "EditNoConfirm";
			case 1303:
				return "BadFileName";
			case 1304:
				return "BadMesResponse";
			case 1305:
				return "DeviceNotExist";
			case 1306:
				return "FormatConflict";
			case 1307:
				return "FormatParseException";
			case 1308:
				return "FormatHandlerNotFound";
			case 1309:
				return "NotchNotExist";
			case 1310:
				return "UserConfirmSame";
			case 1311:
				return "UserConfirmNeed";
			case 1312:
				return "UserConfirmFail";
			case 1313:
				return "WaferMapNotFound";
			case 1314:
				return "MissWaferID";
			case 1400:
				return "HasSubMenu";
			case 1401:
				return "MenuNotExist";
			case 5000:
				return "GMAuthenticationFail";
		}
		return null;
	}
}
