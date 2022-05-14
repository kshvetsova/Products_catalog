import React, {useContext} from 'react';
import './Product.scss';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Buttons } from '../Buttons';
import { ProductsContext } from '../../ProductsProvider';
import classNames from 'classnames';

export const Product = React.memo(({
  images,
  name,
  price,
  tech,
  id,
  type,
  option}) => {
  const { path } = useContext(ProductsContext);

  return (
    <li className="Product">
      <NavLink
        className="Product-ImageContainer"
        to={path.includes(`/${type}/product`)
          ? `/${id}`
          : `/${type}/product/${id}`}
      >
        <img
          className={classNames('Product-Image', {
            watches_image: option === "40mm",
          })}
          src={`./${images[0]}`}
          alt="Iphone"
          width="190px"
        />
      </NavLink>
      <div className="Product-Info">
        <p className="Product-Name">
          {name}
        </p>
        <div className="Product-PriceBlock PriceBlock">
          <div className="PriceBlock-Price">{`$${price[0]}`}</div>
          <div className="PriceBlock-Sale">
            {price[1] ? `$${price[1]}` : ''}
          </div>
        </div>
        <div className="line">{}</div>
        <ul className="Product-Details Details">
          {tech.map(([name, value]) => (
            <li className="Details-Item" key={name}>
              <p className="Details-Name">{name}</p>
              <p className="Details-Value">{value}</p>
            </li>
          ))}
        </ul>
      </div>
      <Buttons
        id={id}
        price={price[0]}
        name={name}
        image={images[0]}
      />
    </li>
  );
})

Product.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  tech: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
};
