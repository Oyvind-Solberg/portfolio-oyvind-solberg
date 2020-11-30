import React, { useState, useEffect } from 'react';
import { useStore } from '../../../store/store';

import CRUD from '../../CRUD/CRUD';

const SkillData = (props) => {
  const { skillDocId } = useStore()[0];
  const [collectionHasChanged, setCollectionHasChanged] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  const [documentFormData, setDocumentFormData] = useState({
    skill: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Nytt dokument' },
          ...props.skills.map((skill) => {
            return { value: skill._id, displayValue: skill.name };
          }),
        ],
      },
      label: 'Dokument',
      value: skillDocId ? skillDocId : '',
    },
  });

  const [textFormData, setTextFormData] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Navn',
      },
      value: '',
      label: 'Navn',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    group: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Gruppe',
      },
      value: '',
      label: 'Gruppe',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    percent: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Prosent',
      },
      value: '',
      label: 'Prosent',
      validation: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    position: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Posisjon',
      },
      value: '',
      label: 'Posisjon',
      validation: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (!isMounting) {
      setCollectionHasChanged(true);
    }
  }, [props.skills, isMounting]);

  useEffect(() => {
    setIsMounting(false);
  }, []);

  return (
    <CRUD
      collectionHasChangedState={[
        collectionHasChanged,
        setCollectionHasChanged,
      ]}
      documentName="SKILL"
      heading="Ferdigheter"
      documentCollections={props.skills}
      documentFormDataState={[documentFormData, setDocumentFormData]}
      textFormDataState={[textFormData, setTextFormData]}
      documentId={skillDocId}
    />
  );
};

export default SkillData;
