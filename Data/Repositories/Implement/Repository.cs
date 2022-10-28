using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        private readonly ThonTrangContext _context;

        public Repository(ThonTrangContext context)
        {
            _context = context;
        }
        public virtual void Initialization(T model)
        {
            model.DateUpdated = AppGlobal.InitializationDateTime;
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            if (model.Active == null)
            {
                model.Active = true;
            }
            if (string.IsNullOrEmpty(model.Code))
            {
                model.Code = AppGlobal.InitializationDateTimeTicksCode.Substring(0, 5);
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                model.Name = model.Code;
            }
            if (!string.IsNullOrEmpty(model.Name))
            {
                model.Name = model.Name.Trim();
            }
            if (string.IsNullOrEmpty(model.Display))
            {
                model.Display = model.Name;
            }
        }
        public virtual int Add(T model)
        {
            Initialization(model);
            _context.Set<T>().Add(model);
            var existModel = GetByCode(model.Code);
            if (existModel == null)
            {
                var existModel001 = GetByName(model.Name);
                if (existModel001 == null)
                {
                    _context.Set<T>().Add(model);
                }
            }
            return _context.SaveChanges();
        }
        public async Task<int> AsyncAdd(T model)
        {
            Initialization(model);
            var existModel = await AsyncGetByCode(model.Code);
            if (existModel == null)
            {
                var existModel001 = await AsyncGetByName(model.Name);
                if (existModel001 == null)
                {
                    _context.Set<T>().Add(model);
                }
            }
            return await _context.SaveChangesAsync();
        }
        public virtual int Update(T model)
        {
            var existModel = GetByID(model.ID);
            if (existModel != null)
            {
                existModel = model;
                Initialization(existModel);
                _context.Set<T>().Update(existModel);
            }
            return _context.SaveChanges();
        }
        public async Task<int> AsyncUpdate(T model)
        {
            var existModel = await AsyncGetByID(model.ID);
            if (existModel != null)
            {
                existModel = model;
                _context.Set<T>().Update(existModel);
            }
            return await _context.SaveChangesAsync();
        }
        public int Remove(int ID)
        {
            var existModel = GetByID(ID);
            if (existModel != null)
            {
                _context.Set<T>().Remove(existModel);
            }
            return _context.SaveChanges();
        }
        public async Task<int> AsyncRemove(int ID)
        {
            var existModel = await AsyncGetByID(ID);
            if (existModel != null)
            {
                _context.Set<T>().Remove(existModel);
            }
            return await _context.SaveChangesAsync();
        }
        public int AddRange(List<T> list)
        {
            _context.Set<T>().AddRange(list);
            return _context.SaveChanges();
        }
        public async Task<int> AsyncAddRange(List<T> list)
        {
            _context.Set<T>().AddRange(list);
            return await _context.SaveChangesAsync();
        }
        public int UpdateRange(List<T> list)
        {
            _context.Set<T>().UpdateRange(list);
            return _context.SaveChanges();
        }
        public async Task<int> AsyncUpdateRange(List<T> list)
        {
            _context.Set<T>().UpdateRange(list);
            return await _context.SaveChangesAsync();
        }
        public int RemoveRange(List<T> list)
        {
            _context.Set<T>().RemoveRange(list);
            return _context.SaveChanges();
        }
        public async Task<int> AsyncRemoveRange(List<T> list)
        {
            _context.Set<T>().RemoveRange(list);
            return await _context.SaveChangesAsync();
        }
        public T GetByID(int ID)
        {
            var result = _context.Set<T>().AsNoTracking().FirstOrDefault(model => model.ID == ID);
            return result;
        }
        public async Task<T> AsyncGetByID(int ID)
        {
            var result = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(model => model.ID == ID);
            return result;
        }
        public T GetByCode(string code)
        {
            var result = _context.Set<T>().AsNoTracking().FirstOrDefault(model => model.Code == code);
            return result;
        }
        public async Task<T> AsyncGetByCode(string code)
        {
            var result = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(model => model.Code == code);
            return result;
        }
        public T GetByName(string name)
        {
            var result = _context.Set<T>().AsNoTracking().FirstOrDefault(model => model.Name == name);
            return result;
        }
        public async Task<T> AsyncGetByName(string name)
        {
            var result = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(model => model.Name == name);
            return result;
        }
        public T GetByDisplay(string display)
        {
            var result = _context.Set<T>().AsNoTracking().FirstOrDefault(model => model.Display == display);
            return result;
        }
        public async Task<T> AsyncGetByDisplay(string display)
        {
            var result = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(model => model.Display == display);
            return result;
        }
        public virtual List<T> GetAllToList()
        {
            var result = _context.Set<T>().OrderByDescending(model => model.DateUpdated).ToList();
            return result ?? new List<T>();
        }
        public async Task<List<T>> AsyncGetAllToList()
        {
            var result = await _context.Set<T>().OrderByDescending(model => model.DateUpdated).ToListAsync();
            return result ?? new List<T>();
        }
        public virtual List<T> GetByActiveToList(bool active)
        {
            var result = _context.Set<T>().Where(model => model.Active == active).OrderByDescending(model => model.DateUpdated).ToList();
            return result;
        }
        public async Task<List<T>> AsyncGetByActiveToList(bool active)
        {
            var result = await _context.Set<T>().Where(model => model.Active == active).OrderByDescending(model => model.DateUpdated).ToListAsync();
            return result;
        }
        public virtual List<T> GetByParentIDToList(int parentID)
        {
            var result = _context.Set<T>().Where(model => model.ParentID == parentID).OrderByDescending(model => model.DateUpdated).ToList();
            return result;
        }
        public virtual List<T> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _context.Set<T>().Where(model => model.ParentID == parentID && model.Active == active).OrderByDescending(model => model.DateUpdated).ToList();
            return result;
        }
        public async Task<List<T>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _context.Set<T>().Where(model => model.ParentID == parentID).OrderByDescending(model => model.DateUpdated).ToListAsync();
            return result;
        }
        public virtual List<T> GetBySearchStringToList(string searchString)
        {
            List<T> result = new List<T>();
            if (string.IsNullOrEmpty(searchString))
            {
                result = GetAllToList();
            }
            else
            {
                searchString = searchString.Trim();
                result = _context.Set<T>().Where(model => model.Name.Contains(searchString) || model.Code.Contains(searchString) || model.Display.Contains(searchString)).OrderByDescending(model => model.DateUpdated).ToList();
            }
            return result;
        }
        public async Task<List<T>> AsyncGetBySearchStringToList(string searchString)
        {
            List<T> result = new List<T>();
            if (string.IsNullOrEmpty(searchString))
            {
                result = await AsyncGetAllToList();
            }
            else
            {
                searchString = searchString.Trim();
                result = await _context.Set<T>().Where(model => model.Name.Contains(searchString) || model.Code.Contains(searchString) || model.Display.Contains(searchString)).OrderByDescending(model => model.DateUpdated).ToListAsync();
            }
            return result;
        }
        public async Task<List<T>> AsyncGetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = await _context.Set<T>().Where(model => model.ParentID == parentID && model.Active == active).OrderByDescending(model => model.DateUpdated).ToListAsync();
            return result;
        }
        public List<T> GetByPageAndPageSizeToList(int page, int pageSize)
        {
            var result = _context.Set<T>().Skip(page * pageSize).Take(pageSize).OrderByDescending(model => model.DateUpdated).ToList();
            return result;
        }
        public async Task<List<T>> AsyncGetByPageAndPageSizeToList(int page, int pageSize)
        {
            var result = await _context.Set<T>().Skip(page * pageSize).Take(pageSize).OrderByDescending(model => model.DateUpdated).ToListAsync();
            return result;
        }
    }
}
