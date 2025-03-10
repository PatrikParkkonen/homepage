import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

//Creating the Navbar at the top of the site
function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const toggleDropdown = () => setDropdown(!dropdown);
    const closeDropdown = () => setDropdown(false);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/aboutme' className='nav-links' onClick={closeMobileMenu}>
                                About Me
                            </Link>
                        </li>
                        <li 
                            className='nav-item dropdown' 
                            onMouseEnter={() => setDropdown(true)} 
                            onMouseLeave={() => setDropdown(false)}
                        >
                            <Link to='/games' className='nav-links' onClick={closeMobileMenu}>
                                Games
                            </Link>
                            {dropdown && (
                                <ul className='dropdown-menu'>
                                    <li>
                                        <Link to='/wordle' className='dropdown-link' onClick={closeDropdown}>
                                            Wordle
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/connections' className='dropdown-link' onClick={closeDropdown}>
                                            Connections
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/sudoku' className='dropdown-link' onClick={closeDropdown}>
                                            Sudoku
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar