import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    delete: _delete
};

async function get(url: string) {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: authHeader(url)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

 async function post(url: string, body: any) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(url),
        body: JSON.stringify(body)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

async function _delete(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

function authHeader(url: string) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiURL);
    let headers: HeadersInit = new Headers()
    headers.set('Content-Type', 'application/json')
    if (isLoggedIn && isApiUrl) headers.set('Authorization', `Bearer ${user.token}`)
    return headers
}