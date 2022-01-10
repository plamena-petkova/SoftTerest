import { e } from '../dom.js';
import { createIdea } from '../api/data.js';

const section = document.getElementById('createPage');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export async function showCreatePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);    

    const title = formData.get('title').trim();//tezi gi vzimame ot html
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();

    if(title.length < 6) {
        return alert('Title must be 6')
    }
    if(description.length < 10) {
        return alert('Description must be 6')
    }
    if(img.length < 5) {
        return alert('Image must be 6')
    }


    createIdea({title, description, img});
    form.reset();
    ctx.goTo('catalog');
 

}