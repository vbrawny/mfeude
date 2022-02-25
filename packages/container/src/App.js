import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import {mount} from 'marketing/MarketingApp';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

//console.log(mount);//reference to html element and displays it
//mount is not a react component

export default () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <MarketingApp />
            </div>
        </BrowserRouter>
    )
}