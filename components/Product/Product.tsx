import { Box, Button, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { BiCartAlt, BiEdit, BiTrash } from 'react-icons/bi'
import { VscActivateBreakpoints } from 'react-icons/vsc'
import style from '../../styles/Product/Product.module.css'
import { useAddTocartMutation } from '../../redux/services/cartApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { TiArrowBack } from 'react-icons/ti'
import UpdateProductModalBody from '../ModalBodies/forProduct/UpdateProductModalBody'
import AModal from '../AModal/Amodal'
import ToggleProductModalBody from '../ModalBodies/forProduct/ToggleProductModalBody'


const Product: React.FC<any> = ({productObject}) => {

    const productRef = useRef(null);

    const {name, price, id: product_id, is_active} = productObject;
    const {name: shopName} = productObject.shopDetails;

    const user_id = useSelector((state: RootState)=> state.auth.userId);
    const [addToCart, { isLoading }] = useAddTocartMutation();


    const {isOpen, onOpen, onClose} = useDisclosure();
    const [modal, setModal] = useState({modalTitle: null, modalBody: null});

    const onClickUpdate = () => {
        setModal(()=> ({modalTitle: "Update Product", modalBody: modalBodyForUpdate }) )
        onOpen();
    }


    const onClickActivation = () => {
        setModal(()=> ({modalTitle: "Product Activation", modalBody: modalBodyForActivation}) )
        onOpen();
    }

    useEffect(()=>{
        //productRef.current.classList
        is_active 
            ? productRef.current.classList.remove(style['--ProductDisabled'])
            : productRef.current.classList.add(style['--ProductDisabled'])
    })

        //modal body types
        const modalBodyForUpdate =  <UpdateProductModalBody
                                            id={product_id}
                                            name={name}
                                            price={price}
                                            onClose={onClose}/>


        const modalBodyForActivation = <ToggleProductModalBody
                                            is_active={is_active}
                                            id={product_id}
                                            name={name}
                                            shopName={shopName}
                                            onClose={onClose} />;

    //toaster
    const toast = useToast();

    //add to cart button handler
    const onClickAddtoCart = async () => {
        const payload = {user_id, product_id}
        const response = await addToCart(payload);


        console.log( response );

        if(response.data){
            const data = response.data;
            // throw toast
            toast({
                position: 'top',
                description: data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

        }else{
            const error = response.error.data;
            // throw toast
            toast({
                position: 'top',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }


  
    }

    return (

        <>
        <div ref={productRef} className={style['Product']}>
            <div className={style['ProductPicture']}>
                <img src='/product-default-pic.jpg' />
            </div>
            <div className={style['ProductButtonContainer']}>

                <Button
                disabled={!is_active}
                onClick={onClickAddtoCart}
                marginInline={"1"}  
                size={"sm"}
                colorScheme={'orange'}> 
                <BiCartAlt /></Button>

                <Button
                onClick={onClickUpdate} 
                disabled={!is_active}
                marginInline={"1"}  
                size={"sm"}
                colorScheme={'whatsapp'}> 
                <BiEdit /></Button>

                <Button 
                onClick={onClickActivation}
                marginInline={"1"}  
                size={"sm"}
                colorScheme={'gray'}>
                    <TiArrowBack /> { is_active ? "Deactivate" : "Activate" } </Button>
            </div>
            <Box padding={"5"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} color={"#ffa500"}>{name}</Text>
                <Text fontSize={"lg"}> <strong>P</strong>{price}</Text>
                <Text fontSize={"small"}> <strong>Shop:</strong> {shopName} </Text>
            </Box>
        </div>


        {/* Modal for edit shop */}
        <AModal 
        title={modal.modalTitle}
        isOpen={isOpen} 
        onOpen={onOpen} 
        onClose={onClose}
        modalBody={modal.modalBody}/>
        </>
    )
}

export default Product