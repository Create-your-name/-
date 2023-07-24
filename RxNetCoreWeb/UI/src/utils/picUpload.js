import { message } from 'antd';

var uploadState = 0;
var completeCallback = null;
var loadCallback = null;
var errorCallback = null;
export function uploadFile(url, file, appid, groupid,id,service) {
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
    fd.append("files", file);
    if(id){
        fd.append("id", id);
    }
    if(service){
        fd.append("service", service);
    }
    if (groupid)
        fd.append("groupid", groupid);
    fd.append("appid", appid);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, true);
    xhr.addEventListener("load", e => { uploadComplete(xhr) }, true);
    // xhr.addEventListener("error", uploadComplete, true);
    xhr.addEventListener("error", uploadFailed, true);
    xhr.addEventListener("abort", uploadCanceled, true);
    xhr.open("POST", url, true);
    xhr.send(fd);
    uploadState = 1;
}
export function uploadAdFile(url, file, appid) {
    if (uploadState != 0) {
        message.warning('正在上传');
        return;
    }
    if (file == null) {
        message.warning('空文件');
        return;
    }
    // console.log('file', file)
    var fd = new FormData();
    if (file.length > 0) {
        for (var i = 0; i < file.length; i++) {
            fd.append("files", file[i]);
        }
        // fd.append("files", file);
        fd.append("appid", appid);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, true);
        xhr.addEventListener("load", e => { uploadComplete(xhr) }, true);
        // xhr.addEventListener("load", uploadComplete, true);
        xhr.addEventListener("error", uploadFailed, true);
        xhr.addEventListener("abort", uploadCanceled, true);
        xhr.open("POST", url, true);
        xhr.send(fd);
        uploadState = 1;
    }

}
function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percent = Math.round(evt.loaded * 100 / evt.total);
        var perStr = percent.toString() + "%";
        if (completeCallback)
            completeCallback(percent);
    }
}

function uploadComplete(xhr) {
    const status = xhr.status;
    // console.log('bug',xhr)
    if ((status >= 200 && status < 300) || status === 304) {
        // console.log("上传")
        let result;
        if (xhr.responseType === 'text') {
            result = xhr.responseText;
        } else if (xhr.responseType === 'document') {
            result = xhr.responseXML;
        } else {
            result = xhr.response;
        }
        message.success('上传成功');
        uploadState = 0;
        if (loadCallback)
            if (result)
                loadCallback(JSON.parse(result));
            else
                loadCallback('上传成功');
    } else {
        if (errorCallback)
            errorCallback("上传失败");
    }
}

function uploadFailed(evt) {
    message.error('上传失败');
    uploadState = 0;
    if (errorCallback)
        errorCallback("上传失败");
}

function uploadCanceled(evt) {
    message.error('取消上传');
    uploadState = 0;
    if (errorCallback)
        errorCallback("取消上传");
}

export function uploadIcon(file, appid, funSuccess) {
    loadCallback = funSuccess;
    uploadFile("/api/gameapp/app/upload/icon", file, appid)
}

export function uploadAdImages(file, appid, funSuccess, funFail) {
    loadCallback = funSuccess;
    errorCallback = funFail;
    uploadAdFile("/api/gameapp/app/upload/adimages", file, appid)
}

export function uploadAdImage(file, appid, groupid, funSuccess, funFail) {
    loadCallback = funSuccess;
    errorCallback = funFail;
    uploadFile("/api/gameapp/group/upload/adimage", file, appid, groupid)
}
// 通用图片上传
export function uploadImage(file, appid,groupid, id, service,funSuccess, funFail) {
    loadCallback = funSuccess;
    errorCallback = funFail;
    uploadFile("/api/content/upload/img", file, appid, groupid,id,service)
}
// 通用视频上传
export function uploadVideo(file, appid,groupid, id, service,funSuccess, funFail) {
    loadCallback = funSuccess;
    errorCallback = funFail;
    uploadFile("/api/content/upload/video", file, appid, groupid,id,service)
}