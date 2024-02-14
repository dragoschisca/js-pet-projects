const items = document.querySelectorAll('.countdown-item > h4')
const countdownElement = document.querySelector('.countdown')

// Introduc data 
let countdownDate = new Date(2023, 7, 3, 0, 0, 0).getTime()

function getCountdownTime() {
    //primes timpul actual
    const now = new Date().getTime();

    //De gasit diferenta
    const diff = countdownDate - now;
    
    // 1s = 1000ms
    // 1m = 60s
    // 1h = 60m
    // 1d = 24h

    //Variabile in ms

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    //Socot pentru zi, ora, minuta si secunda

    let days = Math.floor(diff / oneDay);
    let hours = Math.floor((diff % oneDay) / oneHour);
    let minutes = Math.floor((diff % oneHour) / oneMinute);
    let seconds = Math.floor((diff % oneMinute) / 1000);

    //Creaz arr cu variabilele

    const values = [days, hours, minutes, seconds];

    //Introduc valoarea var pe pagina

    items.forEach(function(item, index) {
        item.textContent = values[index]
    })

    if(diff < 0){
        clearInterval(countdown)
        countdownElement.innerHTML = "<h4 class='expired'>Timpul a trecut</h4>"
    }
}

// Refresh counters
let countdown = setInterval(getCountdownTime, 1000)

//Intializarea timp curent 
getCountdownTime()