import React, { useRef, useState } from "react"
import styles from "../../../styles/Navbar/Navbar.module.css";
import Link from "next/link";
import { NavbarMenu } from "../../../types/Navbar/Navbar.types";
import { useRouter } from "next/router";


const NavbarMenu: React.FC<NavbarMenu> = ({menuRef, menuItems = []}) => {
    const router = useRouter();
    return(
        <ul ref={menuRef} className={styles['navbarMenu']}>
            {
                menuItems.map( (menuItem, index) => (
                    <li key={index} className={styles['navbarMenuItem']}>
                        <Link href={menuItem.href}>
                            <a className={`${styles['navbarMenuLink']} ${ router.asPath === menuItem.href && styles['--navbarMenuLinkActive']}`}>
                                <menuItem.icon className={styles['navbarMenuLinkIcon']} />
                                <span className={styles['navbarMenuLinkText']}> {menuItem.linkName} </span>
                            </a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default NavbarMenu