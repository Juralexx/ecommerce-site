import React from 'react';
import { CartPopupContext } from './CartPopupContext';

const useCartPopup = () => React.useContext(CartPopupContext);

export default useCartPopup;