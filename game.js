let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let $difficult = null
let gameDevice
var database = firebase.database()

let score = 0
let isGameStarted = false
let name = null
let time = ''

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function startGame() {
    score = 0
    setGameTime()

    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = 'white'
    $start.classList.add('hide')

    setDifficult()
    // alert('Your time for game is too long or too slow. Please write correct time from 5 to 20 sec')

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    addDataToTable()
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    sendData()
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let difficult = setDifficult()
    let boxSize = getRandom(difficult.from, difficult.to)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function getRandomColor() {
    let color = Math.floor(Math.random() * (255 - 0) + 0)
    return color
}

document.addEventListener('DOMContentLoaded', function () {
    //
    do {
        do {
            name = prompt('What is your name?', 'Guest')
            if (name === null) {
                alert('Please write YOUR name')
            } else if (name.length >= 20) {
                alert('Your name os too long. Please write shorter name')
            } else if (name.length <= 2) {
                alert('Your name is too shorter. Please write long name')
            } else {
                break
            }
        }
        while (name === null)
    }
    while (name.length >= 20 || name.length <= 2)
})

function addDataToTable() {
    let table = document.querySelector('table')
    let row = table.insertRow(1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)
    let cell5 = row.insertCell(4)
    cell1.innerHTML = name
    cell2.innerHTML = time + " sec"
    cell3.innerHTML = document.querySelector('input[name="difficult"]:checked').value
    cell4.innerHTML = score
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        gameDevice = 'mobile'
        cell5.innerHTML = '<img src="images/mobile.png">'
    } else {
        cell5.innerHTML = '<img src="images/desktop.png">'
        gameDevice = 'desktop'
    }

//    Calculate number tr in table
    let tBody = table.querySelector('tbody')
    let numberLines = tBody.querySelectorAll('tr').length - 1
    if (numberLines === 10) {
        table.deleteRow(10)
    }

}

function setDifficult() {
    $difficult = document.querySelector('input[name="difficult"]:checked').value
    let from, to
    switch ($difficult) {
        case 'easy':
            from = 30
            to = 80
            return {from: from, to: to}
            break
        case 'normal':
            from = 17
            to = 45
            return {from: from, to: to}
            break
        case 'hard':
            from = 10
            to = 30
            return {from: from, to: to}
            break
    }
}