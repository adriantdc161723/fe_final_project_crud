import { Button, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiShoppingBag, BiTrash } from 'react-icons/bi'
import style from '../../styles/Cart/Cart.module.css'
import AModal from '../AModal/Amodal'
import DeleteCartItemModalBody from '../ModalBodies/forCart/DeleteCartItemModalBody'


const CartItem: React.FC<any> = ({cartObject}) => {

    const { id: cartId } = cartObject;
    const {name: productName, price} = cartObject.productDetails;
    const {name: shopName} = cartObject.productDetails.shopDetails;

    //modal controller
    const {isOpen, onClose, onOpen} = useDisclosure();

    return (
        <>
            <div className={style['Cart']}>
                <div className={style['CartPicture']}>
                    <BiShoppingBag />
                </div>
                <div className={style['CartDetails']}>
                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#ffa500"}>{productName}</Text>
                    <Text fontSize={"md"}> <strong>P</strong>{price}</Text>
                    <Text fontSize={"small"} color={"gray.500"}> <strong>Shop: </strong>{shopName}</Text>
                </div>
                <div className={style['CartButtonsContainer']}>
                    <Button 
                        onClick={onOpen}
                        colorScheme={"gray"}>
                        <BiTrash />
                    </Button>
                </div>
            </div>

            {/* modal */}
           <AModal 
            title="Are you sure?"
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            modalBody={<DeleteCartItemModalBody cartId={cartId} productName={productName} onClose={onClose} />}
           /> 

        </>
    )
}


export default CartItem