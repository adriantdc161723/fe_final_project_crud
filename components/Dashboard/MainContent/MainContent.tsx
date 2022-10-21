import React from 'react'
import style from '../../../styles/Dashboard/MainContent/MainContent.module.css'

const MainContent: React.FC<any> = ({children}) => {
    return(
        <main className={style['MainContent']}>
            {children}
        </main>
    )
};

export default MainContent