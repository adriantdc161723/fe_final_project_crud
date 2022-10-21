import React, {useEffect} from 'react'
import style from '../../styles/CartButton/CartButton.module.css'
import { BiShoppingBag } from 'react-icons/bi'
import { useGetAllCartByUserIdQuery } from '../../redux/services/cartApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import Link from 'next/link'
import { Box, Spinner, Text } from '@chakra-ui/react'
import CartItem from '../Cart/Cart'

const CartButton: React.FC<any> = () => {

    const auth = useSelector((state: RootState) => state.auth);

    // let auth = { isAuthenticated: false, accessToken: null, userId: null, username: null };
    // useEffect(()=>{
    //     auth = JSON.parse(localStorage.getItem('auth'));
    // },[])

    const handleSubMenuClick = (e) => {
        e.stopPropagation();
    }

    const {data, error, isLoading} = useGetAllCartByUserIdQuery(auth.userId);
    // const cartItems = data.response || 0;
    return(
        <Link href='/cart'>
            <div className={style['CartButton']}>
                <div className={style['CartButtonIconBox']}>
                    <span className={style['CartButtonCounter']}>
                        {
                            error
                                ? "0"
                                : isLoading
                                    ? "0"
                                    : data.count
                        }
                    </span>
                    <BiShoppingBag className={style['CartButtonIcon']} />
                </div>
                <div onClick={handleSubMenuClick} className={style['CartButtonSubmenu']}>
                    <Box borderBottom="1px solid rgba(0,0,0,0.15)" paddingBlock={"1.5"}>
                        <Text fontWeight="bold">My Cart</Text>
                    </Box>

                    {/* Cart items */}
                    <Box paddingBlock={"1.5"}>
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
                </div>
            </div>
        </Link>
    )
}

export default CartButton