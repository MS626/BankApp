import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStepStore } from "../../store/store";
import StepProgress from "../Navigation/stepProgress";
import "../../styles/Step 4/conclusion.css";

const Conclusion: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { setStep, setTitle } = useStepStore();
  const handleRating = (rate: number) => setRating(rate);
  const handleHover = (rate: number) => setHoverRating(rate);
  const handleLeave = () => setHoverRating(0);
  const navigate = useNavigate();

  const handleSend = () => {
    if (feedback.trim()) {
      console.log("Feedback enviado:", { rating, feedback });
    }
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    setStep(4);
    setTitle("Atualizar dados");
  }, [setStep, setTitle]);

  return (
    <div className="conclusion-wrapper">
      <StepProgress />

      <div className="conclusion-container">
        <div className="confirmation">
          <div className="conclusion-check"></div>

          <div className="conclusion-title">
            <strong>Já está!</strong> Agora é connosco
          </div>

          <p className="conclusion-subtitle">
            Vamos validar todos os dados e a documentação{" "}
            <strong>logo que possível.</strong>
            <br /> Se necessário, entramos em contacto consigo.
          </p>
        </div>

        <div className="conclusion-rating">
          <label className="rating-title">Como avalia a sua experiência?</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hoverRating || rating) ? "filled" : "unfilled"
                }`}
                onMouseEnter={() => handleHover(star)}
                onMouseLeave={handleLeave}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="textarea"
            placeholder="Tem alguma sugestão?"
            maxLength={250}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="char-counter">{feedback.length}/250</div>
          <div>
            <button
              className={`conclusion-buttons ${
                feedback.trim() ? "enabled" : ""
              }`}
              onClick={handleSend}
              disabled={!feedback.trim()}
            >
              Enviar
            </button>
          </div>
        </div>

        <div className="final-btn">
          <button className="go-home-btn" onClick={handleGoHome}>
            Ir para a página inicial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
