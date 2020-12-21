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
let gameID = 0

function getGameId() {
    firebase.database().ref('/systemInfo').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let childKey = childSnapshot.key
            let childData = childSnapshot.val()
            gameID = childData
            return gameID
        })
    })
}

function sendData() {
    getGameId()
    firebase.database().ref('games/game' + gameID).set({
        name: name,
        gameDuration: time,
        difficult: $difficult,
        score: score,
        device: gameDevice,
        data: getCurrentData()
    })
    firebase.database().ref('/systemInfo').set({
        gameID: gameID + 1
    })

}

function getCurrentData() {
    let today = new Date();
    let ss = String(today.getSeconds()).padStart(2, '0')
    let min = String(today.getMinutes()).padStart(2, '0')
    let hh = today.getHours()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear();
    today = `${hh}:${min}:${ss} ${dd}.${mm}.${yyyy}`
    return today
}