import React, { useState, useEffect } from 'react';
import { useStore } from '../../../store/store';

import CRUD from '../../CRUD/CRUD';

const ProjectData = (props) => {
  const { projectDocId } = useStore()[0];
  const [collectionHasChanged, setCollectionHasChanged] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  const [documentFormData, setDocumentFormData] = useState({
    project: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Nytt dokument' },
          ...props.projects.map((project) => {
            return { value: project._id, displayValue: project.name };
          }),
        ],
      },
      label: 'Dokument',
      value: projectDocId ? projectDocId : '',
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
    skills: {
      elementType: 'textarea',
      elementConfig: {
        placeholder: 'Ferdigheter',
      },
      value: '',
      label: 'Ferdigheter',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        placeholder: 'Beskrivelse',
      },
      value: '',
      label: 'Beskrivelse',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    website: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Nettside',
      },
      value: '',
      label: 'Nettside',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    code: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Kode',
      },
      value: '',
      label: 'Kode',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    section: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Ingen valgt' },
          ...props.sections.map((section) => {
            return {
              value: section._id ? section._id : '',
              displayValue: section.name,
            };
          }),
        ],
      },
      valid: true,
      touched: true,
      label: 'Seksjon',
      value: '',
      resourceName: 'sections',
    },
    published: {
      elementType: 'input',
      elementConfig: {
        type: 'checkbox',
        placeholder: 'Publisert',
      },
      value: false,
      label: 'Publisert',
      valid: true,
      touched: true,
    },
  });

  const [fileFormData, setFileFormData] = useState({
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
  }, [props.projects, props.sections, isMounting]);

  useEffect(() => {
    setIsMounting(false);
  }, []);

  return (
    <CRUD
      collectionHasChangedState={[
        collectionHasChanged,
        setCollectionHasChanged,
      ]}
      documentName="PROJECT"
      heading="Prosjekt"
      documentCollections={props.projects}
      referenceCollections={props.sections}
      documentFormDataState={[documentFormData, setDocumentFormData]}
      textFormDataState={[textFormData, setTextFormData]}
      fileFormDataState={[fileFormData, setFileFormData]}
      documentId={projectDocId}
    />
  );
};

export default ProjectData;
