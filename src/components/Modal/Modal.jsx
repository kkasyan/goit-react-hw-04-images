import { useEffect } from 'react';
import css from './modal.module.css';

export const Modal = ({ image, closeModal }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
      if (e.currentTarget !== e.target) {
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img className={css.modalImage} src={image} alt="" />
      </div>
    </div>
  );
};
