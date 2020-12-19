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




function sendData() {
    firebase.database().ref('game/').set({
        name: name,
        gameDuration: time,
        difficult: $difficult,
        score: score,
        device: gameDevice,
        data: getCurrentData()
    })
}

function getCurrentData() {
    let today = new Date();
    let min = today.getMinutes()
    let hh = today.getHours()
    let ss = today.getSeconds()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = `${hh}:${min}:${ss} ${dd}.${mm}.${yyyy}`
    return today
}