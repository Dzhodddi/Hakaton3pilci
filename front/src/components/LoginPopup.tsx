import React, { useRef, useEffect } from 'react';
import { Button } from './Button';
import { GoogleIcon } from './GoogleIcon';
import '../styles/loginpopup.css';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLogin: () => void;
}

export function LoginPopup({ isOpen, onClose, onGoogleLogin }: LoginPopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (isOpen) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
    }
  }, [isOpen]);

  const handleClosePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog className="login-popup" ref={dialogRef} onClose={onClose}>
      <div className="login-popup-content">
        <h3>Log in using your Google account</h3>
        
        <button className="google-oauth-btn" onClick={onGoogleLogin}>
          <GoogleIcon />
          <span>Google OAuth</span>
        </button>
        
        <Button 
          variant='solid' 
          color='primary' 
          onClick={handleClosePopup}
          fullWidth={true}
        >
          Return
        </Button>
      </div>
    </dialog>
  );
}