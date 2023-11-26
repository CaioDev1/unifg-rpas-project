import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Td, Th, TableContainer, Button, Image, useToast, CircularProgress, useDisclosure } from '@chakra-ui/react';
import { Delete, Edit } from '@mui/icons-material';

import { deleteProduct, getAllProducts } from '../services/ProductServices';
import ProductEditModal from '../components/ProductEditModal';


const ProductsforAdmin = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const toast = useToast();

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.allProducts);
      });
  }, []);

  const onClickEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    onOpen(true);
  };

  const onClickDelete = (id) => {
    deleteProduct(id)
      .then((result) => {
        if (result.status) {
          toast({
            title: 'Erro!',
            description: 'Algo deu errado.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Excluído!',
            description: 'Produto excluído com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        }
      })
  };

  const onClickAdd = () => {
    setIsEdit(false);
    onOpen(true);
  };

  if (products.length > 0) {
    return (
      <Box>
        <TableContainer p={3} >
          <Table variant='striped' >
            <Thead>
              <Tr>
                <Th>Imagem</Th>
                <Th>Id</Th>
                <Th>Nome</Th>
                <Th>Cor</Th>
                <Th>Gênero</Th>
                <Th>Preço</Th>
                <Th><Button colorScheme='facebook' onClick={onClickAdd} >Adicionar Novo</Button></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                products.map((product) => {
                  return (
                    <Tr key={product._id}>
                      <Td><Image width={70} height={100} src={product.imageUrl} /></Td>
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>{product.color}</Td>
                      <Td>{product.gender}</Td>
                      <Td>{product.price} $</Td>
                      <Td>
                        <Button onClick={() => onClickEdit(product._id)} colorScheme='facebook'><Edit /></Button>
                        <Button onClick={() => onClickDelete(product._id)} bg='whitesmoke' color='facebook.500'><Delete /></Button>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
        <ProductEditModal isOpen={isOpen} onClose={onClose} isEdit={isEdit} currentId={currentId} />
      </Box>
    )
  } else {
    return (
      <Box alignItems='center' display='flex' justifyContent='center' width='100%' minHeight='40vh' >
        <CircularProgress isIndeterminate color='facebook.500' />
      </Box>
    )
  }

}

export default ProductsforAdmin;
