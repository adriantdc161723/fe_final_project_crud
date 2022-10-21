import React, {useEffect} from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store/store'
import { useRouter } from 'next/router'

const DashboardLayout: React.FC<any> = ({children}) => {

    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);
    
    useEffect(()=> {
         !auth.isAuthenticated && router.push('/login');
    },[])

    // let auth = { isAuthenticated: false, accessToken: null, userId: null, username: null };



    //  useEffect(()=> {
    //     if(localStorage.getItem('auth')){
    //             auth = JSON.parse(localStorage.getItem('auth'));
    //     }

    //     !auth.isAuthenticated && router.push('/login');
    // },[])

    return (
        <Dashboard>
            {children}
        </Dashboard>
    )
}

export default DashboardLayout