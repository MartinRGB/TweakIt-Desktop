import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import enUsTrans from "@Config/en-us.json";
import zhCnTrans from "@Config/zh-cn.json";
import initState from "@Config/init_state.json";

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
  lng: (initState.isChineseLanguage === true)?'zhCn':'enUs',
  fallbackLng: ['zhCn', 'enUs'],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n;