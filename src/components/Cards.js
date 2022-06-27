import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
    return (
        <div className='cards'>
            <h1>Text paragraph lmao</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                    <CardItem src="images/img-1.jpg" text="Explore these nuts" label='Lmao' path='/aboutme' />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;