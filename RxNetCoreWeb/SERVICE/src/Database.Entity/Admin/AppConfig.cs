using System.ComponentModel.DataAnnotations;

namespace SPCService.Database.Entity
{
    public class AppConfig
    {
        public string APPCONFIGID { get; set; }
        public string DATA { get; set; }
    }

    public class AppConfigV
    {
        [Key]
        public int ID { get; set; }
        public int VERSION { get; set; }
        public string NAME { get; set; }
        public string DATA { get; set; }
    }
}
