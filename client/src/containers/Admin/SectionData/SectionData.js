import React, { useState, useEffect } from 'react';
import { useStore } from '../../../store/store';

import CRUD from '../../CRUD/CRUD';

const SectionData = (props) => {
  const { sectionDocId } = useStore()[0];
  const [collectionHasChanged, setCollectionHasChanged] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  const [documentFormData, setDocumentFormData] = useState({
    section: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Nytt dokument' },
          ...props.sections.map((section) => {
            return { value: section._id, displayValue: section.name };
          }),
        ],
      },
      label: 'Dokument',
      value: sectionDocId ? sectionDocId : '',
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
  }, [props.sections, isMounting]);

  useEffect(() => {
    setIsMounting(false);
  }, []);

  return (
    <CRUD
      collectionHasChangedState={[
        collectionHasChanged,
        setCollectionHasChanged,
      ]}
      documentName="SECTION"
      heading="Seksjon"
      documentCollections={props.sections}
      documentFormDataState={[documentFormData, setDocumentFormData]}
      textFormDataState={[textFormData, setTextFormData]}
      documentId={sectionDocId}
    />
  );
};

export default SectionData;
