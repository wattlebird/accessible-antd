import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd'
import App from './App.jsx';

ReactDOM.render(
  <ConfigProvider
    getPopupContainer={node => {
      if (node) return node.parentNode
      else return document.body
    }}
  ><App/>
  </ConfigProvider>
, document.getElementById('app'));
