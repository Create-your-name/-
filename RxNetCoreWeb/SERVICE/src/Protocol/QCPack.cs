// <auto-generated>
//   This file was generated by a tool; you should avoid making direct changes.
//   Consider using 'partial classes' to extend these types
//   Input: QCPack.proto
// </auto-generated>

#region Designer generated code
#pragma warning disable CS0612, CS0618, CS1591, CS3021, IDE0079, IDE1006, RCS1036, RCS1057, RCS1085, RCS1192
namespace Protocol
{

    [global::ProtoBuf.ProtoContract()]
    public partial class QueryQCReq : global::ProtoBuf.IExtensible
    {
        private global::ProtoBuf.IExtension __pbn__extensionData;
        global::ProtoBuf.IExtension global::ProtoBuf.IExtensible.GetExtensionObject(bool createIfMissing)
            => global::ProtoBuf.Extensible.GetExtensionObject(ref __pbn__extensionData, createIfMissing);

        [global::ProtoBuf.ProtoMember(1)]
        [global::System.ComponentModel.DefaultValue("")]
        public string MOUDLE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(2)]
        [global::System.ComponentModel.DefaultValue("")]
        public string EQPID { get; set; } = "";

        [global::ProtoBuf.ProtoMember(3)]
        [global::System.ComponentModel.DefaultValue("")]
        public string QCNAME { get; set; } = "";

        [global::ProtoBuf.ProtoMember(4)]
        [global::System.ComponentModel.DefaultValue("")]
        public string EDCPLAN { get; set; } = "";

    }

    [global::ProtoBuf.ProtoContract()]
    public partial class SaveQCReq : global::ProtoBuf.IExtensible
    {
        private global::ProtoBuf.IExtension __pbn__extensionData;
        global::ProtoBuf.IExtension global::ProtoBuf.IExtensible.GetExtensionObject(bool createIfMissing)
            => global::ProtoBuf.Extensible.GetExtensionObject(ref __pbn__extensionData, createIfMissing);

        [global::ProtoBuf.ProtoMember(1)]
        [global::System.ComponentModel.DefaultValue("")]
        public string SYSID { get; set; } = "";

        [global::ProtoBuf.ProtoMember(2)]
        [global::System.ComponentModel.DefaultValue("")]
        public string MOUDLE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(3)]
        [global::System.ComponentModel.DefaultValue("")]
        public string EQPID { get; set; } = "";

        [global::ProtoBuf.ProtoMember(4)]
        [global::System.ComponentModel.DefaultValue("")]
        public string QCNAME { get; set; } = "";

        [global::ProtoBuf.ProtoMember(5)]
        [global::System.ComponentModel.DefaultValue("")]
        public string EDCPLAN { get; set; } = "";

        [global::ProtoBuf.ProtoMember(6)]
        [global::System.ComponentModel.DefaultValue("")]
        public string QHOUR { get; set; } = "";

        [global::ProtoBuf.ProtoMember(7)]
        [global::System.ComponentModel.DefaultValue("")]
        public string TYPE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(8)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W1 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(9)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W2 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(10)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W3 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(11)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W4 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(12)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W5 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(13)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W6 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(14)]
        [global::System.ComponentModel.DefaultValue("")]
        public string W7 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(15)]
        [global::System.ComponentModel.DefaultValue("")]
        public string M1 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(16)]
        [global::System.ComponentModel.DefaultValue("")]
        public string M2 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(17)]
        [global::System.ComponentModel.DefaultValue("")]
        public string M3 { get; set; } = "";

        [global::ProtoBuf.ProtoMember(18)]
        [global::System.ComponentModel.DefaultValue("")]
        public string CSTATUS { get; set; } = "";

        [global::ProtoBuf.ProtoMember(19)]
        [global::System.ComponentModel.DefaultValue("")]
        public string LASTCOMPLETEDATE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(20)]
        [global::System.ComponentModel.DefaultValue("")]
        public string PLANDATE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(21)]
        [global::System.ComponentModel.DefaultValue("")]
        public string FORCETRACKIN { get; set; } = "";

        [global::ProtoBuf.ProtoMember(22)]
        [global::System.ComponentModel.DefaultValue("")]
        public string HASF { get; set; } = "";

        [global::ProtoBuf.ProtoMember(23)]
        [global::System.ComponentModel.DefaultValue("")]
        public string CHOUR { get; set; } = "";

        [global::ProtoBuf.ProtoMember(24)]
        [global::System.ComponentModel.DefaultValue("")]
        public string CYCLE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(25)]
        [global::System.ComponentModel.DefaultValue("")]
        public string CYCLESTARTDATE { get; set; } = "";

        [global::ProtoBuf.ProtoMember(26)]
        [global::System.ComponentModel.DefaultValue("")]
        public string COMMENTS { get; set; } = "";

        [global::ProtoBuf.ProtoMember(27)]
        [global::System.ComponentModel.DefaultValue("")]
        public string USERID { get; set; } = "";

    }

}

#pragma warning restore CS0612, CS0618, CS1591, CS3021, IDE0079, IDE1006, RCS1036, RCS1057, RCS1085, RCS1192
#endregion
