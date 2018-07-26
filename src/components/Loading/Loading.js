import React from 'react';
import './Loading.css';
import ninjablack from './../../images/ninjablack.png';
import LoadingScreen from 'react-loading-screen';

export default function Loading (){

    return (
        <div>
             <LoadingScreen
                loading={true}
                bgColor='#f5f5f5'
                spinnerColor='#2AABE2'
                textColor='#676767'
                logoSrc={ninjablack}
                text='Our ninjas are loading your content...'/> 
        </div>
    )
}