import { Box, Button, useToast, Text } from '@chakra-ui/react'
import React from 'react'
import { useInvalidateCartMutation } from '../../../redux/services/cartApi';
import { useInvalidatesProductMutation } from '../../../redux/services/productApi';
import { useToggleShopActivationMutation} from '../../../redux/services/ShopApi'

const ToggleShopModalBody: React.FC<any> = ({name, id, business_type, address, onClose, is_active}) => {

    const [toggleShop, {isLoading}] = useToggleShopActivationMutation();

    //invalidator query for product
    const [invalidateProducts] = useInvalidatesProductMutation();

    //invalidator query for cart
    const [invalidateCart] = useInvalidateCartMutation();

    const toast = useToast();

    //handle click
    const onClickToggle = async () => {
        const response = await toggleShop(id);

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
            await invalidateProducts();
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
                <strong> {name} </strong>?</Text>
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

export default ToggleShopModalBody