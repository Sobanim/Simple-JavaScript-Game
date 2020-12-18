// const popupLinks = document.querySelector('.popup-link')
// const body = document.querySelector('body')
// const lockPadding = document.querySelector('lock-padding')
//
// let unlock = true
//
// const timeout = 800
//
// if (popupLinks.length > 0){
//     for (let index = 0; index < popupLinks.lenght; index++){
//         const popupLink = popupLinks[index]
//         popupLinks.addEventListener('click', function (e) {
//             const popupName = popupLink.getAttribute('href').replace('#', '')
//             const currentPopup = document.getElementById(popupName)
//
//         })
//     }
// }



//Backend


function sendData() {
    firebase.database().ref('game/').set({
        name: name,
        gameDuration: time,
        difficult: $difficult,
        score: score,
        device: gameDevice
    })
}