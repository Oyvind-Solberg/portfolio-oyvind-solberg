import React, { useState, useEffect } from 'react';

import CRUD from '../../CRUD/CRUD';

const UserData = (props) => {
  const [collectionHasChanged, setCollectionHasChanged] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  const [textFormData, setTextFormData] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Navn',
      },
      value: props.user.name,
      label: 'Navn',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        placeholder: 'Beskrivelse',
      },
      value: props.user.description,
      label: 'Beskrivelse',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Epost',
      },
      value: props.user.email,
      label: 'Epost',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: true,
      touched: false,
    },
    phone: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Telefon',
      },
      value: props.user.phone,
      label: 'Telefon',
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
  });

  const [fileFormData, setFileFormData] = useState({
    cv: {
      elementType: 'input',
      elementConfig: {
        type: 'file',
      },
      value: '',
      label: 'CV',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    image: {
      elementType: 'input',
      elementConfig: {
        type: 'file',
      },
      value: '',
      label: 'Bilde',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (!isMounting) {
      setCollectionHasChanged(true);
    }
  }, [props.user, isMounting]);

  useEffect(() => {
    setIsMounting(false);
  }, []);

  return (
    <CRUD
      collectionHasChangedState={[
        collectionHasChanged,
        setCollectionHasChanged,
      ]}
      documentName="USER"
      heading="Bruker"
      documentCollections={[props.user]}
      textFormDataState={[textFormData, setTextFormData]}
      fileFormDataState={[fileFormData, setFileFormData]}
      documentId={props.user._id}
    />
  );
};

export default UserData;
