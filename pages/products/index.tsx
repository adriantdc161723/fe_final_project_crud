import { Box, Button, SimpleGrid, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next'
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useGetAllProductsQuery } from '../../redux/services/productApi';
import Product from '../../components/Product/Product';
import { BiPlus } from 'react-icons/bi';
import AModal from '../../components/AModal/Amodal';
import AddProductModalBody from '../../components/ModalBodies/forProduct/AddProductModalBody';


const Products: NextPage = () => {

  const { data = [], isLoading, error } = useGetAllProductsQuery();

  const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <DashboardLayout>
        {/* Header Section*/}
      <Box 
        padding={"5"}
        borderBottom={"1px solid rgba(0,0,0,0.1)"}
        >
        <Text 
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"#ffa500"}
        >Product
        </Text>
        <Text >View all listed products here.</Text>

        
        {/* Buttona for creating product */}
        <Box textAlign={"end"}>
            <Button
            onClick={onOpen}
            colorScheme={"gray"}> <BiPlus/>Add Product</Button>
        </Box>

      </Box>

      {/* product Section */}
      <Box 
        padding={"5"}
        >
          <SimpleGrid columns={[1, 2, 3]} spacing='24px'>
              {
                error
                  ? <Spinner />
                  : isLoading
                      ? <Spinner />
                      : data.response.map( product => ( 
                        <Product key={product.id} productObject={product} />
                      ) )
              }
          </SimpleGrid>
        
      </Box>
      
        {/* Modal */}
        <AModal 
        title="Add product"
        isOpen={isOpen} 
        onOpen={onOpen} 
        onClose={onClose}
        modalBody={<AddProductModalBody/>}/>

    </DashboardLayout>
  )
}

export default Products