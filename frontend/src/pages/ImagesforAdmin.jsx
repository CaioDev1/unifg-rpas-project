import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Button, useToast, Divider, useDisclosure } from '@chakra-ui/react';

// Importação dos serviços relacionados a imagens
import { getAllImages, deleteImage, deleteMiniImage, getAllMiniImages } from '../services/ImageServices';

// Importação do componente modal para adicionar imagens
import AddImageModal from '../components/AddImageModal';

const ImagesforAdmin = () => {

  // Configuração do modal de adição de imagem
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estado para armazenar as imagens do carrossel
  const [carouselImages, setCarouselImages] = useState([]);

  // Estado para armazenar as miniaturas de imagens
  const [miniImages, setMiniImages] = useState([]);

  // Estado para controlar o recarregamento das imagens
  const [refresh, setRefresh] = useState(false);

  // Utilização do hook de toast do Chakra UI para exibir mensagens
  const toast = useToast();

  // Efeito para carregar as imagens ao montar o componente e quando o estado 'refresh' é alterado
  useEffect(() => {
    // Obtenção de todas as imagens do carrossel
    getAllImages()
      .then((result) => {
        setCarouselImages(result.images);
      });

    // Obtenção de todas as miniaturas de imagens
    getAllMiniImages()
      .then((result) => {
        setMiniImages(result.miniImages);
      })
  }, [refresh]);

  // Função para lidar com a exclusão de uma imagem do carrossel
  const onClickDeleteCarouselImage = (id) => {
    deleteImage(id)
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
            description: 'Imagem excluída com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        }
      });
    setRefresh(!refresh);
  };

  // Função para lidar com a exclusão de uma miniatura de imagem
  const onClickDeleteMiniImage = (id) => {
    deleteMiniImage(id)
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
            description: 'Imagem excluída com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        }
      });
    setRefresh(!refresh);
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' my={5} px={6} >
        <Text fontSize={30} fontWeight={500} color='facebook.500'>Painel de Administração de Imagens</Text>
        <Button colorScheme='facebook' onClick={onOpen} >Adicionar Imagem</Button>
      </Box>
      <Divider></Divider>
      <Box my={5} p={3}>
        <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500'> Imagens do Carrossel</Text>
        <Box display='flex' flexWrap='wrap' >
          {
            carouselImages.length > 0 && carouselImages.map((image) => {
              return (
                <Box key={image._id} minWidth={260} maxWidth={500} mx={{ base: 0, sm: 2, md: 3 }} my={3} >
                  <Image src={image.url} width='100%' height='auto' />
                  <Button onClick={() => onClickDeleteCarouselImage(image._id)} colorScheme='facebook' width='100%'>Excluir</Button>
                </Box>
              )
            })
          }
          {
            carouselImages.length === 0
            &&
            <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500' my={10} >Não há imagens no carrossel aqui.</Text>
          }
        </Box>
      </Box>
      <Box my={5} p={3}>
        <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500'> Miniaturas de Imagens</Text>
        <Box display='flex' flexWrap='wrap' >
          {
            miniImages.length > 0 && miniImages.map((image) => {
              return (
                <Box key={image._id} width={260} mx={{ base: 0, sm: 2, md: 3 }} my={3} >
                  <Image src={image.url} width='100%' height='auto' />
                  <Button onClick={() => onClickDeleteMiniImage(image._id)} colorScheme='facebook' width='100%'>Excluir</Button>
                </Box>
              )
            })
          }
          {
            miniImages.length === 0
            &&
            <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500' my={10} >Não há miniaturas de imagens aqui.</Text>
          }
        </Box>
      </Box>
      <AddImageModal isOpen={isOpen} onClose={onClose} refresh={refresh} setRefresh={setRefresh} />
    </Box>
  )
}

export default ImagesforAdmin;
