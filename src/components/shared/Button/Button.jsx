import { Component } from 'react';

import './Button.scss';

class Button extends Component {
  render() {
    const { title, disabled, value, handleClick, className } = this.props;
    const buttonClass = `button ${disabled ? 'button-disabled' : ''} ${className || ''}`;

    return (
      <button
        className={buttonClass}
        value={value}
        disabled={disabled}
        onClick={handleClick}
      >
        {title}
      </button>
    );
  }
}

export default Button;
