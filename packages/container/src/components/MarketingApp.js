import {mount} from 'marketing/MarketingApp';
import React,{useRef,useEffect} from 'react';

export default () => {
    const ref = useRef(null);
    useEffect(()=>{
        //reference to the html element this passes the reference for 11 - div and pass it to marketing application
        mount(ref.current);
    },[]);

    return (<div ref={ref} />);
}

