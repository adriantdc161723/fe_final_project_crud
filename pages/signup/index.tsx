import type { NextPage } from 'next'
import Ainput from '../../components/AInput/Ainput'
import Navbar from '../../components/Navbar/Navbar'
import Wrapper from '../../components/Wrapper/Wrapper'
import style from '../../styles/SignupPageStyle/SignupPageStyle.module.css'
import { Box, Button, Link, Spinner, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSignupUserMutation } from '../../redux/services/userApi'

const Signup: NextPage = () => {

  const router = useRouter();
  const toast = useToast();

  const [signupUser, { isLoading }] = useSignupUserMutation();

  //event handler
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const payload = {username, password, confirmPassword};

    const response = await signupUser(payload);
    const data = response.data;
    

    if(data.status === 201){

        e.target.reset();
        toast({
          position: 'bottom-right',
          title: `Success!`,
          description: "Registration Success Login now",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setTimeout(()=>{
            router.push('/login');
        },2000);

    }else{

        toast({
          position: 'bottom-right',
          title: 'Signup Error',
          description: data.message,
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
                <Ainput 
                  label='Confirm Password' 
                  name='confirmPassword' 
                  type='password' />
                <Box textAlign={"center"}>
                <Button 
                  backgroundColor={"#ffa500"} 
                  size='lg' 
                  color={"white"} 
                  display={"block"} 
                  width={"100%"} 
                  type='submit'>
                  { isLoading ? <Spinner /> : "Sign up"}
                </Button>
                </Box>
                <Box textAlign={"center"} >
                  <Link 
                    fontSize={"sm"}
                    href='#forgotPassword'
                    color={"InfoText"}>
                      Already have account? Login
                  </Link>
                </Box>
              </form>
            </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Signup
