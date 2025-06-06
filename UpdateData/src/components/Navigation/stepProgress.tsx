import React from "react";
import { useStepStore } from "../../store/store";
import "../../styles/Navigation/stepProgress.css";

const steps = ["Início", "Empresa", "Documentação", "Conclusão"];

const StepProgress: React.FC = () => {
  const currentStep = useStepStore((state) => state.currentStep);
  const title = useStepStore((state) => state.stepTitle);

  return (
    <div className="step-progress-header">
      <h1 className="step-title-left">{title}</h1>
      <div className="step-progress">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div className="step-total" key={label}>
              <div className="step-item">
                <div className="circle-wrapper">
                  <div
                    className={`step-circle ${
                      isActive ? "active" : isCompleted ? "completed" : ""
                    }`}
                  >
                    {stepNum}
                  </div>
                  <div className={`step-label ${isActive ? "active" : ""}`}>
                    {label}
                  </div>
                </div>
                <div className="line-div">
                  {stepNum < steps.length && (
                    <div
                      className={`step-line ${isCompleted ? "completed" : ""}`}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
