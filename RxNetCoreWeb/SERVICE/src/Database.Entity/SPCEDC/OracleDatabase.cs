//using System;
//using System.ComponentModel.DataAnnotations;

//namespace SPCService.src.Database.Entity
//{
//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_ANNOTATION 表对应实体
//    /// </summary>
//    public class SPC_ANNOTATION
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string HISTORYSYSID { get; set; }
//        public string ANNOTATIONCODE { get; set; }
//        public string REASONCODE { get; set; }
//        public string BRIEFDESCRIPTION { get; set; }
//        public string DETAILDESCRIPTION { get; set; }
//        public string USERNAME { get; set; }
//        public string DATETIME { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_CHART 表对应实体
//    /// </summary>
//    public class SPC_CHART
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string NAME { get; set; }
//        public string DESCRIPTION { get; set; }
//        public string CHARTTEMPLATE { get; set; }
//        public string MEASUREMENTSPEC { get; set; }
//        public string EDCPLAN { get; set; }
//        public string PROCESSPLAN { get; set; }
//        public string PRODUCT { get; set; }
//        public string STEP { get; set; }
//        public string LOT { get; set; }
//        public string EQUIPMENT { get; set; }
//        public string PARTITION { get; set; }
//        public string PUBLISHTONAME { get; set; }
//        public string LOADONSTARTUP { get; set; }
//        public string WHENTODISPLAY { get; set; }
//        public int? HISTORICALHOURS { get; set; }
//        public int? HISTORICALPOINTS { get; set; }
//        public long? FWTIMESTAMP { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_CHART_N2M 表对应实体
//    /// </summary>
//    public class SPC_CHART_N2M
//    {
//        [Key]
//        public string FROMID { get; set; }
//        public string LINKNAME { get; set; }
//        public int? SEQUENCE { get; set; }
//        public string TOID { get; set; }
//        public string KEYTYPE { get; set; }
//        public string KEYDATA { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_CHARTPARAMETER 表对应实体
//    /// </summary>
//    public class SPC_CHARTPARAMETER
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string PROPERTY { get; set; }
//        public string VALUE { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_CHARTTEMPLATE 表对应实体
//    /// </summary>
//    public class SPC_CHARTTEMPLATE
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string NAME { get; set; }
//        public string DESCRIPTION { get; set; }
//        public string SPCTEMPLATE { get; set; }
//        public long? FWTIMESTAMP { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_CHARTTEMPLATE_N2M 表对应实体
//    /// </summary>
//    public class SPC_CHARTTEMPLATE_N2M
//    {
//        [Key]
//        public string FROMID { get; set; }
//        public string LINKNAME { get; set; }
//        public int? SEQUENCE { get; set; }
//        public string TOID { get; set; }
//        public string KEYTYPE { get; set; }
//        public string KEYDATA { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_DATACOLLECTION 表对应实体
//    /// </summary>
//    public class SPC_DATACOLLECTION
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string EDCPLAN { get; set; }
//        public string PRODUCT { get; set; }
//        public string PLAN { get; set; }
//        public string INITIALSTEP { get; set; }
//        public string LOT { get; set; }
//        public string BATCH { get; set; }
//        public string STAGE { get; set; }
//        public string AREA { get; set; }
//        public string TAG1 { get; set; }
//        public string TAG2 { get; set; }
//        public string GROUPHISTKEY { get; set; }
//        public string DONE { get; set; }
//        public string MODIFIEDDATETIME { get; set; }
//        public long? FWTIMESTAMP { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_DATAPOINT 表对应实体
//    /// </summary>
//    public class SPC_DATAPOINT
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string MEASUREMENT { get; set; }
//        public string UNITIDENTIFIER { get; set; }
//        public string SITEIDENTIFIER { get; set; }
//        public string SAMPLEIDENTIFIER { get; set; }
//        public int? SEQUENCE { get; set; }
//        public string VALUE { get; set; }
//        public string ISEXCLUDED { get; set; }
//        public string HASHISTORY { get; set; }
//        public string ISDATABOUNDARY { get; set; }
//        public string CREATEDATE { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_DATAPOINTHISTORY 表对应实体
//    /// </summary>
//    public class SPC_DATAPOINTHISTORY
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string DATASYSID { get; set; }
//        public string CHART { get; set; }
//        public string GRAPH { get; set; }
//        public string DATASET { get; set; }
//        public string INITIALVALUE { get; set; }
//        public string DATATYPE { get; set; }
//        public string ISEXCLUDED { get; set; }
//        public string HASVIOLATIONS { get; set; }
//        public string HASCOMMENTS { get; set; }
//        public string ISDATABOUNDARY { get; set; }
//        public long? FWTIMESTAMP { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_DERIVATION 表对应实体
//    /// </summary>
//    public class SPC_DERIVATION
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string EDCOPERATOR { get; set; }
//        public string OPERAND1 { get; set; }
//        public string OPERAND2 { get; set; }
//        public string DATAHANDLINGTYPE { get; set; }
//        public string DATA1 { get; set; }
//        public string DATA2 { get; set; }
//        public string LIMITSELECTION { get; set; }
//        public string UPPERLIMIT { get; set; }
//        public string LOWERLIMIT { get; set; }
//        public string STOREINDATABASE { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_MEASUREMENT 表对应实体
//    /// </summary>
//    public class SPC_MEASUREMENT
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string DATACOLLECTION { get; set; }
//        public string MEASUREMENTSPEC { get; set; }
//        public string MEASUREMENTSTEP { get; set; }
//        public string MEASUREMENTRESOURCE { get; set; }
//        public string PROCESSSTEP { get; set; }
//        public string PROCESSRESOURCE { get; set; }
//        public string USERNAME { get; set; }
//        public string SPECLIMITS { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_MEASUREMENTSPEC 表对应实体
//    /// </summary>
//    public class SPC_MEASUREMENTSPEC
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string NAME { get; set; }
//        public string DESCRIPTION { get; set; }
//        public string MEASUREMENTTYPE { get; set; }
//        public string DATATYPE { get; set; }
//        public string UNIT { get; set; }
//        public string ISDERIVED { get; set; }
//        public string AUTOEXCLUDE { get; set; }
//        public string ALLOWLIMITOVERRIDE { get; set; }
//        public string UPPERSCREENINGLIMIT { get; set; }
//        public string UPPERSPECLIMIT { get; set; }
//        public string TARGET { get; set; }
//        public string LOWERSPECLIMIT { get; set; }
//        public string LOWERSCREENINGLIMIT { get; set; }
//        public string SAMPLINGPLAN { get; set; }
//        public string DERIVATION { get; set; }
//        public long? FWTIMESTAMP { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_MEASUREMENTSPEC_PN2M 表对应实体
//    /// </summary>
//    public class SPC_MEASUREMENTSPEC_PN2M
//    {
//        [Key]
//        public string FROMID { get; set; }
//        public string LINKNAME { get; set; }
//        public int? SEQUENCE { get; set; }
//        public string VALTYPE { get; set; }
//        public string VALDATA { get; set; }
//        public string KEYTYPE { get; set; }
//        public string KEYDATA { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_PLAN 表对应实体
//    /// </summary>
//    public class SPC_PLAN
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public int? ACTIVEVERSION { get; set; }
//        public int? NEXTVERSION { get; set; }
//        public string NAME { get; set; }
//        public long? FWTIMESTAMP { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_PLAN_N2M 表对应实体
//    /// </summary>
//    public class SPC_PLAN_N2M
//    {
//        [Key]
//        public string FROMID { get; set; }
//        public string LINKNAME { get; set; }
//        public int? SEQUENCE { get; set; }
//        public string TOID { get; set; }
//        public string KEYTYPE { get; set; }
//        public string KEYDATA { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_PLANVERSION 表对应实体
//    /// </summary>
//    public class SPC_PLANVERSION
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public int? ID { get; set; }
//        public string DESCRIPTION { get; set; }
//        public string OWNER { get; set; }
//        public string REVISION { get; set; }
//        public string REVSTATE { get; set; }
//        public string NAME { get; set; }
//        public string MODIFIEDDATETIME { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_PLANVERSION_N2M 表对应实体
//    /// </summary>
//    public class SPC_PLANVERSION_N2M
//    {
//        [Key]
//        public string FROMID { get; set; }
//        public string LINKNAME { get; set; }
//        public int? SEQUENCE { get; set; }
//        public string TOID { get; set; }
//        public string KEYTYPE { get; set; }
//        public string KEYDATA { get; set; }
//    }

//    /// <summary>
//    ///     创 建 人: ysx
//    ///     创建日期: 2022-04-30
//    ///     文件描述: SPC_SAMPLINGPLAN 表对应实体
//    /// </summary>
//    public class SPC_SAMPLINGPLAN
//    {
//        [Key]
//        public string SYSID { get; set; }
//        public string COLLECTIONTYPE { get; set; }
//        public string PROMPT { get; set; }
//        public string OPERATORINSTRUCTIONS { get; set; }
//        public int? NUMBEROFUNITS { get; set; }
//        public int? NUMBEROFSITES { get; set; }
//        public int? NUMBEROFSAMPLES { get; set; }
//    }
//}
