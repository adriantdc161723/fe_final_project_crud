import React, { useRef, useState, useEffect } from "react"
import styles from "../../styles/Navbar/Navbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import type { MENU_ITEMS } from "../../types/Navbar/Navbar.types";
import NavbarMenu from "./NavbarMenu/NavbarMenu";
import * as BiIcons from "react-icons/bi"
import UserButton from "../UserButton/UserButton";
import CartButton from "../CartButton/CartButton";
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store/store'

// Items for in menu
const MENU_ITEMS: MENU_ITEMS[] = [
    { icon: BiIcons.BiHome, linkName: "Home", href: "/" },
    { icon: BiIcons.BiPencil, linkName: "Sign-up", href: "/signup" },
    { icon: BiIcons.BiLogIn, linkName: "Login", href: "/login" }
]



const Navbar: React.FC<any> = () => {

    const auth = useSelector((state: RootState) => state.auth);
   
    const navBarMenu = useRef(null);

    //handle Menu Btn show click
    const onClickMenuBtnShow = () => {
        navBarMenu.current.classList.contains(styles['--navbarMenuExpand'])
            ? navBarMenu.current.classList.remove(styles['--navbarMenuExpand'])
            : navBarMenu.current.classList.add(styles['--navbarMenuExpand'])
    }

    return(
        <nav className={styles['navbar']}>

            <div className={styles['navbarLogo']}>
                <img src="/a-shop-logo.png" />
            </div>
            {
                auth.isAuthenticated 
                    ? ( <> <UserButton /> <CartButton /> </>)
                    : (<>
                        <NavbarMenu menuRef={navBarMenu} menuItems={MENU_ITEMS} />
                        <button onClick={onClickMenuBtnShow} className={styles['navbarMenuBtnShow']}>
                            <GiHamburgerMenu />
                        </button>
                        </>
                        )
            }
        </nav>
    )
}

export default Navbar