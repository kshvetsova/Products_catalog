import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ProductCart.scss';
import { ProductsContext } from '../../ProductsProvider';


export const ProductCart = React.memo(({
  name,
  price,
  image,
  id,
  count,
  quantity,
  setQuantity,
  setTotalPrice,
  totalPrice,
  }) => {
  const {carts, setCarts} = useContext(ProductsContext);

  const addCountCart = useCallback((id) => setCarts(
    carts.map(item => (item.id === id)
    ? { ...item, count: item.count + 1}
    : item)), [carts]);

  const removeCountCart = useCallback((id) => setCarts(
    carts.map(item => (item.id === id)
    ? { ...item, count: item.count - 1}
    : item)), [carts]);

  return (
    <div className="ProductCart">
      <div className="ProductCart-ContainerLeft">
        <button
          className="ProductCart-Close"
          onClick={() => setCarts(carts.filter(item => item.id !== id))}
        >
          {}
        </button>
        <img
          className="ProductCart-Image"
          src={image}
          width="66px"
          height="66px"
          alt="Phone"
        />
        <p className="ProductCart-Name">{name}</p>
      </div>
      <div className="ProductCart-ContainerRight">
        <div className="ProductCart-ContainerQuantity">
          <button
            className="ProductCart-Remove buttonProduct"
            onClick={() => {
              removeCountCart(id);
              setQuantity(quantity - 1);
              setTotalPrice(totalPrice - price);
            }}
            disabled={(count === 1)}
          >{}</button>
          <div className="ProductCart-Quantity">{count}</div>
          <button
            className="ProductCart-Add buttonProduct"
            onClick={() => {
              addCountCart(id);
              setQuantity(quantity + 1);
              setTotalPrice(totalPrice + price);
              }}
          >
            {}
          </button>
        </div>
        <div className="ProductCart-Price">${price}</div>
      </div>
    </div>
  )
})

ProductCart.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};