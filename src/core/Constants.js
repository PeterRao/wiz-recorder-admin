import keyMirror from 'react/lib/keyMirror';

export default {
  ActionTypes: {
    api: keyMirror({
      GET_ALL_MESSAGES: null
    }),
    request: keyMirror({
      PENDING: null,
      TIMEOUT: null,
      ERROR: null
    })
  }
};

