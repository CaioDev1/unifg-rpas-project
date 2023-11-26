import { Box, Button, ChakraProvider, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useCartContext } from '../contexts/CartContext';
import { useUserContext } from '../contexts/UserContext';
import { addOrder } from '../services/OrderServices';

const FormularioCheckout = () => {
  const { currentUser } = useUserContext();
  const { cart, setCart } = useCartContext()
  const toast = useToast();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      buyer: currentUser,
      products: cart.map(cart => cart.id),
      email: '',
      creditCardNumber: '',
      expirationDate: '',
      cvv: '',
      address: '',
      zipCode: '',
    },
    onSubmit: values => {
      addOrder(values)
        .then((response) => {
          toast({
            title: 'Pedido realizado com sucesso',
            status: 'success',
            duration: 2000,
              isClosable: true,
            onCloseComplete: () => navigate('/')
          });

          setCart([])
        })
        .catch((error) => {
          toast({
            title: 'Problema ao realizar pedido',
            status: 'error',
            duration: 2000,
              isClosable: true
          });
        });
    },
    validationSchema: yup.object().shape({
      creditCardNumber: yup.string().required('Número do Cartão é obrigatório'),
      expirationDate: yup.string().required('Data de Expiração é obrigatória'),
      cvv: yup.string().length(3, 'CVV deve ter 3 dígitos').required('CVV é obrigatório'),
      address: yup.string().required('Endereço é obrigatório'),
      zipCode: yup.number().required('Código Postal é obrigatório'),
    })
  })

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} margin="0 auto" boxShadow="lg">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Checkout
        </Heading>

        <Stack spacing={4}>
          <FormControl isInvalid={touched.creditCardNumber && errors.creditCardNumber}>
            <FormLabel>Número do Cartão</FormLabel>
            <Input type="text" name='creditCardNumber' placeholder="**** **** **** ****" onChange={handleChange} />
            {touched.creditCardNumber && <FormErrorMessage>{errors.creditCardNumber}</FormErrorMessage>}
          </FormControl>

          <Stack direction={['column', 'row']} spacing={4}>
            <FormControl isInvalid={touched.expirationDate && errors.expirationDate}>
              <FormLabel>Data de Expiração</FormLabel>
              <Input name='expirationDate' type="text" placeholder="MM/AA" onChange={handleChange} />
              {touched.expirationDate && <FormErrorMessage>{errors.expirationDate}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={touched.cvv && errors.cvv}>
              <FormLabel>CVV</FormLabel>
              <Input name='cvv' type="text" placeholder="123" onChange={handleChange} />
              {touched.cvv && <FormErrorMessage>{errors.cvv}</FormErrorMessage>}
            </FormControl>
          </Stack>

          <FormControl isInvalid={touched.address && errors.address}>
            <FormLabel>Endereço</FormLabel>
            <Input name='address' type="text" placeholder="Av. Principal, 123" onChange={handleChange} />
            {touched.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={touched.zipCode && errors.zipCode}>
            <FormLabel>Código Postal</FormLabel>
            <Input name='zipCode' type="text" placeholder="12345-678" onChange={handleChange} />
            {touched.zipCode && <FormErrorMessage>{errors.zipCode}</FormErrorMessage>}
          </FormControl>

          <Button onClick={handleSubmit} size="lg">
            Finalizar Compra
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default FormularioCheckout;
