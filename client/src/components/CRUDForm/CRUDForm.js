import React from 'react';

import classes from './CRUDForm.module.scss';
import Heading from '../typography/Heading/Heading';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const CRUDForm = (props) => {
  let textForm = null;
  let fileForm = null;
  let documentForm = null;

  const createInputElements = (formData, changeHandler) => {
    const formDataArray = [];
    for (let key in formData) {
      formDataArray.push({
        id: key,
        config: formData[key],
      });
    }

    const inputElements = formDataArray.map((formElement) => {
      return (
        <div key={formElement.id}>
          <Input
            inputType={formElement.config.elementConfig.type}
            label={formElement.config.label}
            name={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            onChange={(event) => changeHandler(event, formElement.id)}
          />
        </div>
      );
    });

    return inputElements;
  };
  if (props.documentFormData) {
    const documentInputElement = createInputElements(
      props.documentFormData,
      props.onDocumentChange
    );

    documentForm = (
      <div className={classes.CRUDForm__DocumentContainer}>
        <form onSubmit={props.onDeleteSubmit}>
          <legend>
            <Heading type="Tertiary" nonSemantic noBorder>
              Velg dokument
            </Heading>
          </legend>
          <div className={classes.CRUDForm__DocumentContent}>
            <div className={classes.CRUDForm__Inputs}>
              {documentInputElement}
            </div>

            <Button submit disabled={!props.documentId}>
              Slett dokument
            </Button>
          </div>
        </form>
      </div>
    );
  }

  if (props.textFormData) {
    const textInputElements = createInputElements(
      props.textFormData,
      props.onTextInputChange
    );

    textForm = (
      <form onSubmit={props.onSubmit}>
        <legend>
          <Heading type="Tertiary" nonSemantic noBorder>
            {props.documentId
              ? 'Oppdater dokument'
              : 'Opprett eit nytt dokument'}
          </Heading>
        </legend>
        <div className={classes.CRUDForm__Inputs}>{textInputElements}</div>

        <Button submit disabled={!props.textFormIsValid}>
          {props.documentId ? 'Oppdater' : 'Lagre'}
        </Button>
      </form>
    );
  }

  if (props.fileFormData) {
    const fileInputElements = createInputElements(
      props.fileFormData,
      props.onfileInputChange
    );

    fileForm = (
      <form onSubmit={props.onFileSubmit}>
        <legend>
          <Heading type="Tertiary" nonSemantic noBorder>
            Last opp filer
          </Heading>
        </legend>
        <div className={classes.CRUDForm__Inputs}>{fileInputElements}</div>

        <Button submit disabled={!props.documentId || !props.fileFormIsValid}>
          Last opp
        </Button>
      </form>
    );
  }

  return (
    <div className={classes.CRUDForm}>
      <Heading type="Secondary" theme="light">
        {props.heading}
      </Heading>
      <div className={classes.CRUDForm__Group}>
        {documentForm}
        <div className={classes.CRUDForm__Container}>
          {textForm}
          {fileForm}
        </div>
      </div>
    </div>
  );
};

export default CRUDForm;
