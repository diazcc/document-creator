import LangServices from '../services/LangServices.ts'

export default {
  en: await LangServices.getLangEnUs(),
  es: await LangServices.getLangEsCo()
};

