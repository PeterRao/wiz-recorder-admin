import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import styles from './Admin.less'; // eslint-disable-line no-unused-vars
import { withStyles } from '../decorators'; // eslint-disable-line no-unused-vars

@withStyles(styles)

class Admin {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = '登录';
    this.context.onSetTitle(title);
    return (
      <div className="Admin">
        后台管理
      </div>
    );
  }
}

export default Admin;
