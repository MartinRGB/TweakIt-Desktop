import i18n from "i18next";
import enUsTrans from "../../config/en-us.json";
import zhCnTrans from "../../config/zh-cn.json";
import { initReactI18next } from 'react-i18next';
import initState from "../../config/init_state.json";

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