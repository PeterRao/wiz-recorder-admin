import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import styles from './App.less'; // eslint-disable-line no-unused-vars
import LoginPage from '../LoginPage';
import Admin from '../Admin';

import { withContext, withStyles } from '../decorators'; // eslint-disable-line no-unused-vars

@withContext
@withStyles(styles)

class App {

  static propTypes = {
    path: PropTypes.string.isRequired
  };


  render() {
    let component;
    switch (this.props.path) {
      case '/':
      case '/login':
        component = <LoginPage />;
        break;
      case '/admin':
        component = <Admin />;
        break;
      default:
    }
    return (
      <div>
        {component}
      </div>
    );
  }
}

export default App;
