import { dialogType } from "../types/types"

const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'

const initialState = {
  dialogsElements: [
    {id: 1, name: 'dima'},
    {id: 2, name: 'sema'},
    {id: 3, name: 'tonya'},
    {id: 4, name: 'kolya'},
    {id: 5, name: 'zhora'},
  ] as Array<dialogType>,
  messages: [
    'Привет, есть свободные билеты в театр. Ты хотел. На Щелкунчик Лебединое озеро На Кармен',
    'Привет. Вау! Это замечательно. Спасибо большое! Моя мама хотела сходить на Лебединое озеро. Будет ли 2 билета?',
    'Да. Я постараюсь найти еще один билет для твоей мамы. Есть на 21 и 23 июня. Подскажи, когда тебе удобно?',
    '23 июня будет отлично! Спасибо!Буду ждать новостей от тебя. Хорошего дня!'
  ] as Array<string>,
  newTextMessage: ''
}

type stateType = typeof initialState

let dialogsReducer = (state = initialState, action: any): stateType => {
  switch (action.type) {
    case 'UPDATE-MESSAGE-TEXT':
      let stateCopy = {...state}
      stateCopy.newTextMessage = action.text
      return stateCopy
    case 'ADD-MESSAGE': 
      return {
        ...state,
        messages: [
          ...state.messages,
          action.text
        ]
      }
    default: 
      return state
  }
}

export type updateMessageTextACType = {
  type: typeof UPDATE_MESSAGE_TEXT
  text: string
}
export const updateMessageTextAC = (text: string): updateMessageTextACType => ({type:UPDATE_MESSAGE_TEXT, text})

export type addMessageACType = {
  type: typeof ADD_MESSAGE
  text: string
}
export const addMessageAC = (text: string): addMessageACType => ({type:ADD_MESSAGE, text})

export default dialogsReducer
