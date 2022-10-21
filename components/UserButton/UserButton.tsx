import Link from 'next/link';
import React, {useRef, useEffect} from 'react'
import { BiHome, BiLogOut, BiUser } from 'react-icons/bi';
import style from '../../styles/UserButton/UserButton.module.css';

import { useSelector, useDispatch } from 'react-redux'
import { unsetAuth } from '../../redux/slice/authSlice';
import type { RootState } from '../../redux/store/store'
import { useRouter } from 'next/router';

const UserButton: React.FC<any> = () => {

    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    // let auth = { isAuthenticated: false, accessToken: null, userId: null, username: null };
    // useEffect(()=>{
    //     auth = JSON.parse(localStorage.getItem('auth'));
    // },[])

    const onClickLogoutLink = () => {
        router.push('/');
        dispatch(unsetAuth());
        const unsetAuthFromLS = { isAuthenticated: false, accessToken: null, userId: null, username: null };
        localStorage.setItem('auth', JSON.stringify(unsetAuthFromLS));
    }


    return (
        <div className={style['UserButton']}>
            <div className={style['UserButtonDpBox']}>
                <div className={style['UserButtonDp']}>
                    <img src='/userdefaultpicture.jpg' />
                </div>
            </div>
            {/* <div className={style['UserButtonLabel']}>
                @adriandc1723
            </div> */}
            <div className={style['UserButtonSubMenuBox']}>
                <ul className={style['UserButtonSubMenu']}>
                    <li className={style['UserButtonSubMenuItem']}>
                        <Link href='/profile'>
                            <a className={style['UserButtonSubMenuItemLink']} href='#'>
                                <BiUser className={style['UserButtonSubMenuItemLinkIcon']} />
                                <span className={style['UserButtonSubMenuItemLinkText']}>{auth.username ? auth.username : "Profile"}</span>
                            </a>
                        </Link>
                    </li>
                    <li className={style['UserButtonSubMenuItem']}>
                        <Link href='/'>
                            <a className={style['UserButtonSubMenuItemLink']} href='#'>
                                <BiHome className={style['UserButtonSubMenuItemLinkIcon']} />
                                <span className={style['UserButtonSubMenuItemLinkText']}>Home</span>
                            </a>
                        </Link>
                    </li>
                    <li className={style['UserButtonSubMenuItem']}>
                        <a onClick={onClickLogoutLink} className={style['UserButtonSubMenuItemLink']}>
                            <BiLogOut className={style['UserButtonSubMenuItemLinkIcon']} />
                            <span className={style['UserButtonSubMenuItemLinkText']}>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserButton