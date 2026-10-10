import { useCallback, useMemo } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { SurveyPDF } from 'survey-pdf';
import 'survey-core/survey-core.css';

// Template survey
const surveyJson = {
  elements: [
    {
      type: 'text',
      name: 'fullName',
      title: 'Full Name',
      isRequired: true,
    },
  ]
};

const pdfOptions = {
  fontSize: 12,
  margins: { top: 20, bottom: 20, left: 20, right: 20 },
};

export default function DocumentForm() {
  const survey = useMemo(() => new Model(surveyJson), []);

  survey.onValueChanged.add(() => {
    localStorage.setItem('form-progress', JSON.stringify(survey.data));
  });

  const exportToPdf = useCallback(() => {
    const surveyPdf = new SurveyPDF(surveyJson, pdfOptions);
    surveyPdf.data = survey.data;
    // readOnly = false
    // surveyPdf.save('document.pdf');
  }, [survey]);

  return (
    <div className="document-form">
      <Survey model={survey} />
      <button onClick={exportToPdf}>Exoirt to PDF</button>
    </div>
  );
}
