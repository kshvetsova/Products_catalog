import React, {useEffect, useState, useMemo, useCallback, useContext } from 'react';
import './ProductDetailsPage.scss';
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import details from '../../data/details.json';
import classNames from 'classnames';
import { Buttons } from '../Buttons';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsContext } from '../../ProductsProvider';

export const ProductDetailsPage = () => {
  const { productsList } = useContext(ProductsContext);
  const { productId, typeProduct } = useParams() || '0';
  const history = useHistory();
  const [product, setProduct] = useState(
    productsList[typeProduct].find(item => item.id === +productId)
  );
  const [image, setImage] = useState([]);
  const [imageHover, setImageHover] = useState('');
  const [colorList, setColorList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const { name , images, model, color, id , type, option, price, tech } = product;

  useEffect(() => {
    setProduct(productsList[typeProduct].find(item => item.id === +productId));
  }, [productId, typeProduct]);

  useEffect(() => {
    setImage(images[0]);
    if (product) {
      setColorList(details.find(item => item.models === model).colors);
      setOptionList(details.find(item => item.models === model).options);
    }
}, [productId, typeProduct, product]);

  const findProductColor = useCallback((colorItem) => (
    productsList[typeProduct].find(item => (
      item.color === colorItem &&
      item.type === typeProduct &&
      item.option === option &&
      item.model === model)).id
  ), [productId, product]);

  const findProductOption = useCallback((optionItem) => (
    productsList[typeProduct].find(item => (
      item.color === color &&
      item.type === typeProduct &&
      item.option === optionItem &&
      item.model === model)).id
  ), [productId, product]);

  const description = useMemo(() => (
    [...details].find(item => item.models === model && item.type === type).about
  ), [product]);

  const techSpecsList = useMemo(() => (
    [...details].find(item => item.models === model && item.type === type).specs
  ), [product]);

  const productsSlider = useMemo(() => (
    [...productsList[typeProduct]].filter(item => item.id !== +productId)
  ), [productId]);

  return (
    <div className="ProductDetailsPage">
      <div className="ProductDetailsPage-Breadcrumbs Breadcrumbs">
        <div className="Breadcrumbs-List">
          <NavLink className="Breadcrumbs-Item" to="/home">
            <img src="./img/icons-page/home.svg" alt="Home"/>
          </NavLink>
          <img
            src="./img/icons-page/next-disabled.svg"
            alt="Next"
            className="Breadcrumbs-Item"
          />
          <button
            className="Breadcrumbs-Item"
            onClick={() => history.push(`/${type}`)}
            type="button"
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
          <img src="./img/icons-page/next-disabled.svg" alt="Next" className="Breadcrumbs-Item"/>
          <p className="Breadcrumbs-Item">{name}</p>
        </div>
        <div className="Breadcrumbs-Back Back">
          <img src="./img/icons-page/prev.svg" alt="Prev"/>
          <button
            className="Back-Button"
            type="button"
            onClick={() => history.goBack(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <h1 className="ProductDetailsPage-Title">{product.name}</h1>
      <div className="ProductDetailsPage-ContainerTop">
        <div className="ProductDetailsPage-BlockImages BlockImages">
          <ul className="BlockImages-List">
            {product.images.map((item, index) => (
              <li
                key={index}
                className={classNames('BlockImages-Item', {
                  item_active: item === image,
                  item_size: ["11 Pro", "Air 4", "Pro 12.9\"", "Pro 12.9\" M1"].includes(model) || typeProduct === "watches",
                  item_tablets: ["Pro 11\"", "8 10.2\""].includes(model),
                })}
                onClick={() => setImage(item)}
                onMouseEnter={() => setImageHover(item)}
                onMouseLeave={() => setImageHover('')}
              >
                <img
                  src={item}
                  alt="Product"
                  width="64px"
                  height="64px"
                  className="imageItem"
                />
              </li>
            ))}
          </ul>
          <img
            src={imageHover ? imageHover : image}
            alt="Product"
            width="200px"
            height="200px"
            className="BlockImages-Preview"
          />
        </div>
        <div className="ProductDetailsPage-ContainerOptions">
          <div className="ProductDetailsPage-BlockOptions BlockOptions">
            <div className="BlockOptions-Colors Colors">
              <h3 className="Colors-Title">Available colors</h3>
              <ul className="Colors-List">
                {colorList.map(([item, hex ]) => (
                  <li
                    key={hex}
                    className={classNames('Colors-Item', {
                      color_active: item === color,
                    })}
                    onClick={() => history.push(
                      `/${type}/product/${findProductColor(item)}`
                    )}
                  >
                    <div
                      className="color"
                      style={{
                        background: `${hex}`,
                        border: `${1}px solid ${hex}`
                      }}
                    >{}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="BlockOptions-Options Options">
              <h3 className="Options-Title">
                Select {`${typeProduct !== 'watches' ? 'capacity' : 'size'}`}
              </h3>
              <ul className="Options-List">
                {optionList.map(item => (
                  <li
                    key={item}
                    className={classNames('Options-Item', {
                      option_active: item === option,
                    })}
                    onClick={() => history.push(
                      `/${type}/product/${findProductOption(item)}`
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="BlockOptions-PriceBlock PriceBlock">
              <div className="PriceBlock-Price price">
                {`$${price[0]}`}
              </div>
              <div className="PriceBlock-Sale">
                {price[1] ? `$${price[1]}` : ''}
              </div>
            </div>
            <div className="BlockOptions-Buttons BlockOptions-Buttons_gap">
              <Buttons id={id} name={name} price={price[0]} image={images[0]}/>
            </div>
            <ul className="BlockOptions-Details Details">
              {tech.map(([name, value]) => (
                <li className="Details-Item" key={value}>
                  <p className="Details-Name">{name}</p>
                  <p className="Details-Value">{value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="ProductDetailsPage-ProductId">ID: {id}</div>
        </div>
      </div>
      <div className="ProductDetailsPage-ContainerBottom">
        <div className="ProductDetailsPage-About About">
          <h2 className="About-Title">About</h2>
          <ul className="About-List">
            {description.map(([title, text]) => (
               <li className="About-Item" key={title}>
                 <h3 className="About-ItemTitle">{title}</h3>
                 <p className="About-ItemText">{text}</p>
               </li>
            ))}
          </ul>
        </div>
        <div className="ProductDetailsPage-TechSpecs TechSpecs">
          <h2 className="TechSpecs-Title">Tech specs</h2>
          <ul className="TechSpecs-List">
            {techSpecsList.map(([name, value]) => (
               <li className="TechSpecs-Item" key={value}>
                 <h3 className="TechSpecs-Name">{name}</h3>
                 <p className="TechSpecs-Value">{value}</p>
               </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductsSlider title="You may also like" products={productsSlider} />
    </div>
  )
}