import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import style from '../../../../styles/Dashboard/Sidebar/Sidebar.module.css';

const SidebarMenu: React.FC<any> = ({menuItems}) => {

    const router = useRouter();
    const asPath = router.asPath;

    return (
        <ul className={style['SidebarMenu']}>
            {
                menuItems.map((menuItem, index)=>(
                    <li key={index} className={style['SidebarMenuItem']}>
                        <Link href={menuItem.href}>
                            <a className={`${style['SidebarMenuItemLink']} ${ asPath === menuItem.href && style['--SidebarMenuItemLinkActive']}`}>
                                <menuItem.icon className={style['SidebarMenuItemLinkIcon']}/>
                                <span className={style['SidebarMenuItemLinkText']} >{menuItem.linkName}</span>
                            </a>
                        </Link>
                    </li>
                ))
            }
        </ul>

    )
}

export default SidebarMenu