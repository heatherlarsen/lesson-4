import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = (props) => {

  return (
    <header>
      <Link to='/'>
	      <h1>
	        <span className='car-word'>Pauline's</span>
	        <span className='cdr-word'>Perfect Patisserie</span>
	      </h1>
      </Link>
      <div className='header-links cf'>
        <Link to='/' className='header-list'>Pastry List</Link>
        <Link to='/order' className='header-basket'>Basket</Link>
      </div>
    </header>
  )
}

export default Header
