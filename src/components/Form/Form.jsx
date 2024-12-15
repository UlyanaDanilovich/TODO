import { Component } from 'react';
import Label from '../shared/Label/Label';
import Button from '../shared/Button/Button';
import { severityArray } from '../../constants/severityTypes';

import './Form.scss';

class Form extends Component {
  render() {
    const {
      title,
      desc,
      severity,
      isButtonDisabled,
      submitForm,
      handleTitle,
      handleDesc,
      handleSeverity,
    } = this.props;

    return (
      <form className="app-form">
        <h2>Add task</h2>
        <div className="form-field-wrapper">
          <Label title="Title" />
          <input
            type="text"
            value={title}
            onInput={handleTitle}
            placeholder="Enter task title"
          />
        </div>
        <div className="form-field-wrapper">
          <Label title="Description" />
          <input
            type="text"
            value={desc}
            onInput={handleDesc}
            placeholder="Enter task description"
          />
        </div>
        <div className="form-field-wrapper">
          <Label title="Severity" />
          <ul className="chip-wrapper">
            {severityArray.map(([key, value]) => (
              <Button
                key={key}
                value={value}
                title={value}
                className={`app-chip_${value === severity ? value : 'disabled'}`}
                handleClick={handleSeverity}
              />
            ))}
          </ul>
        </div>
        <Button
          className="app-form__button"
          title="Add Todo"
          disabled={isButtonDisabled}
          handleClick={submitForm}
        />
      </form>
    );
  }
}

export default Form;
