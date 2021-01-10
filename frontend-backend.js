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
        data: getCurrentDate()
    })
    firebase.database().ref('/systemInfo').set({
        gameID: gameID + 1
    })

}

function getCurrentDate() {
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
let i = 0
function getData() {
    let games = []

        let query = firebase.database().ref('games').orderByChild('score').limitToLast(100)
        query.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childKey = childSnapshot.key
                let childData = childSnapshot.val()
                games[i] = childData
                i = i + 1

            })
            let gamesRev = games.reverse()
            console.log(gamesRev[1].score)
        })
    // let gTable = document.querySelector('.global')
    // let row = gTable.insertRow(1)
    // row.insertCell(0).innerHTML = i + 1
    // row.insertCell(1).innerHTML = gamesRev
    // row.insertCell(2)
    // row.insertCell(3)
    // row.insertCell(4)
    // row.insertCell(5)
    // row.insertCell(6)

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