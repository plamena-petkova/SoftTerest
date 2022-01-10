import { get } from '../api/api.js';
import { deleteById, getById } from '../api/data.js';
import { e } from '../dom.js';

const section = document.getElementById('detailsPage');
section.remove();
let ctx = null;


export async function showDetailsPage(ctxTarget, id) { //kogato vikame eventlistenere smenqme ctx na null i slagame ctxtarget
    // console.log(id);
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdea(id);
} 


async function loadIdea(id) {

    const idea = await getById(id);

    section.replaceChildren(createIdeaDiv(idea))


}

function createIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(e('img', { className: 'det-img', src: idea.img }));
    fragment.appendChild(e('div', { className: 'desc'},
            e('h2', {className: 'display-5'}, idea.title),
            e('p', {className: 'infoType'}, 'Description:'),
            e('p', {className: 'idea-description'}, idea.description))   
    );

    const userData = JSON.parse(sessionStorage.getItem('userData'));//izvajdame usera i gledame dali e lognat za da se pokaje ili skrie butona
    if(userData && userData.id == idea._ownerId) {
        fragment.appendChild(e('div', {className: 'text-center'},
        e('a', { className: 'btn detb', href: '', onClick: onDelete}, 'Delete')
     ));
    }


    

         return fragment;

    async function onDelete(event)  { //pravim q vlojena poneje ni trqbwa idto na ideata
             event.preventDefault();
             const confirmed = confirm('Are you sure you want to delete this idea?')
            if(confirmed) {
                await deleteById(idea._id);
                ctx.goTo('catalog');
                
            }

         }            
}