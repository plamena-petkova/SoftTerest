const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if(response.ok != true) {
            if(response.status == 403) {//problem s token - ako ima iztrivame tokena
                sessionStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
            }

        if(response.status == 204) {//v responsa nqma danni 
            return response;
        } else {
            return response.json();//v responsa ima danni
        }         
    } catch (err) { 
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}//ako nqma lognat nqma danni
    };

    if(data != undefined) {//ima li podadeni danni ako ima 0 nqma da mine zatova undefined
        options.headers['Content-Type'] = 'applications/json'
        options.body = JSON.stringify(data);
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if(userData != null) { //ima li potrebitel
        options.headers['X-Authorization'] = userData.token;
        
    }

    return options;

}

export async function get(url) {
    return request(url, createOptions());

}


export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));


}

export async function del(url) {
    return request(url, createOptions('delete'));
}


export async function login(email, password) {
    const result = await post('/users/login', { email, password });
    const userData = {
        email: result.email,
        id: result._id,//dali e avtor na konkretna publikaciq
        token: result.accessToken//za da pravim otorizirani zaqvki
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));

}

export async function register(email, password) {//kopiran login sashtoto e
    const result = await post('/users/register', { email, password });
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));

}

export async function logout(email, password) {
    await get('/users/logout');
    sessionStorage.removeItem('userData');

}

// export {
//     get,
//     post, 
//     put,
//     del,
//     logout,
//     login,
//     register
// }