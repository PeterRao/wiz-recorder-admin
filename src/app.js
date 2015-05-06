import 'babel/polyfill';
import React from 'react';

import App from './components/App';

let path = decodeURI(window.location.pathname);

function run() {
  let props = {
    path: path,
    onSetTitle: (title) => document.title = title,
    onPageNotFound: function(){}
  };
  let element = React.createElement(App, props);
  React.render(element, document.body);
}

window.addEventListener('load', function () {
  run();
}, false);
