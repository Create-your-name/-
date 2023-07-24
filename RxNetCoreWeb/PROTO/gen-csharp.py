import os
import shutil
import re

rootdir = '.\\proto_raw'
csharpTemp = '.\\__csharp'
csharpOut = '.\\csharp'

eventdir = '.\\events'
command = 'MessageCommand'
errorCode = 'ErrorCode'

# 命令元组
def commandReg():
    fullPath = eventdir+"\\"+ command
    if not os.path.exists(fullPath):
        return
    
    cmdList = []
    src = open(fullPath, encoding='utf-8')
    for line in src.readlines():
        match = re.match('(\w+)\s*=\s*(\d+);\s*(//.+)', line)
        if not match:
            continue
        cmdTpl = (match.group(1), match.group(2), match.group(3))
        cmdList.append(cmdTpl)
    src.close()
    return cmdList

# 错误码元组
def errorCodeReg():
    fullPath = eventdir+"\\"+ errorCode
    if not os.path.exists(fullPath):
        return
    
    cmdList = []
    src = open(fullPath, encoding='utf-8')
    for line in src.readlines():
        match = re.match('(\w+)\s*=\s*(\d+);\s*(//.+)', line)
        if not match:
            continue
        cmdTpl = (match.group(1), match.group(2), match.group(3))
        cmdList.append(cmdTpl)
    src.close()
    return cmdList

def makeCSharpTemp():
    if os.path.exists(csharpTemp):
        shutil.rmtree(csharpTemp, True)
    os.makedirs(csharpTemp)
    for subdir, dirs, files in os.walk(rootdir):
        for file in files:
            if (file[-6:].lower() != '.proto'):
                continue
            # print(file)
            src = open(rootdir+'\\'+ file,encoding= 'utf-8')
            dst = open(csharpTemp+'\\'+file, 'w',encoding= 'utf-8')
            dst.write('syntax = "proto3";\n')
            # dst.write('package Protocol;\n')
            dst.writelines(src.readlines())
            dst.close()
            src.close()

def genCSharp():
    if not os.path.exists(csharpOut):
        os.makedirs(csharpOut)
    for subdir, dirs, files in os.walk(csharpTemp):
        for file in files:
            print('Generate C# file = '+file)
            cmd = '.\\protogen-cs\\protogen.exe +names=original --proto_path='+csharpTemp+' ' + file+' --csharp_out='+ csharpOut + ' --package=Protocol'
            os.system(cmd)

def genCSharpCommand():
    cmd = commandReg()
    if len(cmd) == 0:
        return

    dst = open(csharpOut+'\\'+command+'.cs', 'w',encoding= 'utf-8')
    dst.write('public class MessageCommand \n{\n')
    for line in cmd:
        name, value, note = line
        dst.write('\tpublic const int {} = {};\t\t{}\n'.format(name, value, note))
    dst.write('\n')

    # 生成codeToString函数
    dst.write('\tpublic static string CodeToString(int code)\n\t{\n')
    dst.write('\t\tswitch(code)\n\t\t{\n')

    for line in cmd:
        name, value, note = line
        dst.write('\t\t\tcase '+value+':\n')
        dst.write('\t\t\t\treturn \"'+name+'\";\n')

    dst.write('\t\t}\n')
    dst.write('\t\treturn null;\n')
    dst.write('\t}\n')

    # 类结尾
    dst.write('}\n')
    dst.close()

def genCSharpErrorCode():
    errors = errorCodeReg()
    if len(errors) == 0:
        return

    dst = open(csharpOut+'\\'+errorCode+'.cs', 'w',encoding= 'utf-8')
    dst.write('public class ErrorCode \n{\n')
    for line in errors:
        name, value, note = line
        dst.write('\tpublic const int {} = {};\t\t{}\n'.format(name, value, note))
    dst.write('\n')

    # 生成codeToDesc
    dst.write('\tpublic static string CodeToDesc(int code) {\n')
    dst.write('\t\tswitch(code) {\n')
    for line in errors:
        name, value, note = line
        dst.write('\t\t\tcase '+value+':\n')
        dst.write('\t\t\t\treturn "'+note[2:]+'";\n')
    dst.write('\t\t\tdefault:\n\t\t\t\treturn "未知错误";\n')
    dst.write('\t\t}\n\t}\n')
    dst.write('\n')

    # 生成codeToString函数
    dst.write('\tpublic static string CodeToString(int code)\n\t{\n')
    dst.write('\t\tswitch(code)\n\t\t{\n')
    for line in errors:
        name, value, note = line
        dst.write('\t\t\tcase '+value+':\n')
        dst.write('\t\t\t\treturn "'+name+'";\n')
    dst.write('\t\t}\n')
    dst.write('\t\treturn null;\n')
    dst.write('\t}\n')

    dst.write('}\n')
    dst.close()


def main():
    makeCSharpTemp()
    genCSharp()
    shutil.rmtree(csharpTemp)
    # genCSharpCommand()
    genCSharpErrorCode()
    os.system('pause & exit')

if __name__ == '__main__':
    main()
