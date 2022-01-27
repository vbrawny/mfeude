import React from 'react';
//import {mount} from 'marketing/MarketingApp';
import MarketingApp from './components/MarketingApp';

//console.log(mount);//reference to html element and displays it
//mount is not a react component

export default () => {
    return (
        <div>
            <h1>Hi from Container!</h1>
            <hr/>
            <MarketingApp/>
        </div>
    )
}