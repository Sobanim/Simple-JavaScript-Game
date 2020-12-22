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
    firebase.database().ref('games/' + gameID).set({
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
    let database = firebase.database();

    let gamesRef = firebase.database().ref('games').orderByChild('score').once('value').then((snapshot) => {
        console.log(snapshot.val())

    })
    // gamesRef.orderByChild('score').limitToFirst(10).once('value', function (snapshot) { // orderByChild - sort by somethings
    //     let gamesNumber = snapshot.val()
    //     console.log(gamesRef)




        // let ln = Object.keys(gamesNumber).length
        // for (let i = 0; i <= 10; i++){
        //     i = i.toString()
        //     console.log(gamesNumber[i])
        // }
    // })
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