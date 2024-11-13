import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const elements = [
    {
        text: 'Краторная булка N-200i (верх)',
        price: 200,
        thumbnail: 'bulka',
    },
    {
        text: 'Соус традиционный галактический',
        price: 30,
        thumbnail: 'sous',
    },
    {
        text: 'Мясо бессмертных моллюсков Protostomia',
        price: 300,
        thumbnail: 'meat',
    },
    {
        text: 'Плоды Фалленианского дерева',
        price: 80,
        thumbnail: 'plod',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Соус традиционный галактический',
        price: 30,
        thumbnail: 'sous',
    },
    {
        text: 'Мясо бессмертных моллюсков Protostomia',
        price: 300,
        thumbnail: 'meat',
    },
    {
        text: 'Плоды Фалленианского дерева',
        price: 80,
        thumbnail: 'plod',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Хрустящие минеральные кольца',
        price: 80,
        thumbnail: 'onion',
    },
    {
        text: 'Краторная булка N-200i (верх)',
        price: 200,
        thumbnail: 'bulka',
    },
];

const BurgerIngredients = () => {
    return (
        <div style={{ flex: 1 }} className='ml-4'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {elements.map((element, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {index !== 0 && index !== elements.length - 1 && <DragIcon type='primary' className='mr-2' />}
                        {(index === 0 || index === elements.length - 1) && <div class='mr-7'>&nbsp;</div>}
                        <ConstructorElement
                            type={ index === 0 ? 'top': ( index === elements.length - 1 ? 'bottom' : '')}
                            isLocked={true}
                            text={element.text}
                            price={element.price}
                            thumbnail={`./ingredients/${element.thumbnail}.png`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BurgerIngredients;
