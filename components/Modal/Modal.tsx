'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; // Переконайтеся, що шлях правильний

interface ModalProps {
  onClose: () => void;
}


const clearLocalUserData = () => {
  
  localStorage.removeItem('user'); 
};

export default function Modal({ onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'; 
      
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Помилка при виході з системи');
      }

   
      clearLocalUserData();

      console.log('Вихід пройшов успішно');
    
      onClose(); 
      router.push('/'); 
      
    } catch (error) {
      console.error('Помилка при виході:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <ConfirmModal
      title="Ви точно хочете вийти?"
      text="Ми будемо сумувати за вами!"
      cancelButtonText="Відмінити"
      confirmButtonText={isLoading ? "Виходимо..." : "Вийти"}
      onCancel={onClose}
      onConfirm={handleLogout}
    />
  );
}