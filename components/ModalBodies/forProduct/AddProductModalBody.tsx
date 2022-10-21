import { Box, Button, Select, useToast } from '@chakra-ui/react'
import React from 'react'
import { useAddProductMutation } from '../../../redux/services/productApi';
import { useGetAllShopsQuery } from '../../../redux/services/ShopApi';
import Ainput from '../../AInput/Ainput'


const AddProductModalBody: React.FC<any> = () => {

 
    const toast = useToast();
    const {data: shops = [], error, isLoading, isFetching} = useGetAllShopsQuery();

    const [addProduct] = useAddProductMutation();

    const onSubmitProduct = async (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const price = parseFloat(e.target.price.value);
        const shop_id = e.target.shop_id.value;

        const payload = {name, price, shop_id};

        const response = await addProduct(payload);

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
            <form onSubmit={onSubmitProduct}>
                <Ainput 
                    label='Product name' 
                    name='name'
                    type='text' />
                <Ainput 
                    label='Price' 
                    name='price'
                    type='text' />
                <Select 
                name='shop_id'
                marginBottom={"2"}>
                    {
                        isFetching
                            ? "Fetching....."
                            : shops.response.map(shop=> (
                                <option value={shop.id}>{shop.name}</option>  
                            ))
                    }
                </Select>
                <Button
                type='submit'
                width={"100%"}
                backgroundColor={"#ffa500"}>Add product</Button>
            </form>
        </Box>
    )
}

export default AddProductModalBody