import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {

  return (
    <header>
      <h1>Palette Picker</h1>
      <NavLink exact activeClassName="active" className="nav-link" to='/'>Home</NavLink>
      <NavLink activeClassName="active" className="nav-link" to='/projects'>Projects</NavLink>
    </header>

  )
}

export default Header;