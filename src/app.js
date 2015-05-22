import 'babel/polyfill';
import React from 'react';
import FastClick from 'fastclick';
import AppActions from './actions/AppActions';

import App from './components/App';

// Remove nginx context
let pathArr = decodeURI(window.location.pathname).split('/');
pathArr.splice(1, 1);
let path = pathArr.join('/');
let onSetMeta = (name, content) => {
  // Remove and create a new <meta /> tag in order to make it work
  // with bookmarks in Safari
  let elements = document.getElementsByTagName('meta');
  [].slice.call(elements).forEach((element) => {
    if (element.getAttribute('name') === name) {
      element.parentNode.removeChild(element);
    }
  });
  let meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.getElementsByTagName('head')[0].appendChild(meta);
};

function run() {
  let props = {
    path: path,
    context: {
      onSetTitle: value => document.title = value,
      onSetMeta
    }
  };

  console.log(path);
  let element = React.createElement(App, props);
  React.render(element, document.getElementById('app'), () => {
    let css = document.getElementById('css');
    css.parentNode.removeChild(css);
  });
}

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(document.body)),
  new Promise((resolve) => AppActions.getAllMessages(resolve))
]).then(run);
