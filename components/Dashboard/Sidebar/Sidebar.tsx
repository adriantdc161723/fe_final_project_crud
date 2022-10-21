import React, { useRef } from 'react'
import style from '../../../styles/Dashboard/Sidebar/Sidebar.module.css';
import * as BiIcon from 'react-icons/bi'; 
import SidebarMenu from './SidebarMenu/SidebarMenu';

const MENU_ITEMS = [
    {linkName: "Profile", href: "/profile", icon: BiIcon.BiUser},
    {linkName: "Products", href: "/products", icon: BiIcon.BiBox},
    {linkName: "Shops", href: "/shops", icon: BiIcon.BiShoppingBag},
    {linkName: "Transactions", href: "#transactions", icon: BiIcon.BiDollar}
]

const Sidebar: React.FC<any> = ({sidebarRef}) => {

    const onClickSidebar = (e) => {
        sidebarRef.current.classList.remove(style['--SidebarExpand'])
        e.stopPropagation();
    }

    return (
        <aside onClick={onClickSidebar} ref={sidebarRef} className={style['Sidebar']}>
            <div className={style['SidebarLogo']}>
                {/* <img src='/a-shop-logo-black.png' /> */}
            </div>

            <SidebarMenu menuItems={MENU_ITEMS} />
       
        </aside>
    )
}

export default Sidebar