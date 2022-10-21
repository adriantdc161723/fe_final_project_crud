import React, { useRef, useEffect, useState } from "react";
import styles from '../../styles/Ainput/Ainput.module.css';
import type { Ainput, Ainput } from "../../types/Ainput/Ainput.types";

const Ainput: React.FC<Ainput> = ({name, type, label, value}) => {

    const AinputRef = useRef(null);
    const AinputFieldRef = useRef(null);
    const [inputValue, setInputValue] = useState(value);

    const onChangeAinputField = (e) => {
        setInputValue(()=> e.target.value);
    }

    const onBlurAinputField = (e) => {
        e.target.value
            ? AinputRef.current.classList.add(styles['--AinputFocused'])
            : AinputRef.current.classList.remove(styles['--AinputFocused']) 
    }

    useEffect(()=> {
        value
            ? AinputRef.current.classList.add(styles['--AinputFocused'])
            : AinputRef.current.classList.remove(styles['--AinputFocused']) 
    });

    return (
        <div ref={AinputRef} className={styles['Ainput']}>
            <label className={styles['AinputLabel']}>{label}</label>
            <input 
                onChange={onChangeAinputField}
                onBlur={onBlurAinputField} 
                ref={AinputFieldRef} 
                className={styles['AinputInputField']} 
                type={type}
                name={name}
                id={name} 
                value={inputValue}/>
        </div>
    )
}

export default Ainput