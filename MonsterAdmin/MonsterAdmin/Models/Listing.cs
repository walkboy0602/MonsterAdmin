//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MonsterAdmin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Listing
    {
        public int id { get; set; }
        public Nullable<int> SaleType { get; set; }
        public Nullable<int> CategoryType { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string WarrentyDesc { get; set; }
        public Nullable<bool> CashOnDelivery { get; set; }
        public Nullable<bool> OnlinePayment { get; set; }
        public string PaymentDescription { get; set; }
        public int CreateBy { get; set; }
        public System.DateTime CreateDate { get; set; }
        public Nullable<System.DateTime> PostedDate { get; set; }
        public System.DateTime LastUpdate { get; set; }
        public string Status { get; set; }
    }
}
