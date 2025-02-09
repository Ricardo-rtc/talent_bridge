
export const usuarioAutenticado = () =>  {
    return localStorage.getItem('token') !== null
};

export const parseJwt = () => {

    let base64 = localStorage.getItem('token').split('.')[1];

    return JSON.parse( window.atob(base64));
};