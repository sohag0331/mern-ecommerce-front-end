import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
import Card from '../../../components/UI/Card'

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {

    const product = useSelector((state) => state.product);
  const [ priceRnage, setPriceRange ] = useState({
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under30K: 30000
  })
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return(
    <>
    {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card 
          headerLeft={`${props.match.params.slug} mobile under ${priceRnage[key]}`}
          headerRight={<button>view all</button>}
          style={{ margin: '20px' }}
          >
            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((product) => (
                <Link to={ `/${product.slug}/${product._id}/p`}
                style={{ display: 'block'}}
                className="productContainer">
                  <div className="productImgContainer">
                    <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>5455</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
   )

 }

export default ProductStore