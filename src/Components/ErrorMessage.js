import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-card">
      <span className="error-icon">&#9888;</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
