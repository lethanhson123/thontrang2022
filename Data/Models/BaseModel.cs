using System;

namespace ThonTrang.Data.Models
{
    public class BaseModel
    {
        public int ID { get; set; }
        public int? UserCreated { get; set; }
        public string UserCreatedName { get; set; }
        public DateTime? DateCreated { get; set; }
        public int? UserUpdated { get; set; }
        public string UserUpdatedName { get; set; }
        public DateTime? DateUpdated { get; set; }
        public int? ParentID { get; set; }
        public string Note { get; set; }
        public bool? Active { get; set; }      
        public string Code { get; set; }
        public string Name { get; set; }
        public string Display { get; set; }
        public string Description { get; set; }
        public int? SortOrder { get; set; }

    }
}
