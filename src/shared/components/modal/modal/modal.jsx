import ReactDOM from 'react-dom';

import { useEffect } from 'react';

import ModalOverlay from '../modal-overlay/modal-overlay';

import mstyle from './modal.module.css';

import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, onClose, header = null }) => {
    const handleKeyDown = (event) => {
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

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node,
};

export default Modal;
