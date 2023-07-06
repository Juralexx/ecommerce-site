import React from 'react';
import { AlertContext } from './AlertContext';

const useAlert = () => React.useContext(AlertContext);

export default useAlert;