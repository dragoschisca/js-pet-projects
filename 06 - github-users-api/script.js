const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div')

// creez formular
const formEl = document.createElement('form');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputsValue = Object.fromEntries(new FormData(e.target));

    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`);

    console.log(response);

    if(response.ok){
        const data = await response.json();
        wrapper.appendChild(createProfileEl(data));
        mainEl.appendChild(wrapper);
        inputEl.value = '';
    } 
    else {
        alert('Not found');
    }
})

//creez input
const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name');

//creez btn
const searchButtonEl = document.createElement('button');
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerText = 'Search';


//adaug in form elementul input si btn
formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);

//adaug form in div
mainEl.appendChild(formEl);

function createProfileEl(profileData){
    const element = document.createElement('div');
    element.classList.add('profile');

    element.innerHTML = `
    <img class ="search-image" src = ${profileData.avatar_url}></img>
    <p class="search-text"><span>Name: </span>${profileData.name}</p>
    <p class="search-text"><span>City: </span>${profileData.location}</p>
    <p class="search-text"><span>About: </span>${profileData.bio}</p>
    `

    element.appendChild(createDeleteBtnEl());
    return element;
}

function createDeleteBtnEl(){
    const element = document.createElement('button');
    element.classList.add('delete-button');
    element.innerText = 'Delete';
    element.addEventListener('click', (e) => {
        wrapper.innerHTML = ''
    })

    return element;
}