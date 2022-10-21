import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { TiArrowBack } from 'react-icons/ti'
import style from '../../styles/Shop/Shop.module.css'
import AModal from '../AModal/Amodal'
import ToggleShopModalBody from '../ModalBodies/forShop/ToggleShopModalBody'
import EditShopModalBody from '../ModalBodies/forShop/EditShopModalBody'

const Shop: React.FC<any> = ({shopObject}) => {
    const {name, id, business_type, address, is_active} = shopObject;

    const shopRef = useRef(null);

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [modal, setModal] = useState({modalTitle: null, modalBody: null});

    const onClickEdit = () => {
        setModal(()=> ({modalTitle: "Edit shop", modalBody: modalBodyForEdit }) )
        onOpen();
    }


    const onClickActivation = () => {
        setModal(()=> ({modalTitle: "Shop Activation", modalBody: modalBodyForActivation}) )
        onOpen();
    }


    //modal body types
    const modalBodyForEdit =  <EditShopModalBody
                                    name={name}
                                    id={id}
                                    business_type={business_type}
                                    address={address}
                                    onClose={onClose}/>


    const modalBodyForActivation = <ToggleShopModalBody
                                    name={name}
                                    id={id}
                                    business_type={business_type}
                                    is_active={is_active}
                                    address={address}
                                    onClose={onClose}/>

    
    useEffect(()=>{
        //productRef.current.classList
        is_active 
            ? shopRef.current.classList.remove(style['--ShopDisabled'])
            : shopRef.current.classList.add(style['--ShopDisabled'])
    })

    return (
        <>

        <div ref={shopRef} className={style['Shop']}>
            <div className={style['ShopPicture']}>
                <img src='/shop-default-pic.jpg' />
            </div>
            <div className={style['ShopButtonContainer']}>
                <Button 
                disabled={!is_active}
                onClick={onClickEdit}
                marginInline={"1"} 
                colorScheme={'whatsapp'}
                size={'sm'}
                > 
                <BiEdit /></Button>

                <Button 
                onClick={onClickActivation}
                marginInline={"1"} 
                colorScheme={"gray"}
                size={'sm'}>
                    <TiArrowBack /> { is_active ? "Deactivate" : "Activate"} </Button>
            </div>
            <Box padding={"5"}>
                <Text fontSize={"2xl"} fontWeight={"bold"} color={"#ffa500"}>{name}</Text>
                <Text fontSize={"small"}> <strong>Address:</strong> {address} </Text>
                <Text fontSize={"small"}> <strong>Business Type:</strong> {business_type} </Text>
            </Box>
        </div>
        

        {/* Modal for edit shop */}
        <AModal 
        title={modal.modalTitle}
        isOpen={isOpen} 
        onOpen={onOpen} 
        onClose={onClose}
        modalBody={modal.modalBody}
        />
        </>
    )


}

export default Shop