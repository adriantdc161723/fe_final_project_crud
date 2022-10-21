import React, { useRef } from 'react'
import style from '../../styles/Dashboard/Dashboard.module.css';
import MainContent from './MainContent/MainContent';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const Dashboard: React.FC<any> = ({children}) => {

    const sidebarRef = useRef(null);

    return (
        <div className={style['Dashboard']}>
            <Sidebar sidebarRef={sidebarRef} />
            <Navbar sidebarRef={sidebarRef} />
            <MainContent>{children}</MainContent>
        </div>
    )
}

export default Dashboard