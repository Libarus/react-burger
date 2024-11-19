import PropTypes from 'prop-types';

const propTypeIngredient = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    bage: PropTypes.number,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
});

export default propTypeIngredient;
