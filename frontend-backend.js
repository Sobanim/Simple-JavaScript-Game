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
        name: nickname,
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
    today = `${hh}:${min}:${ss} <br> ${dd}.${mm}.${yyyy}`
    return today
}
let i = 0
function getData() {
    let games = []
    let gTable = document.querySelector('.global')
    while (gTable.rows.length > 1){
        gTable.deleteRow(1)
    }
        let query = firebase.database().ref('games').orderByChild('score')
        query.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childKey = childSnapshot.key
                let childData = childSnapshot.val()
                games[i] = childData
                i = i + 1

            })
            let gamesRev = games.reverse()

            for (let j = 0; j <= gamesRev.length - 1; j++){
                let row = gTable.insertRow(1)
                row.insertCell(0).innerHTML = gamesRev.length - j
                row.insertCell(1).innerHTML = gamesRev[gamesRev.length - 1 - j].name
                row.insertCell(2).innerHTML = gamesRev[gamesRev.length - 1 - j].gameDuration
                row.insertCell(3).innerHTML = gamesRev[gamesRev.length - 1 - j].difficult
                row.insertCell(4).innerHTML = gamesRev[gamesRev.length - 1 - j].data
                if (gamesRev[gamesRev.length - 1 - j].device === 'desktop'){
                    row.insertCell(5).innerHTML = '<img src="images/desktop.png">'
                } else if(gamesRev[gamesRev.length - 1 - j].device === 'mobile'){
                    row.insertCell(5).innerHTML = '<img src="images/mobile.png">'
                }
                else{
                    row.insertCell(5).innerHTML = '?-Unknown device-?'
                }
                row.insertCell(6).innerHTML = gamesRev[gamesRev.length - 1 - j].score
            }
            i = 0

        })
}

// Front-end

document.querySelector('.global-score-btn button').onclick = function () {
    document.querySelector('.global-score').classList.add('open')
    getData()

}
document.querySelector('.popup__close').onclick = function () {
    document.querySelector('.global-score').classList.remove('open')
}
document.addEventListener('keyup', event =>{
    let nickname = document.querySelector('#nick').value
    let errorMsg = document.querySelector('#error-login')
    if (nickname === ''){
        errorMsg.innerHTML = 'You didn\'t write your nickname'
    } else if(nickname.length >= 20){
        errorMsg.innerHTML = 'Your nickname is too long.'
    } else if (nickname.length <= 2) {
        errorMsg.innerHTML = 'Your name is too shorter.'
    } else {
        errorMsg.innerHTML = ''
    }
})