import React, { useEffect, useState, useCallback } from 'react';
import { useStore } from '../../store/store';
import {
  createFormDatafromObject,
  updateObject,
  checkValidity,
} from '../../shared/utility';

import CRUDForm from '../../components/CRUDForm/CRUDForm';

const CRUD = (props) => {
  const asyncDispatch = useStore(false)[1];
  const dispatch = useStore(false)[2];

  const documentName = props.documentName;
  const documentCollections = props.documentCollections;
  const referenceCollections = props.referenceCollections;
  const documentId = props.documentId;
  const [documentFormData, setDocumentFormData] = props.documentFormDataState
    ? props.documentFormDataState
    : [null, null];
  const [textFormData, setTextFormData] = props.textFormDataState;
  const [fileFormData, setFileFormData] = props.fileFormDataState
    ? props.fileFormDataState
    : [null, null];

  const [textFormIsValid, setTextFormIsValid] = useState(false);
  const [fileFormIsValid, setFileFormIsValid] = useState(false);
  const [
    collectionHasChanged,
    setCollectionHasChanged,
  ] = props.collectionHasChangedState
    ? props.collectionHasChangedState
    : [null, null];

  // Handlers
  const handleDocumentUpdates = useCallback(
    (newDocumentId) => {
      if (newDocumentId === null) newDocumentId = '';

      if (documentFormData) {
        const inputIdentifier = Object.keys(documentFormData)[0];

        const updatedDocumentFormElement = updateObject(
          documentFormData[inputIdentifier],
          {
            value: newDocumentId,
            elementConfig: {
              options: [
                { value: '', displayValue: 'Nytt dokument' },
                ...documentCollections.map((document) => {
                  return { value: document._id, displayValue: document.name };
                }),
              ],
            },
          }
        );

        const updatedDocumentForm = updateObject(documentFormData, {
          [inputIdentifier]: updatedDocumentFormElement,
        });

        setDocumentFormData(updatedDocumentForm);
      }

      const document = documentCollections.find(
        (document) => document._id === newDocumentId
      );

      const updatedTextForm = {
        ...textFormData,
      };
      for (let key in textFormData) {
        const formElement = textFormData[key];

        // Reset values if new document
        const attributes = {
          value: '',
          valid: false,
        };

        if (formElement.elementType === 'select') {
          attributes.value = formElement.elementConfig.options[0].value;
          attributes.valid = true;
          attributes.elementConfig = {
            options: [
              { value: '', displayValue: 'Ingen valgt' },
              ...referenceCollections.map((document) => {
                return {
                  value: document._id ? document._id : '',
                  displayValue: document.name,
                };
              }),
            ],
          };
        }

        if (formElement.elementConfig.type === 'checkbox') {
          attributes.value = false;
          attributes.valid = true;
        }

        // Update values if existing document
        if (newDocumentId) {
          attributes.value = document[key] ? document[key] : '';
          attributes.valid = true;
        }

        const updatedTextFormElement = updateObject(formElement, {
          ...attributes,
          touched: false,
        });

        updatedTextForm[key] = updatedTextFormElement;
      }
      setTextFormData(updatedTextForm);
      setTextFormIsValid(false);

      if (fileFormData) {
        // Reset values for files for all changes
        const updatedFileForm = {
          ...fileFormData,
        };

        for (let key in fileFormData) {
          const formElement = fileFormData[key];
          let value = '';

          const updatedFormElement = updateObject(formElement, {
            value,
            valid: false,
            touched: false,
          });

          updatedFileForm[key] = updatedFormElement;
        }

        setFileFormData(updatedFileForm);
        setFileFormIsValid(false);
      }
    },
    [
      documentFormData,
      textFormData,
      fileFormData,
      documentCollections,
      setDocumentFormData,
      setFileFormData,
      setTextFormData,
      referenceCollections,
    ]
  );

  const handleDocumentChange = (event) => {
    let newDocumentId = event.target.value;
    handleDocumentUpdates(newDocumentId);

    if (newDocumentId === '') newDocumentId = null;
    dispatch(`SET_${documentName}_DOC_ID`, newDocumentId);
  };

  const handleTextInputChange = (event, inputIdentifier) => {
    let value = event.target.value;
    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }

    const updatedFormElement = updateObject(textFormData[inputIdentifier], {
      value,
      valid: checkValidity(value, textFormData[inputIdentifier].validation),
      touched: true,
    });

    const updatedForm = updateObject(textFormData, {
      [inputIdentifier]: updatedFormElement,
    });

    let textFormIsValid = true;
    for (let inputIdentifier in updatedForm) {
      textFormIsValid = updatedForm[inputIdentifier].valid && textFormIsValid;
    }

    setTextFormData(updatedForm);
    setTextFormIsValid(textFormIsValid);
  };

  const handlefileInputChange = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(fileFormData[inputIdentifier], {
      value: event.target.value,
    });

    const updatedForm = updateObject(fileFormData, {
      [inputIdentifier]: updatedFormElement,
    });

    setFileFormData(updatedForm);
    setFileFormIsValid(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputValues = {};
    for (let inputIdentifier in textFormData) {
      let inputValue = textFormData[inputIdentifier].value;
      inputValues[inputIdentifier] = inputValue !== '' ? inputValue : null;
    }

    if (!documentId) {
      // If new document
      asyncDispatch(`POST_${documentName}`, inputValues);
    } else {
      // If existing document
      const formData = createFormDatafromObject(inputValues);

      const payload = {
        formData,
        id: documentId,
      };

      asyncDispatch(`PATCH_${documentName}`, payload);
    }
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const payload = {
      formData,
      id: documentId,
    };

    asyncDispatch(`PATCH_${documentName}`, payload);
  };

  const handleDeleteDocument = (event) => {
    event.preventDefault();

    asyncDispatch(`DELETE_${documentName}`, documentId);
  };

  // Update forms on document collection change
  useEffect(() => {
    if (collectionHasChanged) {
      setCollectionHasChanged(false);
      handleDocumentUpdates(documentId);
    }
  }, [
    collectionHasChanged,
    setCollectionHasChanged,
    handleDocumentUpdates,
    documentId,
  ]);

  return (
    <>
      <CRUDForm
        heading={props.heading}
        documentFormData={documentFormData}
        textFormData={textFormData}
        fileFormData={fileFormData}
        onTextInputChange={handleTextInputChange}
        onfileInputChange={handlefileInputChange}
        onDocumentChange={handleDocumentChange}
        onSubmit={handleSubmit}
        onFileSubmit={handleFileSubmit}
        onDeleteSubmit={handleDeleteDocument}
        textFormIsValid={textFormIsValid}
        fileFormIsValid={fileFormIsValid}
        documentId={documentId}
      />
    </>
  );
};

export default CRUD;
