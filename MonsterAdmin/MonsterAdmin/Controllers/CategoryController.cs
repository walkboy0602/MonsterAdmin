using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MonsterAdmin.Models;

namespace MonsterAdmin.Controllers.Shared
{
    public class CategoryController : Controller
    {
        private ShopDBEntities db = new ShopDBEntities();

        // GET: /Category/
        public ActionResult Index()
        {
            var categories = db.RefCategories.ToList();
            return View(categories);
        }

        //
        // GET: /Category/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Category/Create

        public ActionResult Create()
        {
            SetCategoryViewBag();
            return View();
        }

        //
        // Dropdown: Category

        private void SetCategoryViewBag(int? categoryID = null)
        {
            if (categoryID == null)
                ViewBag.Categories = new SelectList(db.RefCategories, "id", "Name");
            else
                ViewBag.Categories = new SelectList(db.RefCategories, "id", "Name", categoryID);
        }

        //
        // POST: /Category/Create

        [HttpPost]
        public ActionResult Create(RefCategory model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.RefCategories.Add(model);
                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
                SetCategoryViewBag(model.ParentID);
                return View(model);
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Category/Edit/5

        public ActionResult Edit(int id)
        {
            RefCategory category = db.RefCategories.Find(id);

            if (category == null)
            {
                return HttpNotFound();
            }

            SetCategoryViewBag(category.ParentID);
            return View(category);
        }

        //
        // POST: /Category/Edit/5

        [HttpPost]
        public ActionResult Edit(RefCategory model)
        {
            if (ModelState.IsValid)
            {
                db.Entry(model).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            SetCategoryViewBag(model.ParentID);
            return View(model);
        }

        //
        // GET: /Category/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Category/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
