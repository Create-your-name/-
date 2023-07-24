import os
import shutil
import re
import zipfile
import tarfile

appName = 'SPCService'
pathOut = '.\\'+appName
publishPath = appName + '/publish'
zipFile = appName+'.tar.gz'

conf = 'config\\*.* '
confCopy = '.\\'+appName+'\\config\\'

scConf = 'server-config\\*.* '
scCopy = '.\\'+appName+'\\server-config\\'

def cleanOut():
    print('清理老目录')
    if os.path.exists(pathOut):
        shutil.rmtree(pathOut)


def copyConfig():
    print('拷贝server-config')
    copyCmd = 'xcopy {0} {1} /sy |find /v "*"'.format(scConf, scCopy)
    os.system(copyCmd)

def buildProject():
    build = 'dotnet publish '+appName+'.csproj -c release -r linux-x64 -o ' + publishPath
    os.system(build)

def make_zipfile(output_filename, source_dir):
    relroot = os.path.abspath(os.path.join(source_dir, os.pardir))
    with zipfile.ZipFile(output_filename, "w", zipfile.ZIP_DEFLATED) as zip:
        for root, dirs, files in os.walk(source_dir):
            # add directory (needed for empty dirs)
            zip.write(root, os.path.relpath(root, relroot))
            for file in files:
                filename = os.path.join(root, file)
                if os.path.isfile(filename): # regular files only
                    arcname = os.path.join(os.path.relpath(root, relroot), file)
                    zip.write(filename, arcname)

def make_targzfile(output_filename, source_dir):
    relroot = os.path.abspath(os.path.join(source_dir, os.pardir))
    with tarfile.open(output_filename,'w:gz') as tar:
        for root,dir,files in os.walk(source_dir):
            # tar.add(root, os.path.relpath(root, relroot))
            # print(root)
            for file in files:
            	filename = os.path.join(root, file)
            	if os.path.isfile(filename):
                	arcname = os.path.join(os.path.relpath(root, relroot), file)
                	tar.add(filename,arcname=arcname)

def zipOutputDir():
    print('开始压缩到 '+zipFile+' 文件')
    make_targzfile(zipFile, pathOut)
    print('压缩完成')

def main():
    cleanOut()
    buildProject()
    # copyConfig()
    zipOutputDir()
    os.system('pause & exit')

if __name__ == '__main__':
    main()
