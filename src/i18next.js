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
      "appBar": {
        'Day' : 'Day',
        'Month' : 'Month',
        'Year' : 'Year',
        'Setting' : 'Setting',
        'Logout' : 'Logout'
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
      "appBar": {
        'Day' : '日期模式',
        'Month' : '月份模式',
        'Year' : '年份模式',
        'Setting' : '設定',
        'Logout' : '登出'
      }
    }
  },
  in: {
    translation : {
      "test" : "uji 1",
      "lang" : {
        "en" : "English",
        "zh" : "中文",
        "in" : "bahasa Indonesia",
      },
      "login" : {
        "Login" : "Gabung",
        "Register" : "Daftar",
        "Confirm" : "Konfirmasi",
        "Email" : "Email",
        "User Name" : "Nama pengguna",
        "Password" : "Password"
      },
      "appBar": {
        'Day' : 'Hari',
        'Month' : 'Bulan',
        'Year' : 'Tahun',
        'Setting' : 'Pengaturan',
        'Logout' : 'Keluar'
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    supportedLngs: ['en' ,'zh', 'in'],
    load: 'languageOnly',

    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;