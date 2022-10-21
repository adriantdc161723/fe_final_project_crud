import React from "react";
import styles from '../../styles/Wrapper/Wrapper.module.css';

const Wrapper: React.FC<any> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default Wrapper