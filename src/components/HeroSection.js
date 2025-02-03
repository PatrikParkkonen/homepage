import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            
            <h1>Welcome!</h1>
            <p>Hi, I'm Patrik Parkkonen. I'm an aspiring developer from Finland with a bachelor's degree in information technology. Here you can find some basic information about me, as well as my resume and some little games I'm working on.</p>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>Learn more about me</Button>
                
            </div>
        </div>
    )
}

export default HeroSection;