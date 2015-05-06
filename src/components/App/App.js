import './App.less';
import React, { PropTypes } from 'react';
import LoginPage from '../LoginPage';

class App {

  static propTypes = {
    path: PropTypes.string.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired
  };


  render() {
    switch (this.props.path) {

      case '/':
      case '/login':
        this.props.onSetTitle(LoginPage.title);
        this.component = <LoginPage />;
        break;

      default:
    }
    return (
      <div>
        {this.component}
      </div>
    );
  }
}

export default App;
