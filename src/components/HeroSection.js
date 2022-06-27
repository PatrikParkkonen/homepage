import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            
            <h1>Welcome!</h1>
            <p>Hi, I'm Patrik Parkkonen. I'm a student and aspiring developer.</p>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>Learn more</Button>
                
            </div>
        </div>
    )
}

export default HeroSection;