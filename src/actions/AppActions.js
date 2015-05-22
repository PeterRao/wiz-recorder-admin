import Dispatcher from '../core/Dispatcher';
import { ActionTypes } from '../core/Constants';
import http from 'superagent';

const TIMEOUT = 10000;
let API_URL = '/recorder';

let pendingRequests = {};

function abortPendingRequest(key) {
  if (pendingRequests[key]) {
    pendingRequests[key].callback = function () {};
    pendingRequests[key].abort();
    pendingRequests[key] = null;
  }
}

function makeUrl(port) {
  return API_URL + port;
}

function dispatch(type, response) {
  let payload = {type: type, response: response};
  Dispatcher.dispatch(payload);
}

function makeDigestFun(type, cb) {
  return (err, res) => {
    if (err && err.timeout === TIMEOUT) {
      dispatch(type, ActionTypes.request.TIMEOUT);
    } else if (!res.ok) {
      dispatch(type, ActionTypes.request.ERROR);
    } else {
      dispatch(type, res);
    }
    if (cb) {
      cb();
    }
  };
}

function get(url) {
  return http.get(url).timeout(TIMEOUT);
}

export default {
  getAllMessages(cb) {
    let url = makeUrl('/messages');
    let type = ActionTypes.api.GET_ALL_MESSAGES;
    abortPendingRequest(type);
    dispatch(type, ActionTypes.request.PENDING);
    pendingRequests[type] = get(url).end(
      makeDigestFun(type, cb)
    );
  }
};
