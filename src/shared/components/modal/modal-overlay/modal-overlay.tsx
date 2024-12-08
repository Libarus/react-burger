import mostyle from './modal-overlay.module.css';

interface Props {
    onClose: () => void;
}

/**
 * Компонент "Подложка модального окна"
 */
export function ModalOverlay({ onClose }: Props) {
    return <div className={mostyle.ModalOverlay} onClick={onClose} />;
}
