import React from 'react';
import './Footer.css';


function Footer() {
  return (
    <div className='footer-container'>
      
      <section class='social-media'>
        <div class='social-media-wrap'>
          
          <small class='website-rights'>Patrik Parkkonen © 2022-2025</small>
          <div class='social-icons'>
         
            <a
              class='social-icon-link github'
              href='https://github.com/PatrikParkkonen'
              target='_blank'
              rel='noreferrer'
              aria-label='Github'
            >
              <i class='fab fa-git-square' />
            </a>
            <a
              class='social-icon-link linkedin'
              href='https://www.linkedin.com/in/patrik-parkkonen-443033163/'
              target='_blank'
              rel='noreferrer'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
