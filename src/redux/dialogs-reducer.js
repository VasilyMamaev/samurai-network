const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'

const initialState = {
  dialogsElements: [
    {name: 'dima', id: '1'},
    {name: 'sema', id: '2'},
    {name: 'lucy', id: '3'},
    {name: 'kolya', id: '4'},
    {name: 'zhora', id: '5'},
  ],
  messages: [
    'Привет, есть свободные билеты в театр. Ты хотел. На Щелкунчик Лебединое озеро На Кармен',
    'Привет. Вау! Это замечательно. Спасибо большое! Моя мама хотела сходить на Лебединое озеро. Будет ли 2 билета?',
    'Да. Я постараюсь найти еще один билет для твоей мамы. Есть на 21 и 23 июня. Подскажи, когда тебе удобно?',
    '23 июня будет отлично! Спасибо!Буду ждать новостей от тебя. Хорошего дня!'
  ],
  newTextMessage: ''
}

let dialogsReducer = (state = initialState, action) => {
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

export const updateMessageTextActionCreator = (text) => ({type:UPDATE_MESSAGE_TEXT, text})
export const addMessageActionCreator = (text) => ({type:ADD_MESSAGE, text})

export default dialogsReducer
