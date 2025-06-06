import React from "react";
import { useNavigate } from "react-router-dom";
import { useStepStore } from "../../store/store";
import "../../styles/Navigation/navigation.css";

const StepNavigation: React.FC = () => {
  const { currentNavStep, setNavStep, isFormComplete, stepPaths } =
    useStepStore();
  const navigate = useNavigate();

  const handleBack = () => {
    const previousStep = currentNavStep - 1;
    if (previousStep >= 0) {
      setNavStep(previousStep);
      if (previousStep === 0) navigate(`/dashboard`);
      else navigate(`/update/${stepPaths[previousStep]}`);
    }
  };

  const handleContinue = () => {
    const nextStep = currentNavStep + 1;
    if (nextStep < stepPaths.length) {
      setNavStep(nextStep);
      navigate(`/update/${stepPaths[nextStep]}`);
    }
  };

  return (
    <div className="step-buttons">
      <button className="btn-outline" onClick={handleBack}>
        Voltar
      </button>
      <button
        className={`btn-primary ${isFormComplete ? "btn-enabled" : ""}`}
        disabled={!isFormComplete}
        onClick={handleContinue}
      >
        Continuar
      </button>
    </div>
  );
};

export default StepNavigation;
