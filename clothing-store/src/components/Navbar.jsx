import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    // remove state token
    setToken('');
    // clear cart Item
    setCartItems({});
    // naviage to login page
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} alt='logo' className='w-36' />
      </Link>

      {/* Menu bar for medium and large display */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* User menu */}
      <div className='flex items-center gap-6'>
        <img
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          onClick={() => setShowSearch(true)}
        />

        <div className='group relative'>
          <img
            src={assets.profile_icon}
            className='w-5 cursor-pointer'
            onClick={() => (token ? null : navigate('/login'))}
          />

          {/* Dropdown, onyl display when logged in*/}
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black py-1'>
                  My Profile
                </p>
                <p
                  className='cursor-pointer hover:text-black py-1'
                  onClick={() => navigate('/orders')}
                >
                  Orders
                </p>
                <p
                  className='cursor-pointer hover:text-black py-1'
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart with counter */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart icon' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Small display menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='Menu icon'
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img
              className='h-4 rotate-180'
              src={assets.dropdown_icon}
              alt='Dropdown icon'
            />
            <p>Back</p>
          </div>

          <NavLink
            to='/'
            className='py-2 pl-6 border'
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to='/collection'
            className='py-2 pl-6 border'
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to='/about'
            className='py-2 pl-6 border'
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to='/contact'
            className='py-2 pl-6 border'
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
