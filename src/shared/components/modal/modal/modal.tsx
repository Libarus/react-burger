import ReactDOM from 'react-dom';

import { useEffect } from 'react';

import ModalOverlay from '../modal-overlay/modal-overlay';

import React, { ReactNode } from 'react';

import mstyle from './modal.module.css';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
    header?: string | null;
};

/**
 * Компонент Modal представляет собой модальное окно.
 * @param {ReactNode} children - содержимое модального окна.
 * @param {() => void} onClose - функция закрытия модального окна.
 * @param {string | null} header - заголовок модального окна.
 * @returns {JSX.Element} JSX-элемент модального окна.
 */
const Modal: React.FC<ModalProps> = ({ children, onClose, header = null }) => {
    const handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    return ReactDOM.createPortal(
        <>
            <div className={mstyle.modal}>
                <div className={`${mstyle.header} pb-4`}>
                    {header && <div className='text text_type_main-large pl-4 pt-3'>{header}</div>}
                    <button className={mstyle.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className='p-4'>{children}</div>
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        modalRoot,
    );
};

export default Modal;