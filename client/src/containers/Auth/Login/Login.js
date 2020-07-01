import React, { useState } from 'react';
import { useStore } from '../../../store/store';

import classes from './Login.module.scss';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Heading from '../../../components/typography/Heading/Heading';
import { checkValidity } from '../../../shared/utility';

const Login = (props) => {
  const asyncDispatch = useStore(false)[1];

  const [loginFormData, setLoginFormData] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Epost',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Passord',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const inputChangeHandler = (event, inputName) => {
    setLoginFormData({
      ...loginFormData,
      [inputName]: {
        ...loginFormData[inputName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          loginFormData[inputName].validation
        ),
        touched: true,
      },
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = {
      body: {
        email: loginFormData.email.value,
        password: loginFormData.password.value,
      },
    };

    asyncDispatch('LOGIN', payload);
  };

  const submitGuestHandler = () => {
    asyncDispatch('LOGIN_GUEST');
  };

  const formElementsArray = [];
  for (let key in loginFormData) {
    formElementsArray.push({
      id: key,
      config: loginFormData[key],
    });
  }

  let formInputs = formElementsArray.map((formElement) => (
    <Input
      inputType={formElement.config.elementConfig.type}
      name={formElement.id}
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      onChange={(event) => inputChangeHandler(event, formElement.id)}
    />
  ));

  return (
    <main className={classes.Login}>
      <div className={classes.Login__FormContainer}>
        <form onSubmit={submitHandler}>
          <legend>
            <Heading type="Tertiary" nonSemantic noBorder>
              Logg inn
            </Heading>
          </legend>
          {formInputs}
          <div className={classes.Login__Buttons}>
            <Button center submit>
              Logg inn
            </Button>
            <Button center onClick={submitGuestHandler}>
              Logg inn som gjest
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
