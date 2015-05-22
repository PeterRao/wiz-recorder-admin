import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { withStyles } from '../decorators'; // eslint-disable-line no-unused-vars
import styles from './LoginPage.less'; // eslint-disable-line no-unused-vars

@withStyles(styles)

class LoginPage {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = '登录';
    this.context.onSetTitle(title);
    return (
      <div className="LoginPage">
        <div className="container">
          <form className="form-signin">
            <h2 className="form-signin-heading">登录</h2>
            <lable htmlFor="account" className="sr-only"></lable>
            <input type="text" id="account" className="form-control" placeholder="账号" required autofocus/>
            <label htmlFor="password" className="sr-only"></label>
            <input type="text" id='password' className="form-control" placeholder="密码" required/>
            <div className="checkbox">
              <label><input type="checkbox" value='remember-me'/>记住我</label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type='submit'>登录</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
