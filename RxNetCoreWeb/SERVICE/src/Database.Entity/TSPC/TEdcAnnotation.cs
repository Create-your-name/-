using Protocol;
using SPCService.Database;
using System;
using System.Collections.Generic;
using Arch;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.src.Framework.Common;
using SPCService.DbModel;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_ANNOTATION")]
    public class TEdcAnnotation : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("HISTORYSYSID")]
        public string historySysId { get; set; }
        [SpcDbField("ANNOTATIONCODE")]
        public string annotationCode { get; set; }
        [SpcDbField("REASONCODE")]
        public string reasonCode { get; set; }
        [SpcDbField("BRIEFDESCRIPTION")]
        public string briefDescription { get; set; }
        [SpcDbField("DETAILDESCRIPTION")]
        public string detailDescription { get; set; }
        [SpcDbField("USERNAME")]
        public string username { get; set; } 
        public string limitSelection { get; set; }
        [SpcDbField("DATETIME")]
        public string datetime { get; set; }


        public TEdcAnnotation()
        {

        }

        public SPCErrCodes Save()
        {
            SPCErrCodes spcError = new SPCErrCodes();
            SpcContext db = new SpcContext();

            bool bNew = false;
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    var oldObj = (from c in db.SPC_ANNOTATION
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_ANNOTATION>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_ANNOTATION dc = new SPC_ANNOTATION();
                    dc.SYSID = sysId;
                    dc.HISTORYSYSID = historySysId;
                    dc.ANNOTATIONCODE = annotationCode;
                    dc.REASONCODE = reasonCode;
                    dc.BRIEFDESCRIPTION = briefDescription;
                    dc.DETAILDESCRIPTION = detailDescription;
                    dc.USERNAME = username;
                    dc.DATETIME = datetime;

                    if (bNew)
                        db.SPC_ANNOTATION.Add(dc);


                    db.SaveChanges();
                    trans.Commit();

                }
                catch (Exception ex)
                {

                    trans.Rollback();

                }
            }
            return spcError;

        }

         
        public CEdcAnnotation makeInterchange( )
        { 
            CEdcAnnotation canno = new CEdcAnnotation();
            canno.annotationCode = annotationCode;
            canno.reasonCode = reasonCode;
            canno.briefDescription = briefDescription;
            canno.detailDescription = detailDescription;
            canno.userId = username; 
            canno.datetime = datetime;
            return canno;



        }
        public TEdcAnnotation(CEdcAnnotation cEdcAnnotation)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcAnnotation));
            annotationCode = cEdcAnnotation.annotationCode;
            reasonCode = cEdcAnnotation.reasonCode;
            briefDescription = cEdcAnnotation.briefDescription;
            detailDescription = cEdcAnnotation.detailDescription;
            username = cEdcAnnotation.userId;
            datetime = cEdcAnnotation.datetime;


        }
    }
}
