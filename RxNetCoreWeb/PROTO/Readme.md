# 前后端消息接口

## 1. 目录结构
1. events/ErrorCode - 错误码定义，格式如下
```
OK				=	0; //成功
```
> OK、0、成功，分别是 错误码变量名，错误码的值，错误码的文字描述  
该文件会被python脚本解析并生成对应的代码。  
在后端代码中直接使用 ErrorCode类即可

2. proto_raw - 消息的定义目录，目录中包含多个 .proto文件(protobuf格式)。本工程中用作前后端接口的文档
> 本项目中，仅使用protobuf的代码生成功能，用作json格式，而不采用protobuf的二进制序列化功能。  
格式解释：  

```protobuf
//登录
//POST /api/user/login          <- 用注释说明 api和http的方法
message UserLoginReq {     //<- 以Req结尾的是前端向后端发的请求
    string account = 1;
    string pwd = 2;
}

message UserLoginResp {   //<- 以Resp结尾的是后端返回的响应
    string authToken = 1;
    string account = 2;
    string role = 3;
    string param = 4;
}
```

3. protogen-cs - 生成C#代码的插件

## 2. 使用说明
> 本项目的生成脚本用python封装好了，需要安装python 3.x版本执行脚本  

1. gen-csharp.py - 生成c#代码的脚本，代码生成在csharp目录中
2. copy2c#.bat - 将csharp目录中生成到脚本，拷贝到工程目录，根据自己存放的目录，调整一下脚本中的目录。
3. gen-typescript.py - 生成typescript的类型描述文件，可以用过前端代码在vscode中的提示。代码生成在tsout目录中。
4. copy2ts.bat - 将tsout目录中的代码拷贝到前端工程目录的脚本，根据自己存放的目录，调整一下脚本中的目录。
