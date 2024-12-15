import { Component } from 'react';

import './Label.scss';

class Label extends Component {
  render() {
    const { title, className } = this.props;
    const labelClass = `label ${className || ''}`;

    return (
      <p title={title} className={labelClass}>
        {title}
      </p>
    );
  }
}

export default Label;
