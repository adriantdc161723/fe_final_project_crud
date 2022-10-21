import { Box, Button, useToast, Text } from '@chakra-ui/react'
import React from 'react'
import { useInvalidateCartMutation } from '../../../redux/services/cartApi';
import {  useToggleProductActivationMutation } from '../../../redux/services/productApi';

const ToggleProductModalBody: React.FC<any> = ({name, id, onClose, shopName, is_active}) => {

    const [toggleProduct] = useToggleProductActivationMutation();

    //invalidator query for cart
    const [invalidateCart] = useInvalidateCartMutation();

    const toast = useToast();

    //handle click
    const onClickToggle = async () => {
        const response = await toggleProduct(id);

        if(response.data){

            const data = response.data;
            // throw toast
            toast({
                position: 'top',
                description: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            //invoke invalidates
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
        <Box textAlign={"center"} padding={"5"}>
            <Text 
            marginBottom={"5"}>
                Are you sure you want to  
                { is_active ? " Deactivate" : " Reactivate"} 
                <strong> {name} </strong> product from {shopName} ?</Text>
            <Button
                onClick={onClickToggle}
                marginBottom={"2"}
                width={"100%"}
                backgroundColor={"#ffa500"}
            >{ is_active ? "Deactive" : "Reactivate"}</Button>
            <Button
                onClick={onClose}
                width={"100%"}
                colorScheme={"blackAlpha"}
            >Cancel</Button>
        </Box>
    )
}

export default ToggleProductModalBody