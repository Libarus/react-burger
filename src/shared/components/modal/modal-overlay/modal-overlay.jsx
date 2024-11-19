import PropTypes from 'prop-types';

import mostyle from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
    return (
        <div className={mostyle.ModalOverlay} onClick={onClose} />
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
};

export default ModalOverlay;