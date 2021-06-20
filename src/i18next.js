import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation : {
      "test" : "test 1",
      "lang" : {
        "en" : "English",
        "zh" : "中文",
        "in" : "bahasa Indonesia",
      },
      "login" : {
        "Login" : "Login",
        "Register" : "Register",
        "Confirm" : "Confirm",
        "Email" : "Email",
        "User Name" : "User Name",
        "Password" : "Password"
      },
      "daily": {
        "total": 'Daily Total: ',
        "add": 'Add Item',
        "save": "Save",
        "item": "Item",
        "price": "Price",
        "new": "New Item "
      },
      "monthly": {
        'total': 'Monthly Total: '
      },
      "annual": {
        'total': 'Annual Total: '
      },
      "others": {
        'total': 'Total',
        'dark': 'Dark Mode',
        'color': 'Color Theme'
      },
      "appBar": {
        'Day' : 'Day',
        'Month' : 'Month',
        'Year' : 'Year',
        'Setting' : 'Setting',
        'Logout' : 'Logout',
        'change' : 'Changes have been detected. Please save changes first.'
      }
    }
  },
  zh: {
    translation : {
      "test" : "測試 1",
      "lang" : {
        "en" : "English",
        "zh" : "中文",
        "in" : "bahasa Indonesia",
      },
      "login" : {
        "Login" : "登入",
        "Register" : "注冊",
        "Confirm" : "確認",
        "Email" : "電郵",
        "User Name" : "用戶名稱",
        "Password" : "密碼"
      },
      "daily": {
        "total": '每日總計: ',
        "add": '新增項目',
        "save": "保存",
        "item": "項目",
        "price": "價格",
        "new": "新項目 "
      },
      "monthly": {
        'total': '每月總計: '
      },
      "annual": {
        'total': '年度總計: '
      },
      "others": {
        'total': '總計',
        'dark': '夜晚模式',
        'color': '顏色主題'
      },
      "appBar": {
        'Day' : '日期模式',
        'Month' : '月份模式',
        'Year' : '年份模式',
        'Setting' : '設定',
        'Logout' : '登出',
        'change' : '已檢測到更改，請先保存更改。'
      }
    }
  },
  // in: {
  //   translation : {
  //     "test" : "uji 1",
  //     "lang" : {
  //       "en" : "English",
  //       "zh" : "中文",
  //       "in" : "bahasa Indonesia",
  //     },
  //     "login" : {
  //       "Login" : "Gabung",
  //       "Register" : "Daftar",
  //       "Confirm" : "Konfirmasi",
  //       "Email" : "Email",
  //       "User Name" : "Nama pengguna",
  //       "Password" : "Password"
  //     },
  //     "appBar": {
  //       'Day' : 'Hari',
  //       'Month' : 'Bulan',
  //       'Year' : 'Tahun',
  //       'Setting' : 'Pengaturan',
  //       'Logout' : 'Keluar'
  //     }
  //   }
  // }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",
    supportedLngs: ['en' ,'zh'],
    load: 'languageOnly',

    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;