import { Text, Box, Spinner, Button, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { SimpleGrid} from '@chakra-ui/react'
import Shop from '../../components/Shop/Shop';

import { useGetAllShopsQuery } from '../../redux/services/ShopApi';
import { BiPlus } from 'react-icons/bi';
import AModal from '../../components/AModal/Amodal';
import CreateShopModalBody from '../../components/ModalBodies/forShop/CreateShopModalBody';

const Shops: NextPage = () => {

  const { data = [], isLoading, error } = useGetAllShopsQuery();
  const shops = data.response;


  //for AModal
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        >Shops
        </Text>
        <Text >View all listed shops here.</Text>

        {/* Buttona for creating shop */}
        <Box textAlign={"end"}>
            <Button
            onClick={onOpen}
            colorScheme={"gray"}> <BiPlus/>Create Shop</Button>
        </Box>

      </Box>

      {/* Shops Section */}
      <Box 
        padding={"5"}
        >
          <SimpleGrid columns={[1, 2, 3]} spacing='24px'>
              {
                error
                  ? <Spinner />
                  : isLoading
                      ? <Spinner />
                      : shops.map( shop => (
                        <Shop key={shop.id} shopObject={shop} />
                      ) )
              }
          </SimpleGrid>
        
      </Box>
      
      {/* Modal */}
      <AModal 
        title="Create shop"
        isOpen={isOpen} 
        onOpen={onOpen} 
        onClose={onClose}
        modalBody={<CreateShopModalBody />}/>

    </DashboardLayout>
  )
}

export default Shops