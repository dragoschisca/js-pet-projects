//div ce contine btn
const mainEl = document.querySelector('.main')

//password generat
const passwordEl = document.createElement('input')

//class, palceholder si prevenirea la scris in input
passwordEl.classList.add('password')
passwordEl.setAttribute('placeholer', 'Generate password')
passwordEl.addEventListener('keypress', (e) => {
    e.preventDefault();
})

//copy la click pe input
passwordEl.addEventListener('focus', (e) => {
    navigator.clipboard.writeText(passwordEl.value)
})

//btn copy
const copyBtn = document.createElement('button');
copyBtn.classList.add('passwordBtn')
copyBtn.innerText = 'Copy'

//copy la click pe btn
copyBtn.addEventListener('click', (e) => {
    passwordEl.select()
    passwordEl.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(passwordEl.value)
})

//btn generate
const generateBtn = document.createElement('button')
generateBtn.classList.add('passwordBtn')
generateBtn.innerText = 'Generate'

//generate password
generateBtn.addEventListener('click', (e) => {
    let password = generatePassword(12)
    passwordEl.value = password
})

function generatePassword(passwordLength){
    const numberChars = "0123456789"
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerChars = "abcdefghijklmnopqrstuvwxyz"
    const symbolChars = "!@#$%^&*()_+"

    const allChars = numberChars + upperChars + lowerChars + symbolChars

    let randomString = ''

    for(let i = 0; i < passwordLength; i++){
        let randomNumber = Math.floor(Math.random() * allChars.length)
        randomString += allChars[randomNumber]
    }

    return randomString
}

//adauga input-ul, butonul in div-ul parinte
mainEl.appendChild(passwordEl)
mainEl.appendChild(copyBtn)
mainEl.appendChild(generateBtn)