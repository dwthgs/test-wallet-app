import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import type { Transaction } from "../types";
import { formatDetailDate } from "../utils/dateUtils";

const TransactionDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = location.state?.transaction as Transaction;

  if (!transaction) {
    return (
      <div className="transaction-detail">
        <div className="header">
          <button onClick={() => navigate("/")} className="back-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="error">Transaction not found</div>
      </div>
    );
  }

  return (
    <div className="transaction-detail">
      <div className="header">
        <button onClick={() => navigate("/")} className="back-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className="transaction-amount">${transaction.amount.toFixed(2)}</div>

      <div className="transaction-info">
        <div className="merchant-name">{transaction.name}</div>
        <div className="transaction-date">
          {formatDetailDate(transaction.date)}
        </div>
      </div>
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <div className="transaction-status">
          <div className="status-row">
            <span className="label">Status:</span>
            <span className="value">
              {transaction.isPending ? "Pending" : "Approved"}
            </span>
          </div>
          <div className="card-info">{transaction.description}</div>
        </div>

        <div className="transaction-total">
          <div className="total-row">
            <span className="label">Total</span>
            <span className="amount">${transaction.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
