import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { Box, Image, SimpleGrid, Text, Divider, Button, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { Favorite, FavoriteBorder, Info } from '@mui/icons-material';
import StarRatings from 'react-star-ratings';

import Comment from '../components/Comment';
import ReviewModal from '../components/ReviewModal';
import { useCartContext } from '../contexts/CartContext';
import { useUserContext } from '../contexts/UserContext';
import useGetFavoriteStatus from '../hooks/useGetFavoriteStatus';
import { getProductById } from '../services/ProductServices';
import { addFavorite, deleteFavorite } from '../services/UserServices';
import { getCommentByProductId } from '../services/CommentServices';
import { getRatingByProductId } from '../services/RatingServices';
import useGetUserHaveThis from '../hooks/useGetUserHaveThis';

const Product = () => {

  const toast = useToast();
  const location = useLocation();
  const { cart, setCart, refresh, setRefresh } = useCartContext();
  const { currentUser } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status] = useGetFavoriteStatus(currentUser, location.state.productId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);
  const [have] = useGetUserHaveThis(currentUser, location.state.productId);

  useEffect(() => {
    setIsFavorite(status);

    getProductById(location.state.productId)
      .then((result) => {
        setProduct(result.product);
        setSizes(result.product.sizes);
      });

    getRatingByProductId(location.state.productId)
      .then((result) => {
        var star = 0;
        result.ratings.forEach((r) => {
          star += r.rating
        });
        setRatings(star / result.ratings.length || 0);
        setRatingCount(result.ratings.length);
      });

    getCommentByProductId(location.state.productId)
      .then((result) => {
        setComments(result.comment);
      });

    cart.forEach((item) => {
      if (item.id === location.state.productId) {
        setInCart(true);
        setAmount(item.amount);
      }
    });
  }, [location.state.productId, status, cart]);

  const onClickFavorite = () => {
    if (isFavorite) {
      deleteFavorite(currentUser, location.state.productId);
      setIsFavorite(false);
    } else {
      addFavorite(currentUser, location.state.productId);
      setIsFavorite(true);
    }
  };

  const onClickAddCart = () => {
    if (selectedSize !== "") {
      const currentIndex = cart.findIndex(item => item.id === location.state.productId);
      if (currentIndex >= 0) {
        cart[currentIndex].amount += 1;
        cart[currentIndex].price = product.price * cart[currentIndex].amount;
        setAmount(amount + 1);
        setCookies('cart', cart, { path: '/' });
      } else {
        setCart([...cart, {
          id: location.state.productId,
          amount: 1,
          price: product.price
        }]);
        setCookies('cart', cart, { path: '/' });
      }
      setRefresh(!refresh);
    } else {
      toast({
        title: 'Erro!',
        description: 'Você deve escolher um tamanho.',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    }
  };

  const onClickRemoveCart = () => {
    const currentIndex = cart.findIndex(item => item.id === location.state.productId);
    if (currentIndex >= 0) {
      if (cart[currentIndex].amount === 1) {
        const newCart = new Array([]);
        cart.forEach((item, index) => {
          index !== currentIndex && newCart.push(item);
        })
        if (cart.length === 1) {
          removeCookie('cart', { path: '/' });
        } else {
          setCookies('cart', newCart, { path: '/' });
        }
        setInCart(false);
        setCart(newCart);
        setAmount(amount - 1);
      } else {
        cart[currentIndex].price -= cart[currentIndex].price / cart[currentIndex].amount;
        cart[currentIndex].amount -= 1;
        setAmount(amount - 1);
        setCookies('cart', cart, { path: '/' });
      }
    }
    setRefresh(!refresh);
  };

  const onClickWrite = () => {
    if (have) {
      onOpen(true);
    } else {
      toast({
        title: 'Erro!',
        description: 'Você deve possuir este produto para escrever uma avaliação.',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Box p={{ base: 3, md: 10 }}  >
        <Box display='flex' justifyContent='center'>
          <SimpleGrid width={1200} columns={{ base: 1, md: 2 }} >
            <Image
              width='100%'
              height='100%'
              objectFit='cover'
              src={product.imageUrl}
            />
            <Box p={3} maxWidth={600} >
              <Text fontWeight={200} >ID do Produto: {location.state.productId}</Text>
              <Text fontSize={30} >{product.name}</Text>
              <Box
                display='flex'
                alignItems='center'
                mt={2}>
                <StarRatings
                  starDimension={'20'}
                  starSpacing={'2'}
                  rating={ratings}
                  starRatedColor="#FFD700"
                  numberOfStars={5}
                  name='rating' />
                <Text fontSize={16} fontWeight={500} > | {ratingCount} avaliações</Text>
              </Box>
              <Text mt={5} mb={3} fontSize={28} fontWeight={400} color='facebook.500' >Preço: <b> {product.price}$ </b> </Text>
              <Divider />
              <Text mt={3} fontSize={20} fontWeight={500} >Tamanhos</Text>
              <Box mt={3} display='flex' >
                {
                  sizes.map((size, index) => {
                    return <Button
                      data-testid="size-btn"
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      me={3}
                      colorScheme='facebook'
                      variant={selectedSize === size ? 'solid' : 'outline'}
                      width={{ base: '25px', sm: '35px', lg: '50px' }}
                      height={{ base: '30px', sm: '40px', lg: '50px' }}
                    >{size}</Button>
                  })
                }
              </Box>
              <Box
                mt={10} mb={5}
                display='flex'
                flexDirection={{ base: 'column', sm: 'row' }}
              >
                {
                  inCart
                    ?
                    <Box display='flex' alignItems='center' width={{ base: '100%', sm: '40%' }} >
                      <Button onClick={onClickRemoveCart} disabled={amount === 0} colorScheme='facebook'>-</Button>
                      <Text fontSize={25} px={2} width={{ base: '100%', sm: '60%' }} textAlign='center' >{amount}</Text>
                      <Button onClick={onClickAddCart} colorScheme='facebook' >+</Button>
                    </Box>
                    :
                    <Button
                      data-testid="add-to-card-btn"
                      onClick={onClickAddCart}
                      my={1}
                      me={{ base: 0, md: 2 }}
                      maxWidth={530}
                      colorScheme='facebook'
                      height={10}
                      width='100%'
                    >ADICIONAR AO CARRINHO</Button>
                }
                <IconButton
                  icon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={onClickFavorite}
                  ml={1} my={1}
                  colorScheme='facebook'
                  variant='outline'
                  height={10}
                  width='50px'
                  textAlign='center'
                  display={{ base: 'none', sm: 'block' }} />
                <Button
                  my={1}
                  colorScheme='facebook'
                  variant='outline'
                  display={{ base: 'block', sm: 'none' }}
                  height={10}
                  width='100%'> ADICIONAR AOS FAVORITOS</Button>
              </Box>
              <Divider />
              <Box
                mt={3}>
                <Text fontSize={24} fontWeight={500} >Descrição</Text>
                <Box mt={3}>
                  {product.description}
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  )
}

export default Product;