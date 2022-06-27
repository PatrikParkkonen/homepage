import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      
      <section class='social-media'>
        <div class='social-media-wrap'>
          
          <small class='website-rights'>Patrik Parkkonen © 2022</small>
          <div class='social-icons'>
         
            <Link
              class='social-icon-link github'
              to='https://github.com/PatrikParkkonen'
              target='_blank'
              aria-label='Github'
            >
              <i class='fab fa-git-square' />
            </Link>
            <Link
              class='social-icon-link linkedin'
              to='https://www.linkedin.com/in/patrik-parkkonen-443033163/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
