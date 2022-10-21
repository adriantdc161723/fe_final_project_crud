import React from 'react';
import style from '../../../styles/Dashboard/Navbar/Navbar.module.css';
import SidebarStyle from '../../../styles/Dashboard/Sidebar/Sidebar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import UserButton from '../../UserButton/UserButton';
import CartButton from '../../CartButton/CartButton';

const Navbar: React.FC<any> = ({sidebarRef}) => {

    const onClickNavbarBtnToggle = () => {
        sidebarRef.current.classList.add(SidebarStyle['--SidebarExpand']);
    }

    return (
        <nav className={style['Navbar']}>
            <button onClick={onClickNavbarBtnToggle} className={style['NavbarBtnToggle']}>
                <GiHamburgerMenu/>
            </button>
            <UserButton />
            <CartButton />
        </nav>
    )
}

export default Navbar