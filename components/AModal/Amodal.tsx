import React from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'




const AModal: React.FC<any> = ({onOpen, isOpen, onClose, modalBody, title}) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {modalBody}
            </ModalBody>
        </ModalContent>
        </Modal>
    )
}


export default AModal;