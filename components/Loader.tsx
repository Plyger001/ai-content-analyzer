
import React from 'react';

interface Props {
  message?: string;
}

export const Loader: React.FC<Props> = ({ message = "Processing..." }) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-indigo-600/10 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-slate-900">{message}</p>
        <p className="text-sm text-slate-500">This usually takes about 3-5 seconds</p>
      </div>
    </div>
  );
};
