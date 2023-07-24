import os
import shutil
import re

rootdir = '.\\proto_raw'
tsOut = '.\\tsout'
outFile = tsOut+'\\proto.ts'

def walkAllProto():
    if not os.path.exists(tsOut):
        os.makedirs(tsOut)
    if os.path.exists(outFile):
        os.remove(outFile)
    for subdir, dirs, files in os.walk(rootdir):
        for file in files:
            genInterface(file)

def genInterface(input):
    dst = open(outFile, 'a',encoding= 'utf-8')
    cmdList = []
    src = open(rootdir+'\\'+ input, encoding='utf-8')
    state = "init"
    for line in src.readlines():
        if state == "init":
            matchMessage = re.match('message\s+(\w+)\s*\{', line)
            if matchMessage:
                iName = matchMessage.group(1)
                dst.write('interface '+iName+' {\n')
                state = "message"
                continue
            matchEnum = re.match('enum\s+(\w+)\s*\{', line)

            if matchEnum:
                iName = matchEnum.group(1)
                dst.write('enum '+iName+' {\n')
                state = "enum"
                continue
        
        if state == "message":
            matchValue = re.match('^\s*([repeated]*)\s+([string|bool|int32|int64|float|double|\w]+)\s+(\w+)\s*=\s*\d+;', line)
            if matchValue:
                prefix = matchValue.group(1)
                tsType = matchValue.group(2)
                var = matchValue.group(3)

                if tsType == 'bool':
                    tsType = 'boolean'
                if tsType == 'int32' or tsType == 'int64' or tsType == 'float' or tsType == 'double':
                    tsType = 'number'
                if tsType == 'bytes':
                    tsType = 'Uint8Array'
                if prefix == 'repeated':
                    dst.write('\t'+var+'?: '+tsType+'[];\n')
                else:
                    dst.write('\t'+var+'?: '+tsType+';\n')
                continue

        if state == "enum":
            matchValue = re.match('^\s*(\w+)\s*=\s*(\d+);', line)
            if matchValue:
                name = matchValue.group(1)
                value = matchValue.group(2)
                dst.write('\t'+name+' = "'+name+'",\n')
                continue

        matchEnd = re.match('\}', line)
        if matchEnd:
            dst.write("}\n\n")
            state = "init"
            continue

    src.close()
    dst.close()

def main():
    walkAllProto()
    os.system('pause & exit')

if __name__ == '__main__':
    main()