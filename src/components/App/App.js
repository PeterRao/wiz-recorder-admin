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
      case '/login':
        this.props.onSetTitle(LoginPage.title);
        this.component = <LoginPage />;
        break;

      default:
        break;
    }

    return (
      <div>
        {this.component}
      </div>
    )
  }
}