import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, FormErrorMessage, InputGroup, Input, Text, InputRightElement, Button, Checkbox, useToast } from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';

import RegisterValidations from '../validations/RegisterValidations';
import { Register as Signup } from '../services/AuthServices';

const Register = () => {

  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, resetForm, handleBlur, touched, isValid, errors } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '0',
      terms: false
    },
    onSubmit: values => {
      if (values.phone.length === 11) {
        Signup(values.firstName, values.lastName, values.email, values.password, values.phone)
          .then(result => {
            if (result.data.newUser) {
              navigate('/login');
              toast({
                title: 'Bem-vindo ao R-pas!',
                description: 'Você se cadastrou com sucesso.',
                status: 'success',
                duration: 2000,
                isClosable: true
              });
            } else {
              resetForm();
              toast({
                title: 'Erro!',
                description: 'Este e-mail já está em uso.',
                status: 'error',
                duration: 2000,
                isClosable: true
              });
            }
          });
      } else {
        toast({
          title: 'Erro!',
          description: 'Por favor, insira um número de telefone válido.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      }

    },
    validationSchema: RegisterValidations
  });

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      mt={5}
    >
      <Box width={{ base: '100vw', sm: '500px' }} p={2}>
        <Text textAlign='center' color={'facebook.500'} fontSize={32} fontWeight={600} mb={10} >Cadastro</Text>
        <Box display='flex' flexDirection={{ base: 'column', sm: 'row' }}>
          <FormControl mt={3} width={{ base: '100%', sm: '50%' }} me={{ base: 0, sm: 2 }} isInvalid={touched.firstName && errors.firstName} >
            <FormLabel fontSize={20} >Nome</FormLabel>
            <Input
              name='firstName'
              placeholder='Digite o nome'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {touched.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
          </FormControl>
          <FormControl mt={3} width={{ base: '100%', sm: '50%' }} isInvalid={touched.lastName && errors.lastName} >
            <FormLabel fontSize={20} >Sobrenome</FormLabel>
            <Input
              name='lastName'
              placeholder='Digite o sobrenome'
              onChange={handleChange}
              value={values.lastName}
              onBlur={handleBlur}
            />
            {touched.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
          </FormControl>
        </Box>
        <FormControl mt={3} isInvalid={touched.email && errors.email} >
          <FormLabel fontSize={20} >E-mail</FormLabel>
          <Input
            name='email'
            placeholder='Digite o e-mail'
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {touched.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl mt={3} isInvalid={touched.phone && errors.phone} >
          <FormLabel fontSize={20} >Telefone</FormLabel>
          <Input
            type='tel'
            name='phone'
            maxLength={11}
            pattern='[0-9]'
            placeholder='Digite o telefone'
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
          />
          {touched.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
        </FormControl>
        <FormControl mt={3} isInvalid={touched.password && errors.password} >
          <FormLabel fontSize={20} >Senha</FormLabel>
          <InputGroup size='md'>
            <Input
              name='password'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Digite a senha'
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' variant='ghost' onClick={() => setShow(!show)}>
                {show ? <VisibilityOff /> : <Visibility />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
        </FormControl>
        <Checkbox name='terms' isChecked={values.terms} onChange={handleChange} mt={5} >Eu concordo com os <strong>Termos de Serviço</strong> e <strong>Política de Privacidade</strong>.</Checkbox>
        <Button mt={5} width='100%' variant='solid' colorScheme='facebook' disabled={!isValid} onClick={handleSubmit} >Cadastrar</Button>
        <br />
        <Text my={3} width='100%' textAlign='center' >ou</Text>
        <Button width='100%' variant='outline' colorScheme='facebook' onClick={() => navigate('/login')} >Login</Button>
      </Box>
    </Box>
  )
}

export default Register;
