'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; 
import { logout } from '../../lib/api/clientApi'; 
import { ReactNode } from 'react';


interface ModalProps {
  onClose: () => void;
  children: ReactNode;
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
      
      await logout();

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