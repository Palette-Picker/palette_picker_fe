import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {

  return (
    <header>
      <h1>Palette Picker</h1>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/projects'>Projects</NavLink>
    </header>

  )
}

export default Header;