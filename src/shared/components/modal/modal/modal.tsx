import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import mstyle from './modal.module.css';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    header?: string | null;
};

/**
 * Компонент "Модальное окно"
 */
export function Modal({ children, onClose, header = null }: Props) {
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
}
