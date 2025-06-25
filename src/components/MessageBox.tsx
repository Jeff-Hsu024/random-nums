import React from 'react';

interface MessageBoxProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ type, message }) => {
  let backgroundColor = 'bg-gray-100';
  let borderColor = 'border-gray-400';
  let textColor = 'text-gray-700';

  switch (type) {
    case 'success':
      backgroundColor = 'bg-green-100';
      borderColor = 'border-green-400';
      textColor = 'text-green-700';
      break;
    case 'info':
      backgroundColor = 'bg-blue-100';
      borderColor = 'border-blue-400';
      textColor = 'text-blue-700';
      break;
    case 'warning':
      backgroundColor = 'bg-yellow-100';
      borderColor = 'border-yellow-400';
      textColor = 'text-yellow-700';
      break;
    case 'error':
      backgroundColor = 'bg-red-100';
      borderColor = 'border-red-400';
      textColor = 'text-red-700';
      break;
    default:
      break;
  }

  return (
    <div className={`\${backgroundColor} \${borderColor} \${textColor} border px-4 py-3 rounded relative`} role="alert">
      <strong className="font-bold">{type.toUpperCase()}!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default MessageBox;
