import { Box, Spinner, Text } from '@chakra-ui/react';
import type { NextPage } from 'next'
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import CartItem from '../../components/Cart/Cart';

import { useSelector } from 'react-redux'
import { useGetAllCartByUserIdQuery } from '../../redux/services/cartApi'
import { RootState } from '../../redux/store/store'


const Cart: NextPage = () => {


  const user_id = useSelector((state: RootState)=> state.auth.userId);

  const { data, error , isLoading} = useGetAllCartByUserIdQuery(user_id)

  return (
    <DashboardLayout>
      {/* Header Section*/}
            <Box 
              padding={"5"}
              borderBottom={"1px solid rgba(0,0,0,0.1)"}
              >
              <Text 
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={"#ffa500"}
              >My Cart
              </Text>
              <Text >List items in your cart</Text>
            </Box>

            {/* List cart items Section */}
            <Box 
              padding={"5"}
              >
              {
                  error
                    ? <Spinner />
                    : isLoading
                        ? <Spinner />
                        : data.response.map( cartItem => (
                          <CartItem key={cartItem.id} cartObject={cartItem} />
                        ))
              }
            </Box>
    </DashboardLayout>
  )
}

export default Cart