using System;
using System.ComponentModel.DataAnnotations;

namespace MonsterAdmin.Models
{
   
    [MetadataType(typeof(RefCategoryMetaData))]
    public partial class RefCategory { }


    public class RefCategoryMetaData
    {
        public int id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2, ErrorMessage="Name must be at least {1} characters long.")]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public Nullable<int> ParentID { get; set; }

        //[Required(ErrorMessage=String.Format("The 'something' ({0}) is required because of: {1}", "1233213"))]
        public string MetaDescription { get; set; }
        public string MetaKeyword { get; set; }
        public string Description { get; set; }
        public Nullable<int> Sort { get; set; }
        public Nullable<bool> isActive { get; set; }

    }
}