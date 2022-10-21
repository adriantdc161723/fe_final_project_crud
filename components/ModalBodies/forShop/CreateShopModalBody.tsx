import { Box, Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useCreateShopMutation } from '../../../redux/services/ShopApi'
import Ainput from '../../AInput/Ainput'


const CreateShopModalBody: React.FC<any> = () => {

    const [createShop, {isLoading}] = useCreateShopMutation();

    const toast = useToast();


    const onSubmitCreateShopForm = async (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const address = e.target.address.value;
        const business_type = e.target.business_type.value;

        const payload = {name, address, business_type};

        const response = await createShop(payload);
        

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
                    type='text' />
                <Ainput 
                    label='Shop address' 
                    name='address'
                    type='text' />
                <Ainput 
                    label='Business type' 
                    name='business_type'
                    type='text' />
                <Button
                type='submit'
                width={"100%"}
                backgroundColor={"#ffa500"}>Create Shop</Button>
            </form>
        </Box>
    )
}

export default CreateShopModalBody