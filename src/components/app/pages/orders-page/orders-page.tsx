import { Link } from 'react-router-dom';

export function OrdersPage() {
    return (
        <>
            <div>Orders</div>
            <div className='pt-6'>
                <Link
                    to='/profile/orders/543'
                    className='text text_type_main-small'
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    Order detail is 543
                </Link>
            </div>
        </>
    );
}
