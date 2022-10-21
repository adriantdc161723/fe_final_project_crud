import { Box, Button, useToast, Text } from '@chakra-ui/react'
import React from 'react'
import { useDeleteCartItemMutation } from '../../../redux/services/cartApi';


const DeleteCartItemModalBody: React.FC<any> = ({cartId, productName, onClose}) => {

    const [deleteCart] = useDeleteCartItemMutation()

    const toast = useToast();

    //handle click
    const onClickToggle = async () => {
        const response = await deleteCart(cartId);

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
                Are you sure you want to remove
                <strong> {productName} </strong> from your cart?</Text>
            <Button
                onClick={onClickToggle}
                marginBottom={"2"}
                width={"100%"}
                backgroundColor={"#ffa500"}
            >Remove</Button>
            <Button
                onClick={onClose}
                width={"100%"}
                colorScheme={"blackAlpha"}
            >Cancel</Button>
        </Box>
    )
}

export default DeleteCartItemModalBody