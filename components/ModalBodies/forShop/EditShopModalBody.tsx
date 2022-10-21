import { Box, Button, useToast, Input } from '@chakra-ui/react'
import React from 'react'
import { useInvalidatesProductMutation } from '../../../redux/services/productApi'
import { useInvalidateCartMutation } from '../../../redux/services/cartApi'
import { useUpdateShopMutation } from '../../../redux/services/ShopApi'
import Ainput from '../../AInput/Ainput'


const EditShopModalBody: React.FC<any> = ({name, id, business_type, address, onClose}) => {

    const [updateShop, {isLoading}] = useUpdateShopMutation();

    //invalidator query for product
    const [invalidateProducts] = useInvalidatesProductMutation();

    //invalidator query for cart
    const [invalidateCart] = useInvalidateCartMutation();

    const toast = useToast();


    const onSubmitCreateShopForm = async (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const address = e.target.address.value;
        const business_type = e.target.business_type.value;

        const payload = {id, name, address, business_type};

        const response = await updateShop(payload);
        

        if(response.data){

            e.target.reset();
            const data = response.data;
            // throw toast
            toast({
                position: 'top',
                description: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            //invoke invalidator
            await invalidateProducts();
            await invalidateCart();
            

            //close Modal
            onClose();

        }else{
            const error = response.error.data;
            // throw toast
            toast({
                position: 'top',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }

    } 

    return(
        <Box padding={"5"}>
            <form onSubmit={onSubmitCreateShopForm}>
                    <Ainput 
                        label='Shop name' 
                        name='name'
                        type='text'
                        value={name} />
                    <Ainput 
                        label='Shop address' 
                        name='address'
                        type='text'
                        value={address}/>
                    <Ainput 
                        label='Business type' 
                        name='business_type'
                        type='text'
                        value={business_type}/>
                <Button
                type='submit'
                width={"100%"}
                backgroundColor={"#ffa500"}>Save</Button>
            </form>
        </Box>
    )
}

export default EditShopModalBody