export const CHANGE_LANGUAGE = "change_language"
export const ADD_LANGUAGE = "add_language"


interface  ChangelanguageAct {
  type: typeof CHANGE_LANGUAGE,
  data: "zh" | "en"
}

interface  AddlanguageAct {
  type: typeof ADD_LANGUAGE,
  data: {
    code: string,
    name: string
  }
}

export type LanguageActionTypes = ChangelanguageAct | AddlanguageAct

export const changelanguageAction = (languageCode: "zh" | "en"): ChangelanguageAct=>{
  return {
    type: CHANGE_LANGUAGE,
    data: languageCode
  }
}

export const addlanguageAction = (name: string, code: string): AddlanguageAct=>{
  return {
    type: ADD_LANGUAGE,
    data: { code, name }
  }
}