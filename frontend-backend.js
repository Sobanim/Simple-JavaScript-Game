let gameID = getGameId()

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
    let hh = String(today.getHours()).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear();
    today = `${hh}:${min}:${ss} ${dd}.${mm}.${yyyy}`
    return today
}

function getData() {


    // let gamesRef = firebase.database().ref('games').orderByChild('score').on('value', (snapshot) => {
    //     console.log(snapshot.val())
    // })
    let query = firebase.database().ref('games').orderByChild('score').limitToLast(100)
    query.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childKey)
            console.log(childData);
    })


    // let gamesRef = firebase.database().ref('games').orderByChild('score').once('value').then((snapshot) => {
    //     console.log(snapshot.val())
    //
    // })
    // let game = firebase.database().ref('games').orderByChild('score').limitToLast(7).once('value', function (snapshot) {
    //
    //     let games = snapshot.val()
    //     console.log(games)
    // })


})
}


// Front-end

document.querySelector('.global-score-btn button').onclick = function () {
    document.querySelector('.global-score').classList.add('open')
}
document.querySelector('.popup__close').onclick = function () {
    document.querySelector('.global-score').classList.remove('open')
}
// document.querySelector('.overlay').onclick = function () {
//     alert('click')
// }