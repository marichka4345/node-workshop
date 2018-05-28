import React from 'react';
import ReactLoading from 'react-loading';

import './loader.css';

const loaderConfig = {
  type: 'bars',
  color: '#007BFF',
  height: 250,
  width: 150
};

export default () => (
  <ReactLoading {...loaderConfig} className="loader"/>
);