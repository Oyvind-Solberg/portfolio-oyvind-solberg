import React from 'react';

import classes from './Input.module.scss';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.Input, classes.Input__Element];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Input__Invalid);
  }
  switch (props.elementType) {
    case 'input':
      if (props.inputType === 'checkbox') {
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            checked={props.value}
            name={props.name}
            onChange={props.onChange}
          />
        );
      } else {
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
          />
        );
      }

      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
  }

  return (
    <>
      {props.label ? (
        <label
          className={[classes.Input, classes.Input_Label].join(' ')}
          htmlFor={props.name}
        >
          {props.label}
        </label>
      ) : null}
      {inputElement}
    </>
  );
};

export default Input;
