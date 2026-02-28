'use client';

import { useEffect, MouseEvent } from 'react';
import css from './ConfirmModal.module.css';

interface ConfirmModalProps {
  title: string;
  text?: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  
 
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('bodyLock'); 

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);

    
    return () => {
      document.body.classList.remove('bodyLock');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onCancel]);

  
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      
      <div className={css.modalContainer}>
        
        
        <button
          type="button"
          className={css.closeButton}
          onClick={onCancel}
          aria-label="Закрити модальне вікно"
        >
         
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={css.content}>
          <h2 className={css.title}>{title}</h2>
          {text && <p className={css.text}>{text}</p>}
        </div>

        
        <div className={css.buttonGroup}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCancel} 
          >
            {cancelButtonText}
          </button>
          
          <button
            type="button"
            className={css.confirmButton}
            onClick={onConfirm} 
          >
            {confirmButtonText}
          </button>
        </div>
        
      </div>
    </div>
  );
}