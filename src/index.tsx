import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import App from './App';

ReactDOM.render(
  <ConfigProvider
    getPopupContainer={node => {
      if (node) return node.parentNode;
      return document.body;
    }}
  >
    <App />
  </ConfigProvider>,
  document.getElementById('app'),
);
