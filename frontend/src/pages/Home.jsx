import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Container, SimpleGrid, Image, CircularProgress } from '@chakra-ui/react';
import { AccountBalanceWallet, AssignmentReturn, WorkspacePremium } from '@mui/icons-material';

import Carousel from '../components/Carousel';
import { getAllMiniImages } from '../services/ImageServices';
import { useSearchContext } from '../contexts/SearchContext';

const Home = () => {

  const navigate = useNavigate();
  const { setSearch } = useSearchContext();
  const [miniImages, setMiniImages] = useState([]);

  useEffect(() => {
    getAllMiniImages()
      .then((result) => {
        setMiniImages(result.miniImages);
      });
  }, []);

  const onClickImage = () => {
    setSearch('a');
    navigate('/search');
  }

  return (
    <Box>
      <Box display='flex' justifyContent='center' >
        <Carousel />
      </Box>
      <Box bg='facebook.500' mt={{ base: 5, md: 0 }} >
        <Container maxWidth={1200} display='flex' justifyContent='space-between' alignItems='center' flexDirection={{ base: 'column', md: 'row' }} py={7}>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column' >
            <AccountBalanceWallet sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit' >Opções de Pagamento Seguras</Text>
          </Box>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column' mt={{ base: 5, md: 0 }} >
            <AssignmentReturn sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit' >Devoluções Gratuitas por 30 Dias</Text>
          </Box>
          <Box color='#fff' alignItems='center' display='flex' flexDirection='column' mt={{ base: 5, md: 0 }} >
            <WorkspacePremium sx={{ fontSize: 50 }} color='inherit' />
            <Text mt={3} fontSize={20} fontWeight={600} color='inherit' >Garantia de Qualidade R-pas</Text>
          </Box>
        </Container>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 5 }} px={{ base: 3, md: 0 }} py={{ base: 3, md: 5 }} mt={5} maxWidth={1200} mx='auto' >
        {
          miniImages && miniImages.map((image, index) => {
            return (
              <Image
                width={300}
                height={300}
                objectFit='cover' 
                key={index}
                data-testid="cloth-dashboard-card" 
                cursor='pointer' 
                onClick={onClickImage} 
                src={image.url}
              />
            )
          })
        }
        {
          miniImages.length === 0 &&
          <>
            <Box my={20} display='flex' justifyContent='center' width='100%'>
              <CircularProgress isIndeterminate color='facebook.500' />
            </Box>
            <Box my={20} display='flex' justifyContent='center' width='100%'>
              <CircularProgress isIndeterminate color='facebook.500' />
            </Box>
          </>
        }
      </SimpleGrid>
    </Box>
  )
}

export default Home;