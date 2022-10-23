using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;

namespace ThonTrang.Helpers
{
    public class AppGlobal
    {

        #region AppSettings
        public static int DateBegin
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("DateBegin").Value);
            }
        }
        public static int DateEnd
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("DateEnd").Value);
            }
        }
        public static int CompanyID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("CompanyID").Value);
            }
        }
        public static int BiBenID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BiBenID").Value);
            }
        }
        public static int VyTamID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("VyTamID").Value);
            }
        }
        public static int UnitID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("UnitID").Value);
            }
        }
        public static int UnitID02
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("UnitID02").Value);
            }
        }

        public static string LogoFileName
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("LogoFileName").Value;
            }
        }
        public static string BiBenFileName
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("BiBenFileName").Value;
            }
        }
        public static string VyTamFileName
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("VyTamFileName").Value;
            }
        }
        public static string Images
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Images").Value;
            }
        }
        public static string Product
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Product").Value;
            }
        }
        public static string Upload
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Upload").Value;
            }
        }
        public static string Download
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Download").Value;
            }
        }
        public static string HTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("HTML").Value;
            }
        }
        public static string CRMSite
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("CRMSite").Value;
            }
        }
        public static string APISite
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("APISite").Value;
            }
        }
        public static string SQLServerConectionString
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("SQLServerConectionString").Value;
            }
        }

        #endregion
        #region Functions  
        public static string DecodeEncodedNonAsciiCharacters(string value)
        {
            return System.Text.RegularExpressions.Regex.Replace(
                value,
                @"\\u(?<Value>[a-zA-Z0-9]{4})",
                m =>
                {
                    return ((char)int.Parse(m.Groups["Value"].Value, NumberStyles.HexNumber)).ToString();
                });
        }
        public static string CovertDateTime(string date)
        {
            date = date.Replace(@"GMT", @"~");
            date = date.Split('~')[0].Trim();
            return date;
        }
        public static string SetName(string name)
        {
            string result = name;
            if (!string.IsNullOrEmpty(result))
            {
                result = result.Trim();
                result = result.ToLower();
                result = result.Replace(@" ", "-");
                result = result.Replace(@"  ", "-");
                result = result.Replace(@"    ", "-");
                result = result.Replace("‘", "-");
                result = result.Replace("’", "-");
                result = result.Replace("“", "-");
                result = result.Replace("--", "-");
                result = result.Replace("+", "-");
                result = result.Replace("/", "-");
                result = result.Replace(@"\", "-");
                result = result.Replace(":", "-");
                result = result.Replace(";", "-");
                result = result.Replace("%", "-");
                result = result.Replace("`", "-");
                result = result.Replace("~", "-");
                result = result.Replace("#", "-");
                result = result.Replace("$", "-");
                result = result.Replace("^", "-");
                result = result.Replace("&", "-");
                result = result.Replace("*", "-");
                result = result.Replace("(", "-");
                result = result.Replace(")", "-");
                result = result.Replace("|", "-");
                result = result.Replace("'", "-");
                result = result.Replace(",", "-");
                result = result.Replace(".", "-");
                result = result.Replace("?", "-");
                result = result.Replace("<", "-");
                result = result.Replace(">", "-");
                result = result.Replace("]", "-");
                result = result.Replace("[", "-");
                result = result.Replace(@"""", "-");
                result = result.Replace("á", "a");
                result = result.Replace("à", "a");
                result = result.Replace("ả", "a");
                result = result.Replace("ã", "a");
                result = result.Replace("ạ", "a");
                result = result.Replace("ă", "a");
                result = result.Replace("ắ", "a");
                result = result.Replace("ằ", "a");
                result = result.Replace("ẳ", "a");
                result = result.Replace("ẵ", "a");
                result = result.Replace("ặ", "a");
                result = result.Replace("â", "a");
                result = result.Replace("ấ", "a");
                result = result.Replace("ầ", "a");
                result = result.Replace("ẩ", "a");
                result = result.Replace("ẫ", "a");
                result = result.Replace("ậ", "a");
                result = result.Replace("í", "i");
                result = result.Replace("ì", "i");
                result = result.Replace("ỉ", "i");
                result = result.Replace("ĩ", "i");
                result = result.Replace("ị", "i");
                result = result.Replace("ý", "y");
                result = result.Replace("ỳ", "y");
                result = result.Replace("ỷ", "y");
                result = result.Replace("ỹ", "y");
                result = result.Replace("ỵ", "y");
                result = result.Replace("ó", "o");
                result = result.Replace("ò", "o");
                result = result.Replace("ỏ", "o");
                result = result.Replace("õ", "o");
                result = result.Replace("ọ", "o");
                result = result.Replace("ô", "o");
                result = result.Replace("ố", "o");
                result = result.Replace("ồ", "o");
                result = result.Replace("ổ", "o");
                result = result.Replace("ỗ", "o");
                result = result.Replace("ộ", "o");
                result = result.Replace("ơ", "o");
                result = result.Replace("ớ", "o");
                result = result.Replace("ờ", "o");
                result = result.Replace("ở", "o");
                result = result.Replace("ỡ", "o");
                result = result.Replace("ợ", "o");
                result = result.Replace("ú", "u");
                result = result.Replace("ù", "u");
                result = result.Replace("ủ", "u");
                result = result.Replace("ũ", "u");
                result = result.Replace("ụ", "u");
                result = result.Replace("ư", "u");
                result = result.Replace("ứ", "u");
                result = result.Replace("ừ", "u");
                result = result.Replace("ử", "u");
                result = result.Replace("ữ", "u");
                result = result.Replace("ự", "u");
                result = result.Replace("é", "e");
                result = result.Replace("è", "e");
                result = result.Replace("ẻ", "e");
                result = result.Replace("ẽ", "e");
                result = result.Replace("ẹ", "e");
                result = result.Replace("ê", "e");
                result = result.Replace("ế", "e");
                result = result.Replace("ề", "e");
                result = result.Replace("ể", "e");
                result = result.Replace("ễ", "e");
                result = result.Replace("ệ", "e");
                result = result.Replace("đ", "d");
                result = result.Replace("--", "-");
            }
            return result;
        }



        #endregion
        #region Initialization


        public static string InitializationString
        {
            get
            {
                return "";
            }
        }
        public static DateTime InitializationDateTime
        {
            get
            {
                return DateTime.Now;
            }
        }
        public static string InitializationGUICode
        {
            get
            {
                return Guid.NewGuid().ToString();
            }
        }
        public static Guid InitializationGUI
        {
            get
            {
                return Guid.NewGuid();
            }
        }
        public static string InitializationDateTimeCode
        {
            get
            {
                return DateTime.Now.ToString("yyyyMMddHHmmss") + DateTime.Now.Ticks.ToString();
            }
        }
        public static string InitializationDateTimeTicksCode
        {
            get
            {
                return DateTime.Now.Ticks.ToString();
            }
        }
        public static int InitializationNumber
        {
            get
            {
                return 0;
            }
        }

        #endregion
    }

    public class YearMonth
    {
        public int ID { get; set; }
        public string Display { get; set; }
        public YearMonth()
        {
        }
        public static List<YearMonth> GetYearToList()
        {
            List<YearMonth> list = new List<YearMonth>();
            for (int i = AppGlobal.DateBegin; i <= AppGlobal.DateEnd; i++)
            {
                YearMonth model = new YearMonth();
                model.ID = i;
                model.Display = "Năm " + i;
                list.Add(model);
            }
            return list;
        }
        public static List<YearMonth> GetMonthToList()
        {
            List<YearMonth> list = new List<YearMonth>();
            for (int i = 1; i <= 12; i++)
            {
                YearMonth model = new YearMonth();
                model.ID = i;
                model.Display = "Tháng " + i;
                list.Add(model);
            }
            return list;
        }
    }
}
