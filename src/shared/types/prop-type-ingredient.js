import PropTypes from 'prop-types';

const propTypeIngredient = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
});

export default propTypeIngredient;
