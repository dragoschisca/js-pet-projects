const button = document.getElementById('btn');
const color = document.querySelector('.color')

const hex = [
    '0','1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F',
]

function getRadnomNumber(){
    return Math.floor(Math.random() * hex.length);
}

function generateHex(){
    let hexColor = '#';

    for(let i = 0; i < 6; i++){
        hexColor += hex[getRadnomNumber()]
    }

    return hexColor;
}

button.addEventListener('click', () => {
    let random = generateHex()
    document.body.style.backgroundColor = random
    color.innerHTML = random
});
