import React from "react";
import useMovementsStore from "../store/store";
import MiniHeader from "./miniHeader";
import "../styles/homepage.css";

const HomePage: React.FC = () => {
  const movements = useMovementsStore((state) => state.movements);

  return (
    <div className="homepage">
      <MiniHeader />

      <div className="space-top"></div>

      <div className="alert-box">
        <div className="alert-icon">⚠️</div>
        <div className="alert-content">
          <p className="alert-title">
            <strong>Precisamos que atualize os dados da Empresa!</strong>
          </p>
          <p className="alert-text">
            Lembre-se que deve ter todos os elementos identificativos
            atualizados, caso contrário pode perder acesso a fazer transações e
            outras
            <span className="break-on-large"> funcionalidades. </span>
          </p>
          <a href="/update" className="alert-link">
            Saiba o que fazer aqui →
          </a>
        </div>
      </div>

      <div className="space-button">
        <button className="button-account">Mudar conta</button>
      </div>

      <div className="account-section">
        <div className="account-box">
          <div className="account-header">
            <span className="bank-logo">🏦</span>
            <div>
              <div className="bank-name">ITSector</div>
              <div className="bank-id">378 424 438 1</div>
            </div>
          </div>

          <div className="account-balance">
            <div className="label">Saldo disponível</div>
            <div className="value">
              8.400.000<span>,00</span> EUR
            </div>
            <div className="sub">Saldo contabilístico 10.000.000,00 EUR</div>
          </div>

          <div className="account-detail">Ver detalhe &gt;</div>
        </div>

        <div className="account-stats">
          <div className="stat-card">
            <div className="icons-stat">
              <div className="stat-icon">↓</div>
              <div className="stat-title">Entradas</div>
            </div>
            <div className="numbers-stat">
              <div className="stat-today">Hoje</div>
              <div className="stat-value">
                50.700.000<span>,00</span> EUR
              </div>
              <div className="stat-sub">Este mês 10.000.000,00 EUR</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="icons-stat">
              <div className="stat-icon">↑</div>
              <div className="stat-title">Saídas</div>
            </div>
            <div className="numbers-stat"></div>
            <div className="stat-today">Hoje</div>
            <div className="stat-value">
              42.300.000<span>,00</span> EUR
            </div>
            <div className="stat-sub">Este mês 10.000.000,00 EUR</div>
          </div>
        </div>
      </div>

      <div className="space-movements"></div>

      <div className="movements-container">
        <div className="movements-header">
          <h2>Últimos movimentos</h2>
           <a href="#" className="view-all">
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
    </div>
  );
};

export default HomePage;
