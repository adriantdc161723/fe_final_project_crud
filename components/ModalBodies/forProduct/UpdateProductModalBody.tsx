import { Box, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useInvalidateCartMutation } from '../../../redux/services/cartApi';
import { useUpdateProductMutation } from '../../../redux/services/productApi';
import Ainput from '../../AInput/Ainput'


const UpdateProductModalBody: React.FC<any> = ({name, price, id, onClose}) => {

 
    const toast = useToast();

    const [updateProduct] = useUpdateProductMutation();

    const [invalidateCart] = useInvalidateCartMutation();

    const onSubmitUpdateProduct = async (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const price = parseFloat(e.target.price.value);

        const payload = {name, price, id};

        const response = await updateProduct(payload);


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

            //invalidate tags
            await invalidateCart();

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
            <form onSubmit={onSubmitUpdateProduct}>
                <Ainput 
                    label='Product name' 
                    name='name'
                    type='text' 
                    value={name}/>
                <Ainput 
                    label='Price' 
                    name='price'
                    type='text' 
                    value={price}/>
                <Button
                type='submit'
                width={"100%"}
                backgroundColor={"#ffa500"}>Update product</Button>
            </form>
        </Box>
    )
}

export default UpdateProductModalBody