import i18n from "i18next";
import enUsTrans from "./en-us.json";
import zhCnTrans from "./zh-cn.json";
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next) 
.init({
  resources: {
    enUs: {
      translation: enUsTrans,
    },
    zhCn: {
      translation: zhCnTrans,
    },
  },
  lng: 'enUs',
  fallbackLng: ['zhCn', 'enUs'],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n;