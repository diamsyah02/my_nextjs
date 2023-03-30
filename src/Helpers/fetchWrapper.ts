import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    delete: _delete,
    auth
};

async function get(url: string, token: string) {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: authHeader(url, token)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

 async function post(url: string, body: any, token: string) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(url, token),
        body: JSON.stringify(body)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

async function _delete(url: string, token: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url, token)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

async function auth(url: string, body: any) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(url, ''),
        body: JSON.stringify(body)
    };
    return await (await fetch(publicRuntimeConfig.apiURL + url, requestOptions)).json();
}

function authHeader(url: string, token: string) {
    let headers: HeadersInit = new Headers()
    headers.set('Content-Type', 'application/json')
    if(token != '') headers.set('authorization', `Bearer ${token}`)
    return headers
}