namespace SPCService.BusinessModel
{
    public class TN2M
    {
        [SpcDbField("FROMID")]
        public string fromid { get; set; }
        [SpcDbField("LINKNAME")]
        public string linkname { get; set; }
        [SpcDbField("SEQUENCE")]
        public string sequence { get; set; }
        [SpcDbField("TOID")]
        public string toid { get; set; }
        [SpcDbField("KEYTYPE")]
        public string keytype { get; set; }
        [SpcDbField("KEYDATA")]
        public string keydata { get; set; }
    }
}
