'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; // Переконайтеся, що шлях правильний

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      // 1. Запит на бекенд
      // Замініть 'http://localhost:3000/api' на вашу базову URL або використовуйте змінну оточення
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'; 
      
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        // ЦЕ НАЙВАЖЛИВІШИЙ РЯДОК! Він змушує браузер відправити ваші кукі (sessionId) на сервер
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Помилка при виході з системи');
      }

      // 2. Очищення локальних даних
      // Оскільки бекенд сам очистив кукі (res.clearCookie), нам залишається лише
      // очистити дані юзера з localStorage (ЯКЩО ви зберігаєте там об'єкт user після логіну)
      localStorage.removeItem('user'); 
      
      // Якщо у вас є AuthProvider (контекст), тут потрібно викликати функцію очищення стану
      // наприклад: clearUserContext();

      console.log('Вихід пройшов успішно');
      
      // 3. Закриваємо модалку
      onClose(); 
      
      // 4. Перенаправляємо на головну
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