import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, 
  faHome, 
  faBullseye, 
  faGlobe, 
  faCoffee, 
  faPlay,
  faCheck,
  faChevronRight,
  faLaptop
} from '@fortawesome/free-solid-svg-icons';
import type { Transaction, WalletData } from '../types';
import { formatTransactionDate } from '../utils/dateUtils';
import { calculateDailyPoints, formatPoints } from '../utils/pointsCalculator';
import walletDataRaw from '../data/transactions.json';

const iconMap: { [key: string]: typeof faCreditCard } = {
  apple: faLaptop,
  'credit-card': faCreditCard,
  home: faHome,
  bullseye: faBullseye,
  globe: faGlobe,
  coffee: faCoffee,
  play: faPlay,
};

const TransactionsList: React.FC = () => {
  const navigate = useNavigate();
  const data: WalletData = walletDataRaw as WalletData;
  const available = data.cardLimit - data.cardBalance;
  const dailyPoints = calculateDailyPoints();
  const formattedPoints = formatPoints(dailyPoints);

  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transaction/${transaction.id}`, { state: { transaction } });
  };

  const getRandomColor = () => {
    const colors = ['#333', '#555', '#777', '#999', '#2c3e50', '#34495e', '#7f8c8d'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="transactions-list">
      {/* Header Cards Container */}
      <div className="header-cards-container">
        {/* Left Column - Card Balance and Daily Points */}
        <div className="left-column">
          {/* Card Balance Block */}
          <div className="card-balance-block">
            <div className="balance-info">
              <h2>Card Balance</h2>
              <div className="balance-amount">${data.cardBalance.toFixed(2)}</div>
              <div className="available-amount">${available.toFixed(2)} Available</div>
            </div>
          </div>

          {/* Daily Points Block */}
          <div className="daily-points-block">
            <div className="daily-points-content">
              <div>
                <h3>Daily Points</h3>
                <div className="points-amount">{formattedPoints}</div>
              </div>
              <div className="daily-points-check">
                <div className="check-icon">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Due */}
        <div className="payment-due-block">
          <div>
            <h3>No Payment Due</h3>
            <p>You've paid your September balance.</p>
          </div>
          <div className="check-icon">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
      </div>

      {/* Latest Transactions Block */}
      <div className="transactions-block">
        <h2>Latest Transactions</h2>
        <div className="transactions-list-container">
          {data.transactions.slice(0, 7).map((transaction) => (
            <div 
              key={transaction.id} 
              className="transaction-item"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="transaction-icon" style={{ backgroundColor: getRandomColor() }}>
                <FontAwesomeIcon 
                  icon={iconMap[transaction.icon] || faCreditCard} 
                  color="white"
                />
              </div>
              <div className="transaction-details">
                <div className="transaction-header">
                  <span className="transaction-name">{transaction.name}</span>
                  <span className="transaction-amount">
                    {transaction.type === 'Payment' ? '+' : ''}${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="transaction-meta">
                  <span className="transaction-description">
                    {transaction.isPending && 'Pending - '}
                    {transaction.description}
                  </span>
                  {transaction.cashbackPercentage && (
                    <span className="cashback-percentage">
                      {transaction.cashbackPercentage}%
                    </span>
                  )}
                </div>
                <div className="transaction-date">
                  {transaction.authorizedUser && `${transaction.authorizedUser} — `}
                  {formatTransactionDate(transaction.date)}
                </div>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;