// import profileReducer from "./profile-reducer"
// import dialogsReducer from "./dialogs-reducer"

// let store = {
//   _state: { 
//     dialogs: {
//       dialogsElements: [
//         {name: 'dima', id: '1'},
//         {name: 'sema', id: '2'},
//         {name: 'lucy', id: '3'},
//         {name: 'kolya', id: '4'},
//         {name: 'zhora', id: '5'},
//       ],
//       messages: [
//         'Привет, есть свободные билеты в театр. Ты хотел. На Щелкунчик Лебединое озеро На Кармен',
//         'Привет. Вау! Это замечательно. Спасибо большое! Моя мама хотела сходить на Лебединое озеро. Будет ли 2 билета?',
//         'Да. Я постараюсь найти еще один билет для твоей мамы. Есть на 21 и 23 июня. Подскажи, когда тебе удобно?',
//         '23 июня будет отлично! Спасибо!Буду ждать новостей от тебя. Хорошего дня!'
//       ],
//       newTextMessage: ''
//     },
//     profile: {
//       userInfo: {
//         avatar: 'https://playjoor.com/assets/img/default_avis/matthew.png',
//         birth: '4 августа',
//         city: 'Екатеринбург',
//         education: 'УрФУ',
//         web_site: 'https://github.com/VasilyMamaev'
//       },
//       userPosts: [
//         'Шёл сегодня с работы домой, на улице темнотища, иду с фонариком. Смотрю, впереди на снегу необычные образования. Пригляделся - следы :) По свежевыпавшему пушистому снегу прошлись, а потом ветер выдул весь снег, оставив только спрессованные ногами следы от ботинок. Впервые такое вижу.',
//         'Как-то стороной обходили Поль Бейкери, а оказывается там весьма неплохо.'
//       ],
//       newPostText: ''
//   }},
//   _callSubscriber () {},

//   getState () {
//     return this._state
//   },
//   subscriber (observer) {
//     this._callSubscriber = observer
//   },
//   dispatch (action) {
//     this._state.dialogs = dialogsReducer(this._state.dialogs, action)
//     this._state.profile = profileReducer(this._state.profile, action)
    
//     this._callSubscriber(this._state)
//   },
// }


// export default store
