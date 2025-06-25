import React from 'react';

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <div>{text}</div>
    </div>
  );
};

export default Loading;
