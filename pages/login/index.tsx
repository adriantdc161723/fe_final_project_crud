import type { NextPage } from 'next'
import Ainput from '../../components/AInput/Ainput'
import Navbar from '../../components/Navbar/Navbar'
import Wrapper from '../../components/Wrapper/Wrapper'
import style from '../../styles/LoginPageStyle/LoginPageStyle.module.css'
import { Box, Button, Link, Spinner, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store/store'
import { setAuth, setUserDetails } from '../../redux/slice/authSlice'
import { apibaseurl } from '../api/apibaseurl'
import axios from 'axios'
import { useState } from 'react'

const Login: NextPage = () => {

  const router = useRouter();
  const dispatch = useDispatch()

  const auth = useSelector((state: RootState) => state.auth);

  const [loginState, setLoginState] = useState( { error: false, message: null } );
  const toast = useToast();

  //event handler
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const credential = { username: username, password: password };

    const response = await axios.post(apibaseurl+"login-user", credential);
    const data = await response.data;

    if(data.status === 200){

        dispatch(setAuth({isAuthenticated: true, accessToken: data.response.accessToken}));

        router.push("/profile");

        const response = await axios.post(apibaseurl+`get-user-details-by-username/${username}`,{}, {
          headers: { 'Authorization' : `Bearer ${data.response.accessToken}` }
        });

        const userdata = await response.data;
        dispatch(setUserDetails(userdata.response));

        const authToLS = { 
          isAuthenticated: true, 
          accessToken: data.response.accessToken,
          username: userdata.response.username, 
          userId: userdata.response.id};
        
        // save credential to local storage
        localStorage.setItem('auth', JSON.stringify(authToLS));

        e.target.reset();

        setLoginState(() => ({ error: false, message: null }));

        toast({
          position: 'top',
          title: `Welcome ${username}`,
          description: <Text> <Spinner /> Please wait </Text>,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

    }else{
        setLoginState(() => ({ error: true, message: data.message }))
        toast({
          position: 'bottom-right',
          title: 'Login Error',
          description: loginState.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
    }
   
  }

  return (
    <>
      <Navbar /> 
      <Wrapper>
        <div className={style['login-page-wrapper']}>
            <div className={style['form-container']}>
              <form onSubmit={onSubmitForm} className={style['form']}>
                <Ainput 
                  label='Username' 
                  name='username' 
                  type='text' />
                <Ainput 
                  label='Password' 
                  name='password' 
                  type='password' />
                <Box textAlign={"center"}>
                <Button 
                  backgroundColor={"#ffa500"} 
                  size='lg' 
                  color={"white"} 
                  display={"block"} 
                  width={"100%"} 
                  type='submit'>
                  Login
                </Button>
                </Box>
                <Box textAlign={"center"} >
                  <Link 
                    fontSize={"sm"}
                    href='#forgotPassword'
                    color={"InfoText"}>
                      Don't have account? Register
                  </Link>
                </Box>
              </form>
            </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Login
