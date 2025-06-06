import React, { useEffect } from "react";
import { useStepStore } from "../../store/store";
import StepProgress from "../Navigation/stepProgress";
import StepNavigation from "../Navigation/navigation";
import "../../styles/Step 1/initialStep.css";

const InitialStep: React.FC = () => {
  const { setStep, setTitle, setFormComplete } = useStepStore();

  useEffect(() => {
    setStep(1);
    setTitle("Atualizar dados");
    setFormComplete(true);
  }, [setStep, setTitle, setFormComplete]);

  return (
    <div className="step-inicio-wrapper">
      <StepProgress />
      <div className="step-inicio-container">
        <p className="step-subtitle">Atualização de dados em 3 passos:</p>
        <div className="step-box">
          <ul className="step-list">
            <li>
              <div className="step-icon">***</div>
              <div className="step-text">
                Confirmar os dados da Empresa existentes na Certidão Permanente
                de Registo Comercial (CRC)
              </div>
            </li>
            <li>
              <div className="step-icon">📄</div>
              <div className="step-text">
                Atualizar os dados da Empresa e informação de atividade
              </div>
            </li>
            <li>
              <div className="step-icon">✔️</div>
              <div className="step-text">Validar todos os dados declarados</div>
            </li>
          </ul>
        </div>
      </div>

      <StepNavigation />
    </div>
  );
};

export default InitialStep;
