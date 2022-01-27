//console.log('hi from bootstrap marketing!');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Mount function to startup the app

//case 1 - development and isolation we will mount immediately
const mount = (htmlElement) => {
    // ReactDOM.render(
    //     <h1>Hi There</h1>,
    //     htmlElement
    // )
    ReactDOM.render(<App/>,htmlElement)
}

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot) {
        mount(devRoot);
    }
}

//case 2 - we are running through container and export this mount function.
export {mount};