export const ROUTES: Record<string, string> = {
    ROOT: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    INGREDIENTS: '/ingredients/:id',
    PROFILE: '/profile',
    ORDERS: '/profile/orders',
    ORDER: '/profile/orders/:id',
    FEEDS: '/feed',
    FEED: '/feed/:id',
} as const;
