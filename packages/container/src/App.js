import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import {mount} from 'marketing/MarketingApp';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
import { StylesProvider,createGenerateClassName } from '@material-ui/core';

//console.log(mount);//reference to html element and displays it
//mount is not a react component
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});
export default () => {
    return (
        
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header/>
                    <MarketingApp />
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}