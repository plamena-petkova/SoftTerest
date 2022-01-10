import { e } from '../dom.js';
import { getAllIdeas } from '../api/data.js';


const section = document.getElementById('dashboard-holder');
section.remove();
section.addEventListener('click', onDetails);
let ctx = null;

export async function showCatalogPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdeas();
} 

async function loadIdeas() {
    const ideas = await getAllIdeas();

    if(ideas.length == 0) {
        section.replaceChildren(e('h1', {}, 'No ideas yet! Be the first one :)'));
    } else {
    const fragment = document.createDocumentFragment();
    ideas.map(createIdeaCard).forEach(i => fragment.appendChild(i));
    section.replaceChildren(fragment);
    }
}

function createIdeaCard(idea) {
    const element = e('div', {className: 'card overflow-hidden current-card details'});
    element.style.width = '20rem';
    element.style.height = '18rem';

    element.innerHTML = `
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a data-id="${idea._id}"" class="btn" href="">Details</a>
</div>`

    return element;
}

/*
div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">4 easy DIY ideas to try!</p>
            </div>
            <img class="card-image" src="./images/brightideacropped.jpg" alt="Card image cap">
            <a class="btn" href="">Details</a>
        </div>
*/

function onDetails(ev) { //hvashtame anchor za da vidim dali se caknali na buton
    if(ev.target.tagName == 'A') {
        const id = ev.target.dataset.id;
        ev.preventDefault();
        ctx.goTo('details', id);
    }

}