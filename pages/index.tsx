import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar/Navbar'
import Wrapper from '../components/Wrapper/Wrapper'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <img src='/banner.jpg' width='100%'/>
        {/* <Box 
          padding={'10'}>

            <Box 
              borderRadius={"lg"}
              textAlign={"center"}>
              <Text 
                fontSize={"3xl"}
                fontWeight={'bold'}>Welcome!</Text>
            </Box>

        </Box> */}
      </Wrapper>
    </>
  )
}

export default Home
