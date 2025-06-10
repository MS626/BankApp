import React, { useEffect, useState } from "react";
import useMovementsStore from "../store/store";
import MiniHeader from "./miniHeader";
import MessageModal from "./Modal/mesageModal";
import { useAccountSummary } from "./Hook/useSummary";
import { useLocation } from "react-router-dom";
import "../styles/homepage.css";

const HomePage: React.FC = () => {
  const movements = useMovementsStore((state) => state.movements);
  const [showModal, setShowModal] = useState(false);

  const { summary } = useAccountSummary();
  const location = useLocation();

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (location.state?.fromConclusion) {
      setShowAlert(false);
    }
    window.history.replaceState({}, document.title);
  }, [location.state]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div className="homepage">
      <MiniHeader />

      <div className="space-top"></div>

      {showAlert && (
        <div className="alert-box">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <p className="alert-title">
              <strong>Precisamos que atualize os dados da Empresa!</strong>
            </p>
            <p className="alert-text">
              Lembre-se que deve ter todos os elementos identificativos
              atualizados, caso contrário pode perder acesso a fazer transações
              e outras
              <span className="break-on-large"> funcionalidades. </span>
            </p>
            <a href="/update" className="alert-link">
              Saiba o que fazer aqui →
            </a>
          </div>
        </div>
      )}

      <div className="space-button">
        <button className="button-account" onClick={() => setShowModal(true)}>
          Mudar conta
        </button>
      </div>

      <div className="account-section">
        <div className="account-box">
          <div className="account-header">
            <span className="bank-logo">🏦</span>
            <div>
              <div className="bank-name">{summary?.account.bankName}</div>
              <div className="bank-id">{summary?.account.bankId}</div>
            </div>
          </div>

          <div className="account-balance">
            <div className="label">Saldo disponível</div>
            <div className="value">{summary?.account.availableBalance} EUR</div>
            <div className="sub">
              Saldo contabilístico {summary?.account.bookBalance} EUR
            </div>
          </div>

          <div
            className="account-detail"
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          >
            Ver detalhe &gt;
          </div>
        </div>

        <div className="account-stats">
          <div className="stat-card">
            <div className="icons-stat">
              <div className="stat-icon">↓</div>
              <div className="stat-title">Entradas</div>
            </div>
            <div className="numbers-stat">
              <div className="stat-today">Hoje</div>
              <div className="stat-value">{summary?.entries.today} EUR</div>
              <div className="stat-sub">
                Este mês {summary?.entries.thisMonth} EUR
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="icons-stat">
              <div className="stat-icon">↑</div>
              <div className="stat-title">Saídas</div>
            </div>
            <div className="numbers-stat"></div>
            <div className="stat-today">Hoje</div>
            <div className="stat-value">{summary?.exits.today} EUR</div>
            <div className="stat-sub">
              Este mês {summary?.exits.thisMonth} EUR
            </div>
          </div>
        </div>
      </div>

      <div className="space-movements"></div>

      <div className="movements-container">
        <div className="movements-header">
          <h2>Últimos movimentos</h2>
          <a
            href="#"
            className="view-all"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            Ver todos os movimentos
          </a>
        </div>

        {movements.map((mov, idx) => (
          <div className="movement-row" key={idx}>
            <div className="movement-icon">
              {mov.icons.includes("doc") && "📄"}
            </div>
            <div className="movement-date">{mov.date}</div>
            <div className="movement-desc">
              <strong>{mov.desc}</strong>
            </div>
            <div className="movement-icons">
              {mov.icons.includes("check") && "✔️"}
              <div className="space-icons"></div>
              {mov.icons.includes("chat") && "💬"}
            </div>
            <div className="movement-actions">
              <div
                className={`movement-amount ${
                  mov.amount < 0 ? "negative" : "positive"
                }`}
              >
                {mov.amount < 0 ? "-" : ""}
                {Math.abs(mov.amount).toFixed(2).replace(".", ",")} EUR
              </div>
              <div className="movement-sub">{mov.total}</div>
            </div>
            <div className="movement-arrow">&gt;</div>
          </div>
        ))}
      </div>

      <div className="space-movements"></div>

      <MessageModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Funcionalidade em desenvolvimento"
        message="Esta funcionalidade ainda está em desenvolvimento"
        hideCloseButton={true}
      />
    </div>
  );
};

export default HomePage;
