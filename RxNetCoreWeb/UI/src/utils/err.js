import { notification, message, Button } from 'antd';
import { connect } from 'dva';

export const errCodeDomain = {
    domain: function (resp) {
        let result = resp.result;
        let errMsg = resp.errorMsg;

        if (result == 5000) {
            const key = `open${Date.now()}`;
            const btnClick = function () {
                notification.close(key);
                sessionStorage.clear();
                history.go(0);
            };
            const btn = (
                <Button type="primary" size="small" onClick={btnClick}>
                    确定
                </Button>
            );
            notification.open({
                message: '认证失败，是否重新登录',
                btn,
                key,
                duration: null
            });
            //返回登录
        } else {
            let notifyMsg = errMsg;

            if (!notifyMsg) {
                notifyMsg = '抱歉,发生了未知错误';
            }
            notification.error({
                message: notifyMsg,
            });
        }
    },
}

export const netNotify = resp => {
    if (!resp) return;
    
    if (resp.result == 0) {
        message.success("操作成功");
        return;
    }
    
    errCodeDomain.domain(resp);
}

export const netTip = resp => {
    if (resp.result == 0) {
        message.success(ErrCoderToString[resp.result]);
        return;
    }

    if (result == 5000) {
        const key = `open${Date.now()}`;
        const btnClick = function () {
            notification.close(key);
            sessionStorage.clear();
            history.go(0);
        };
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                确定
            </Button>
        );
        notification.open({
            message: '认证失败，是否重新登录',
            btn,
            key,
            duration: null
        });
        //返回登录
    } else {
        let errMsg = resp.errorMsg;
        let notifyMsg = errMsg;
        console.log('错误：',notifyMsg)
        if (!notifyMsg) {
            notifyMsg = ErrCoderToString[result];
        }
        if (!notifyMsg) {
            notifyMsg = '抱歉,发生了未知错误';
        }
        message.error(notifyMsg);
    }
}