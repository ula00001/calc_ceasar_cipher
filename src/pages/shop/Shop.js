import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from "@mui/material";
import { addToBasket } from '../../actions/shopActions';
import {
  fetchAllProducts,
  fetchBySort,
  fetchAllCategories,
  fetchByCategory,
  setFavorites,
} from '../../actions/shopActions';

import ProductItem from '../../components/shop/ProductItem';
import ErrorPage from '../404';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';


const Selects = styled('div')`
  display: flex;
`
const Shop = () => {
  const [sortValue, setSortValue] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const products = useSelector(state => state.shop.products);
  const loadingStatus = useSelector(state => state.shop.productsLoadingStatus);
  const allCategories = useSelector(state => state.shop.all_categories);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch])


  const changeSort = (event) => {
    setSortValue(event.target.value);
    dispatch(fetchBySort(event.target.value))
  };
  const changeCategory = (event) => {
    setCategory(event.target.value);
    dispatch(fetchByCategory(event.target.value))
  };

  const onAddToBasket = (product) => {
    dispatch(addToBasket(product));
  }
 if (loadingStatus === 'error') {
    return <ErrorPage />;
  }

  return (
    <Container maxWidth='xl'>
      <Selects>
        <Box sx={{ minWidth: 120, margin: '15px 0px'}}>
          {
            loadingStatus !== 'loading' ?
           ( <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>SORT BY</InputLabel>
            <Select
              sx={{ height: '50px' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortValue}
              label="Sort by"
              onChange={changeSort}
            >
              <MenuItem value={'asc'} sx={{fontSize: '14px'}}>ASC</MenuItem>
              <MenuItem value={'desc'} sx={{fontSize: '14px'}}>DESC</MenuItem>
            </Select>
              </FormControl>)
              : (<Skeleton
                  variant="rectangular"
                  animation='wave'
                  maxwidth={120}
                  height={50}
                  sx={{
                    m: 1,
                    borderRadius: '4px'
                  }}
                />)
          }
        </Box>

        <Box sx={{ minWidth: 120, margin: '15px 0px' }}>
          {
            loadingStatus !== 'loading' ?
            (<FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>CATEGORY</InputLabel>
            <Select
              sx={{ height: '50px' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={changeCategory}
            >
              <MenuItem value={'all'} >All</MenuItem>
              {
                allCategories.map((item, i) => (
                  <MenuItem value={item} key={i} sx={{textTransform: 'capitalize', }}>{item}</MenuItem>
                ))
              }
            </Select>
            </FormControl>)
              : (<Skeleton
                  variant="rectangular"
                  animation='wave'
                  maxwidth={120}
                  height={50}
                  sx={{
                    m: 1,
                    borderRadius: '4px'
                  }}
                />)
          }
        </Box>

      </Selects>
      <Grid container rowSpacing={10} spacing={2} columns={12}>
        {
          loadingStatus === 'loading'?
          Array.from(new Array(20)).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
              {
                <ProductItem loadingStatus={loadingStatus} />
              }
            </Grid>
          ))
          :
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={product.id}>
              {
                <ProductItem product={product} onAddToBasket={() => onAddToBasket(product)} setFavorites={() => dispatch(setFavorites(product))} loadingStatus={loadingStatus} key={product.id}/>
              }

          </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Shop;