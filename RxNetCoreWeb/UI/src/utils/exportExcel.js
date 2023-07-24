import React, { Component } from 'react';

import { message } from 'antd';
import { CodeToString, CodeToStringExport } from './string'
function getBrowserAgent() {
    var userAgent = window.navigator.userAgent
    //ie 
    if (userAgent.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox 
    else if (userAgent.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if (userAgent.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
    //Opera
    else if (userAgent.indexOf("Opera") >= 0) {
        return 'Opera';
    }
    //Safari
    else if (userAgent.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}
export function exportExcel(JSONData, columns) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    // console.log('JSONData-->', JSONData)
    if (getBrowserAgent() == 'ie') {
        message.info('暂时不支持当前浏览器导出Excel，建议使用谷歌浏览器')
    } else {
        var $excel = '<table>';
        //当前需要导出的excel列 数组是有序的
        //设置表头  
        var $row = "<tr>";
        let l = arrData.length;
        if (l == 0) {
            message.info('导出数据不能为空');
            return
        }
        var FileName = new Date().toLocaleString();
        if (columns) {
            for (var c = 0; c < columns.length; c++) {
                let t = CodeToString[columns[c]] || columns[c];
                $row += "<td style=\"mso-number-format:\'\@\';text-align:left;font-size:16px;color:#333;\">" + t + '</td>';
            }
            $excel += $row + "</tr>";

            //设置数据  
            for (var i = 0; i < arrData.length; i++) {
                var row = "<tr>";
                //检测关键字段
                for (var index = 0; index < columns.length; index++) {
                    row += '<td style="mso-number-format:\'\@\';text-align:left;font-size:14px;color:#333">' + arrData[i][columns[index]] + '</td>';
                }
                $excel += row + "</tr>";

            }

        } else {
            for (var i in JSONData[0]) {
                // BankAttrCodeToString[i]
                var t = CodeToString[i] || i;
                $row += "<td style=\"mso-number-format:\'\@\';text-align:left;font-size:16px;color:#333;\">" + t + '</td>';
            }
            $excel += $row + "</tr>";

            //设置数据  
            for (var i = 0; i < arrData.length; i++) {
                var row = "<tr>";
                //检测关键字段
                for (var index in arrData[i]) {
                    row += '<td style="mso-number-format:\'\@\';text-align:left;font-size:14px;color:#333">' + arrData[i][index] || 0 + '</td>';
                }
                $excel += row + "</tr>";
            }
        }

        // //换行  
        // $excel += $row + "</tr>";

        // //设置数据  
        // for (var i = 0; i < arrData.length; i++) {
        //     var row = "<tr>";
        //     //检测关键字段
        //     for (var index in arrData[i]) {
        //         row += '<td style="mso-number-format:\'\@\';text-align:left;font-size:14px;color:#333">' + arrData[i][index] + '</td>';
        //     }
        //     $excel += row + "</tr>";
        // }

        $excel += "</table>";
        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
        excelFile += '; charset=UTF-8">';
        excelFile += "<head>";
        excelFile += "<!--[if gte mso 9]>";
        excelFile += "<xml>";
        excelFile += "<x:ExcelWorkbook>";
        excelFile += "<x:ExcelWorksheets>";
        excelFile += "<x:ExcelWorksheet>";
        excelFile += "<x:Name>";
        excelFile += "{worksheet}";
        excelFile += "</x:Name>";
        excelFile += "<x:WorksheetOptions>";
        excelFile += "<x:DisplayGridlines/>";
        excelFile += "</x:WorksheetOptions>";
        excelFile += "</x:ExcelWorksheet>";
        excelFile += "</x:ExcelWorksheets>";
        excelFile += "</x:ExcelWorkbook>";
        excelFile += "</xml>";
        excelFile += "<![endif]-->";
        excelFile += "</head>";
        excelFile += "<body>";
        excelFile += $excel;
        excelFile += "</body>";
        excelFile += "</html>";
        var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        var isSupportDownload = 'download' in link;
        if (isSupportDownload) {
            link.download = FileName + ".xls";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            message.info('暂时不支持当前浏览器导出Excel，建议使用谷歌浏览器')
        }
    }
}
export function exportSpecExcel(JSONData, columns) {

    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    // console.log('ExportData-->', arrData, columns)

    if (getBrowserAgent() == 'ie') {
        message.info('暂时不支持当前浏览器导出Excel，建议使用谷歌浏览器')
    } else {
        var $excel = '<table>';
        //当前需要导出的excel列 数组是有序的
        //设置表头  
        var $row = "<tr>";
        let l = arrData.length;
        if (l == 0) {
            message.info('导出数据不能为空');
            return
        }
        var FileName = new Date().toLocaleString();
        if (columns) {
            //获取当前的导出
            var columnsArray = []
            for (var col = 0; col < columns.length; col++) {

                var item = columns[col]
                if (item.children) {
                    let cld = item.children
                    for (var cl = 0; cl < cld.length; cl++) {
                        columnsArray.push(cld[cl].key)
                    }
                } else {
                    columnsArray.push(item.key)
                }

            }
            for (var c = 0; c < columnsArray.length; c++) {
                let t = CodeToStringExport[columnsArray[c]] || columnsArray[c];
                $row += "<td style=\"mso-number-format:\'\@\';text-align:left;font-size:16px;color:#333;\">" + t + '</td>';
            }
            $excel += $row + "</tr>";

            //设置数据  
            for (var i = 0; i < arrData.length; i++) {
                var row = "<tr>";
                //检测关键字段
                for (var index = 0; index < columnsArray.length; index++) {
                    let t = null;
                    if (columnsArray[index] == 'date' || columnsArray[index] == 'total' || columnsArray[index] == 'platform' || columnsArray[index] == 'packageId') {
                        t = arrData[i][columnsArray[index]] || 0
                    } else {

                        if (arrData[i].roomMap) {
                            t = arrData[i].roomMap[columnsArray[index]] || 0
                        } else if (arrData[i].map) {
                            t = arrData[i].map[columnsArray[index]] || 0
                        } else {
                            t = arrData[i][columnsArray[index]] || 0
                        }

                    }

                    row += '<td style="mso-number-format:\'\@\';text-align:left;font-size:14px;color:#333">' + t + '</td>';
                }
                $excel += row + "</tr>";

            }

        }


        $excel += "</table>";
        var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
        excelFile += '; charset=UTF-8">';
        excelFile += "<head>";
        excelFile += "<!--[if gte mso 9]>";
        excelFile += "<xml>";
        excelFile += "<x:ExcelWorkbook>";
        excelFile += "<x:ExcelWorksheets>";
        excelFile += "<x:ExcelWorksheet>";
        excelFile += "<x:Name>";
        excelFile += "{worksheet}";
        excelFile += "</x:Name>";
        excelFile += "<x:WorksheetOptions>";
        excelFile += "<x:DisplayGridlines/>";
        excelFile += "</x:WorksheetOptions>";
        excelFile += "</x:ExcelWorksheet>";
        excelFile += "</x:ExcelWorksheets>";
        excelFile += "</x:ExcelWorkbook>";
        excelFile += "</xml>";
        excelFile += "<![endif]-->";
        excelFile += "</head>";
        excelFile += "<body>";
        excelFile += $excel;
        excelFile += "</body>";
        excelFile += "</html>";
        var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        var isSupportDownload = 'download' in link;
        if (isSupportDownload) {
            link.download = FileName + ".xls";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            message.info('暂时不支持当前浏览器导出Excel，建议使用谷歌浏览器')
        }
    }
}