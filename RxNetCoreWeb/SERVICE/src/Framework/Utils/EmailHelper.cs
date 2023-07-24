using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Text;
using System;
using System.Collections.Generic;

namespace SPCService.src.Framework.Utils
{
    public class EmailHelper
    {
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="sendTo">收件人地址</param>
        /// <param name="sendCC">抄送人地址（多人）</param>
        /// <param name="fromEmail">发件人邮箱</param>
        /// <param name="fromName">发件人名称</param>
        /// <param name="title">邮件标题</param>
        /// <param name="body">邮件内容（支持html格式）</param>
        public static string SendEmail(List<string> sendTo, List<string> sendCC, String fromEmail, string fromPwd, String fromName, String title, String body)
        {
            MailMessage msg = new MailMessage();
            String[] sendCCArr = null;
            //设置收件人地址
            if (sendTo != null && sendTo.Count != 0)
            {
                foreach (String to in sendTo)
                {
                    msg.To.Add(to);
                }
            }
            else
            {
                return "No target";
            }
            //设置抄送人地址
            if (sendCC != null && sendCC.Count != 0)
            {
                foreach (String cc in sendCCArr)
                {
                    msg.CC.Add(cc);
                }
            }
            //设置发件人邮箱及名称
            msg.From = new MailAddress(fromEmail, fromName);

            msg.Subject = title;//邮件标题 
            msg.SubjectEncoding = Encoding.UTF8; //标题格式为UTF8 

            msg.Body = body;//邮件内容
            msg.BodyEncoding = Encoding.UTF8; //内容格式为UTF8 
            msg.IsBodyHtml = true;//设置邮件格式为html格式

            //string filePath = @"E:\导出数据.xls";//添加附件
            //msg.Attachments.Add(new Attachment(filePath));

            SmtpClient client = new SmtpClient();

            //发送邮箱信息
            client.Host = "crmail.crc.com.cn"; //SMTP服务器地址 
            //client.Port = 587; //SMTP端口，QQ邮箱填写587 

            client.EnableSsl = false; //启用SSL加密 （使用除QQ邮箱之外的最好关闭）
            client.UseDefaultCredentials = false;

            //发件人邮箱账号，授权码
            //授权码获取请自行百度
            client.Credentials = new System.Net.NetworkCredential(fromEmail, fromPwd);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;

            try
            {
                client.Send(msg); //发送邮件
                Log.Trace("Send email success!");
                return "success";
            }
            catch (Exception ex)
            {
                Log.Trace("Send email faile,error message:" + ex.Message);
                return ex.Message;
            }
        }

        /// <summary>
        /// 邮箱格式校验
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        private static bool EmailFormat(string address)
        {
            Regex r = new Regex("^\\s*([A-Za-z0-9_-]+(\\.\\w+)*@(\\w+\\.)+\\w{2,5})\\s*$");
            if (r.IsMatch(address))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
