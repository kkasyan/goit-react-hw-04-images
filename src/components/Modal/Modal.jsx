import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

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

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img className={css.modalImage} src={image} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//     if (e.currentTarget !== e.target) {
//       return;
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     const { image } = this.props;
//     const { handleBackdropClick } = this;

//     return createPortal(
//       <div className={css.overlay} onClick={handleBackdropClick}>
//         <div className={css.modal}>
//           <img className={css.modalImage} src={image} alt="" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
