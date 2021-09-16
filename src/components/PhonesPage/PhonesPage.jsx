import React, { useContext} from 'react';
import { ProductsContext } from '../../ProductsProvider';
import { PageContent } from '../PageContent';

export const PhonesPage = () => {
  const { productsList, path } = useContext(ProductsContext);

  return (
    <PageContent title="Mobile phones" products={productsList[path]} />
  )
}