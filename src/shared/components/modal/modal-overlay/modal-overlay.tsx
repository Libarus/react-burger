import mostyle from './modal-overlay.module.css';

/**
 * Компонент ModalOverlay - это overlay, который закрывает
 * весь сайт, когда открыто модальное окно. Он ловит клик
 * на себя и закрывает модальное окно.
 * @param {{onClose: () => void}} props - props, полученные от родителя
 * @returns {ReactNode} - JSX-элемент overlay
 */
const ModalOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className={mostyle.ModalOverlay} onClick={onClose} />
    );
};

export default ModalOverlay;