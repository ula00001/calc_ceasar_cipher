import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { removeFromFavorites } from '../../actions/shopActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import emptyFavorite from '../../images/no_favorites2.png'


// Favorite ITEM STYLES
const FavoriteItemWrapper = styled('div')`
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  border: 1px solid rgb(216,210,207);
  margin-bottom: 15px;
  cursor: pointer;
  &:hover{
    box-shadow: 0px 0px 3px 3px rgba(0,0,0,.1);
  } ;
  transition: 0.3s
;
  // min-width: 100%;
  min-width: 270px;
`
const FavoriteInfoDiv = styled('div')`
  display: flex;
`
const FavoriteActionsDiv = styled('div')`
  display: flex;
`
const FavoriteItemDiv = styled('div')`
  margin: 10px;
`
const FavoriteItemImg = styled('img')`
  width: 50px;
  height: 50px;
  object-fit: contain;
`
const FavoriteItemTitle = styled('p')`
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const FavoriteItemPrice = styled('h3')`
  font-size: 12px;
  display:flex;
  margin-top: 0;
`
const FavoriteWrapperTop = styled('div')`
  display: flex;
  justify-content: space-between;
`
const FavoriteWrapperBottom = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`
const FavoriteWrapperBottomLeft = styled('div')`

`
const FavoriteTitle = styled('h3')`
  display: flex;
  justify-content: center;
  color: purple;
  align-items:center;
  margin: 10px 0 15px 0;
`
const EmptyFavorite= styled('img')`
  max-width: 300px;
`

const FavoriteButtonWrapper = styled('div')`
  position: absolute;
  left: -75px;
`
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const FavoritesItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <FavoriteItemWrapper>

      <FavoriteWrapperTop>
        <FavoriteInfoDiv>
          <FavoriteItemDiv>
            <FavoriteItemImg src={product.image} />
          </FavoriteItemDiv>
          <FavoriteItemTitle>{product.title}</FavoriteItemTitle>
        </FavoriteInfoDiv>

        <FavoriteActionsDiv>
          <Button>
            <FavoriteIcon
              onClick={() => dispatch(removeFromFavorites(product))}
              sx={{ color: 'red' }} />
          </Button>
        </FavoriteActionsDiv>
      </FavoriteWrapperTop>

      <FavoriteWrapperBottom>
        <FavoriteWrapperBottomLeft>
          <FavoriteItemPrice>Price: ${product.price}</FavoriteItemPrice>
        </FavoriteWrapperBottomLeft>
      </FavoriteWrapperBottom>

    </FavoriteItemWrapper>
  )
}

const Favorites = () => {
  const [expanded, setExpanded] = useState(false);
  const products = useSelector((state) => state.shop.favorites);
   const [open, setOpen] = useState(false);


  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = () => ({
    maxWidth: '320px',
    position: 'absolute',
    top: 70,
    right: 140,
    // left: 0,
    zIndex: 1000,
    border: '1px solid rgb(216,210,207)',
    borderRadius: '8px',
    p: 1,
    color: '#000',
    bgcolor: 'background.paper',
    overflow: 'scroll',
    height: '500px',
    '::-webkit-scrollbar': {
      width: '10px'
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgb(216,210,207)',
      borderRadius: '10px'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#888'
    },
  });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{
        position: 'relative',

      }}>
        <FavoriteButtonWrapper onClick={handleClick}>
          <IconButton aria-label="cart" onClick={() => setExpanded(!expanded)}>
            <StyledBadge badgeContent={products.length} color="secondary">
              <FavoriteIcon sx={{fontSize: '40px', color: '#fff'}}/>
            </StyledBadge>
          </IconButton>
        </FavoriteButtonWrapper>
        {open ? (
          <Box sx={[styles, { padding: '5px 10px', right: {xs:'-8px', sm: '0px', lg: '140px'}}]}>
            <FavoriteTitle><FavoriteIcon sx={{marginRight: '5px'}}/>Favorites</FavoriteTitle>
            {
              products.length !== 0 ?
              products && products.map((product) => (
                <FavoritesItem product={product} key={product.id} />
              ))
                : <EmptyFavorite src={emptyFavorite} alt='empty favorite' />
            }
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  )
}

export default Favorites;