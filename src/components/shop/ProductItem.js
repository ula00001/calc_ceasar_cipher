import { styled, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Skeleton from '@mui/material/Skeleton';

const Wrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // min-width: 259px;
  padding: 16px;
  border-radius: 4px;
  font-family: 'Inter';
  font-style: normal;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 15px 0 rgba(0,0,0,.12);
  &:hover {
    box-shadow: 0 2px 15px 0 rgba(0,0,0,.3);
    transform: translateY(-4px);
  }
  transition: 0.3s;
`
const Image = styled('img')`
  width: 227px;
  height: 224px;
  border-radius: 4px;
  object-fit: contain;
  margin: 0 auto;
`
const Title = styled('h3')`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0275em;
  color: #19191D;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // margin: 0;
`
const Price = styled('h3')`
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
`
const Description = styled('h3')`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.018em;
  color: #787885;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // margin: 0;
`

const ProductItem = ({ product, onAddToBasket, setFavorites, loadingStatus }) => {
  const handleFavorite = (e) => {
    e.stopPropagation();
    setFavorites()
  }
  return (

    <Wrapper>
      {
        loadingStatus !== 'loading' ?
        (<Image src={product.image} alt="" />)
          : (<Skeleton
            variant="rectangular"
            animation='wave'
            width={224}
            height={227}
            sx={{
              margin: '0 auto'
            }}
          />)

      }

      {
        loadingStatus !== 'loading' ?
        (<Title>{product.title}</Title>)
          : (<Skeleton
            variant="rectangular"
            animation='wave'
            maxwidth={436}
            height={38}
            sx={{
              margin: '8px 0'
            }}
          />)
      }

      {
        loadingStatus !== 'loading' ?
        (<Price>${product.price}</Price>)
        : (<Skeleton
          variant="rectangular"
          animation='wave'
          width={80}
          height={24}
        />)
      }

      {
        loadingStatus !== 'loading' ?
      (<Description>{product.description}</Description>)
        : (<Skeleton
          variant="rectangular"
          animation='wave'
          maxwidth={436}
          height={60}
          sx={{
            margin: '6px 0'
          }}
        />)
      }

      {
        loadingStatus !== 'loading' ?
        (<Button
          variant="outlined"
          onClick={onAddToBasket}
        >
        Add to Basket </Button>)
        :(<Skeleton
          variant="rectangular"
          animation='wave'
          maxwidth={436}
          height={38}
          sx={{ borderRadius: '4px' }}
        />)
      }

      {
        loadingStatus !== 'loading' ?
        (<Button sx={{ position: 'absolute', right: 0 }}>
          {
            !product.favorite ?
              <FavoriteBorderIcon sx={{ marginRight: 1 }} onClick={handleFavorite} />
              : <FavoriteIcon sx={{ marginRight: 1, color: 'red' }} onClick={handleFavorite} />
          }
        </Button>)
          : (<Skeleton
            variant="circular"
            animation='wave'
            width={22}
            height={22}
            sx={{ position: 'absolute', right: 20 }}
          />)
      }
      </Wrapper >

  )
}

export default ProductItem;