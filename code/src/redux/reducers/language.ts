import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from '../actions/language'

export interface LanguageState {
  language: "en" | "zh"
  languageList: { name: string, code: string }[]
}

const initState: LanguageState = {
  language: "zh",
  languageList: [
    { name:"中文", code:"zh" },
    { name:"English", code:"en" },
  ]
}

export function languageReducer(preState=initState, action: LanguageActionTypes) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.data)
      return {...preState, language: action.data};
    case ADD_LANGUAGE:
      return {...preState, languageList: [...preState.languageList, action.data]};
    default:
      return preState
  }
}
