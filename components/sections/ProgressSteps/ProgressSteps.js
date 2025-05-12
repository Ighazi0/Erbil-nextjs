"use client"; // Required for Client Component
import React, { useState } from 'react';
import './ProgressSteps.css';
import styles from './ProgressSteps.css';
import { FormattedMessage } from 'react-intl';

const ProgressSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

const steps = [
  <FormattedMessage id="step1" />,
  <FormattedMessage id="step2" />,
  <FormattedMessage id="step3" />,
  <FormattedMessage id="step4" />,
  <FormattedMessage id="step5" />,
  <FormattedMessage id="step6" />
];
  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (<>
    <div className="container my-5 w-100">
      <div className="heading-section t-al-center mb-30">
        <span className="sub-title mb-6 wow fadeInUp"><FormattedMessage id="How We Make It Done" /></span>
        <h2 className="title wow fadeInUp"><FormattedMessage id="Step By Step" /></h2>
      </div>
      <div className="text-center mb-3">
        <h3 className="text-danger my-2"><FormattedMessage id="Step" /> {currentStep + 1}</h3>
        <p className="lead costum-color w-75 mx-auto">{steps[currentStep]}</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-danger"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
        <FormattedMessage id="Previous" />  
        </button>
        <button
          className="btn btn-danger"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          <FormattedMessage id="Next" />  
        </button>
      </div>

      <div className={`progress my-4 ${styles.progressCustom}`}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
          role="progressbar"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          aria-valuenow={currentStep + 1}
          aria-valuemin="0"
          aria-valuemax={steps.length}
        ></div>
      </div>
    </div>
  </>
  );
};

export default ProgressSteps;
