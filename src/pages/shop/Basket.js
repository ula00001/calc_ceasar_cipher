import {useState, useEffect, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { removeFromBasket, addQuantity, removeQuantity } from '../../actions/shopActions';
import emptyBasket from '../../images/empty_basket.png';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';

// BAsKET ITEM STYLES
const BasketItemWrapper = styled('div')`
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  border: 1px solid rgb(216,210,207);
  // margin-bottom: 15px;
  // cursor: pointer;
  &:hover{
    box-shadow: 0px 0px 3px 3px rgba(0,0,0,.1);
  } ;
  transition: 0.3s
;
  width: 100%;
`
const BasketInfoDiv = styled('div')`
  display: flex;
  cursor: pointer;
`
const BasketActionsDiv = styled('div')`
  display: flex;
`
const BasketItemDiv = styled('div')`
  margin: 10px;
`
const BasketItemImg = styled('img')`
  width: 50px;
  height: 50px;
  object-fit: contain;
`
const BasketItemTitle = styled('p')`
  font-size: 14px;
  max-width: 74px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const BasketItemPrice = styled('h3')`
  font-size: 12px;
  display:flex;
  // margin: 0;
`
const BasketItemQuantity = styled('h3')`
  font-size: 12px;
  display: flex;
  margin: 0;
`

const BasketWrapperTop = styled('div')`
  display: flex;
  flex-wrap: wrap;
`
const BasketWrapperBottom = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`
const BasketWrapperBottomLeft = styled('div')`

`
const BasketWrapperBottomRight = styled('div')`
  display: flex;
  align-items: end;
`
const BasktetItemTotal = styled('h3')`
  font-size: 12px;
`

const EmptyBasket = styled('img')`
  max-width: 400px;
`
const TotalPrice = styled('h3')`
  padding: 20px 0px;
  background: rgb(254,245,208);
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  position: sticky;
  bottom: 0;
  margin-top: 4px;
`
const BasketTitle = styled('h3')`
  display: flex;
  justify-content: center;
  color: purple;
  align-items:center;
  margin: 0;
`
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <BasketItemWrapper>

      <BasketWrapperTop sx={{flexWrap: {sm: 'nowrap'}}}>
        <BasketInfoDiv>
          <BasketItemDiv>
            <BasketItemImg src={product.image} />
          </BasketItemDiv>
          <BasketItemTitle sx={{marginRight: {xs: '10px'}}}>{product.title}</BasketItemTitle>
        </BasketInfoDiv>

        <BasketActionsDiv>
          <Button
            size="large"
            onClick={() => dispatch(addQuantity(product))}
          ><AddIcon sx={{ fontSize: 'medium' }} /></Button>
          <Button
            size="small"
            onClick={() => dispatch(removeQuantity(product))}
          ><RemoveIcon sx={{ fontSize: 'medium' }} /></Button>
          <Button>
            <DeleteIcon
              onClick={() => dispatch(removeFromBasket(product))}
              sx={{ color: 'red' }} />
          </Button>
        </BasketActionsDiv>

      </BasketWrapperTop>

      <BasketWrapperBottom>
        <BasketWrapperBottomLeft>
          <BasketItemQuantity>Quantity: {product.count}</BasketItemQuantity>
          <BasketItemPrice>Price: ${product.price}</BasketItemPrice>
        </BasketWrapperBottomLeft>

        <BasketWrapperBottomRight>
          <BasktetItemTotal>Total: ${product.total_price}</BasktetItemTotal>
        </BasketWrapperBottomRight>
      </BasketWrapperBottom>

    </BasketItemWrapper>
  )
}

const Basket = () => {
  const products = useSelector((state) => state.shop.basket);
  const loadingStatus = useSelector(state => state.shop.productsLoadingStatus);

  const [sidebar, setSidebar] = useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSidebar({ ...sidebar, right: open });
  };

  const basketTotalPrice = useMemo(() => {
    let price = 0;
    products.map((item) => {
      price = parseFloat((price + item.total_price).toFixed(2));
    })
    return price;
  }, [products]);

  const list = (anchor) => (
    <Box
      sx={[{ width: {xs: '250px', sm: '380px'} }]}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <IconButton
        sx={{ marginTop: '10px', marginLeft: '15px' }}
        onClick={toggleDrawer(false)}
      >
        <CloseIcon sx={{ color: 'purple' }}/>
      </IconButton>
      <BasketTitle><ShoppingBasketIcon sx={{ marginRight: '5px' }} />Basket</BasketTitle>
      <List>
        {
          products.length !== 0 ?
            products.map((product) => (
              <ListItem key={product.id} sx={{border: 'none'}}>
                <BasketItem product={product} />
              </ListItem>
            ))
            : <EmptyBasket src={emptyBasket} alt="no product"/>
        }
      </List>
      <TotalPrice sx={{fontSize: {xs: '14px', sm: '16px'}}}>Total price: ${basketTotalPrice}</TotalPrice>
    </Box>
  );

  return (
    <>
      {
        loadingStatus !== 'loading' ?
        (<IconButton aria-label="cart" onClick={toggleDrawer(true)} sx={{ color: '#fff', marginRight: '30px' }}>
        <StyledBadge badgeContent={products.length} color="secondary">
          <ShoppingCartIcon sx={{fontSize: '40px'}}/>
        </StyledBadge>
          </IconButton>)
        : ( <IconButton aria-label="cart" sx={{ color: '#fff', marginRight: '30px' }}>
        < Skeleton
            variant="circular"
            animation='wave'
            width={45}
            height={45}
            // sx={{ position: 'absolute', right: '75px'  }}
        />
        </IconButton>)
      }
      <Drawer
        anchor={'right'}
        open={sidebar['right']}
        onClose={toggleDrawer(false)}
      >
        {list('right')}
      </Drawer>
    </>
  )
}

export default Basket;