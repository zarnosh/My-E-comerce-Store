import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

const Toast: React.FC = () => {
    const { toast } = useAppContext();

    if (!toast) {
        return null;
    }

    const isSuccess = toast.type === 'success';

    return (
        <div className={`fixed top-24 right-5 z-[100] transform transition-transform duration-300 ${toast ? 'translate-x-0' : 'translate-x-[120%]'}`}>
            <div className={`flex items-center p-4 rounded-lg shadow-lg text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
                <div className="mr-3">
                    {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
                </div>
                <span>{toast.message}</span>
            </div>
        </div>
    );
};

export default Toast;
