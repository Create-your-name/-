
import { message } from 'antd';
var uploadState = 0;
var completeCallback = null;
export function uploadFile(url, file) {
    //console.log('uploadFile')
    if (uploadState != 0) {
        message.warning('正在上传');
        return;
    }
    if (file == null) {
        message.warning('空文件');
        return;
    }
    var fd = new FormData();
    fd.append("file", file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, true);
    xhr.addEventListener("load", uploadComplete, true);
    xhr.addEventListener("error", uploadFailed, true);
    xhr.addEventListener("abort", uploadCanceled, true);

    xhr.open("POST", url, true);
    xhr.send(fd);
    uploadState = 1;
}

function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percent = Math.round(evt.loaded * 100 / evt.total);
        var perStr = percent.toString() + "%";
        completeCallback(percent);
        //console.log(perStr)
        // $("#progressNumber").text(perStr);
        // $("#progressBar").css("width", perStr);
    }
}

function uploadComplete(evt) {
    message.success('上传成功');
    uploadState = 0;
}

function uploadFailed(evt) {
    message.error('上传失败');
    uploadState = 0;
}

function uploadCanceled(evt) {
    message.error('取消上传');
    //console.log("The upload has been canceled by the user or the browser dropped the connection");
    uploadState = 0;
}

export function uploadFileToCluster(file, callback) {
    completeCallback = callback;
    uploadFile("/rest/fileTransfer/uploadToCluster", file)
}

