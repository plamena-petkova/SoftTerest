import { login, logout } from './api/api.js';
import * as api from './api/data.js';
// window.api = api;

import { showCatalogPage } from "./views/catalog.js"
import { showCreatePage } from "./views/create.js"
import { showDetailsPage } from "./views/details.js"
import { showHomePage } from "./views/home.js"
import { showLoginPage } from "./views/login.js"
import { showRegisterPage } from "./views/register.js"
import { showSection } from "./dom.js"

const links = {
    'homeLink': 'home',
    'getStartedLink': 'home',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'createLink': 'create',
    'registerLink': 'register'
}

const ctx = {
    goTo,
    showSection,
    updateNav
}


updateNav()

const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'create': showCreatePage,
    'details': showDetailsPage

}

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);
document.getElementById('logouLink').addEventListener('click', async (ev) => {
    ev.preventDefault();
    await logout();
    updateNav();
    goTo('home');

})

//start app in home view
goTo('home');

function onNavigate(event) {

    const name = links[event.target.id];
    if(name) {
        event.preventDefault();
        goTo(name);
    }

}


function goTo(name, ...params) {
    const view = views[name];
    if(typeof view == 'function') {
        view(ctx,...params);
    }
}

    //ako ima neshto v sessionstorage da pokaje predelei butoni i da skrie drugi
    export function updateNav() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if(userData != null) {
            // [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
            // [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
        } else {
    
            // [...nav.querySelectorAll('.user')].forEach(e => e.style.display == 'none');
            // [...nav.querySelectorAll('.guest')].forEach(e => e.style.display == 'block');
        }
    }
    

