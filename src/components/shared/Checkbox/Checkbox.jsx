import { Component } from 'react';

import './Checkbox.scss';

class Checkbox extends Component {
  render() {
    const { title, value, handleChange } = this.props;

    return (
      <div className="app-checkbox">
        <input type="checkbox" value={value} onChange={handleChange} />
        <p>{title}</p>
      </div>
    );
  }
}

export default Checkbox;
