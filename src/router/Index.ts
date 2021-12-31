import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Index.vue')
    },
    {
        path: '/Identity/Account/Login',
        name: 'IdentityAccountLogin',
        component: () => import('@/views/identity/account/Login.vue')
    },
    {
        path: '/Identity/Account/Register',
        name: 'IdentityAccountRegister',
        component: () => import('@/views/identity/account/Register.vue')
    },
    {
        path: '/Cart',
        name: 'CartIndex',
        component: () => import('@/views/cart/Index.vue')
    },
    {
        path: '/Cart/Shipping',
        name: 'CartShipping',
        component: () => import('@/views/cart/Shipping.vue')
    },
    {
        path: '/Categories',
        name: 'CategoriesIndex',
        component: () => import('@/views/categories/Index.vue')
    },
    {
        path: '/Categories/Create',
        name: 'CategoriesCreate',
        component: () => import('@/views/categories/Create.vue')
    },
    {
        path: '/Categories/Delete/:id',
        name: 'CategoriesDelete',
        component: () => import('@/views/categories/Delete.vue')
    },
    {
        path: '/Categories/Details/:id',
        name: 'CategoriesDetails',
        component: () => import('@/views/categories/Details.vue')
    },
    {
        path: '/Categories/Edit/:id',
        name: 'CategoriesEdit',
        component: () => import('@/views/categories/Edit.vue')
    },
    {
        path: '/Checkout',
        name: 'CheckoutIndex',
        component: () => import('@/views/checkout/Index.vue')
    },
    {
        path: '/Checkout/Failure',
        name: 'CheckoutFailure',
        component: () => import('@/views/checkout/Failure.vue')
    },
    {
        path: '/Checkout/Success/:id',
        name: 'CheckoutSuccess',
        component: () => import('@/views/checkout/Success.vue')
    },
    {
        path: '/Locations',
        name: 'LocationsIndex',
        component: () => import('@/views/locations/Index.vue')
    },
    {
        path: '/Locations/Create',
        name: 'LocationsCreate',
        component: () => import('@/views/locations/Create.vue')
    },
    {
        path: '/Locations/Delete/:id',
        name: 'LocationsDelete',
        component: () => import('@/views/locations/Delete.vue')
    },
    {
        path: '/Locations/Details/:id',
        name: 'LocationsDetails',
        component: () => import('@/views/locations/Details.vue')
    },
    {
        path: '/Locations/Edit/:id',
        name: 'LocationsEdit',
        component: () => import('@/views/locations/Edit.vue')
    },
    {
        path: '/OrderProducts',
        name: 'OrderProductsIndex',
        component: () => import('@/views/orderproducts/Index.vue')
    },
    {
        path: '/OrderProducts/Create',
        name: 'OrderProductsCreate',
        component: () => import('@/views/orderproducts/Create.vue')
    },
    {
        path: '/OrderProducts/Delete/:id',
        name: 'OrderProductsDelete',
        component: () => import('@/views/orderproducts/Delete.vue')
    },
    {
        path: '/OrderProducts/Details/:id',
        name: 'OrderProductsDetails',
        component: () => import('@/views/orderproducts/Details.vue')
    },
    {
        path: '/OrderProducts/Edit/:id',
        name: 'OrderProductsEdit',
        component: () => import('@/views/orderproducts/Edit.vue')
    },
    {
        path: '/Orders',
        name: 'OrdersIndex',
        component: () => import('@/views/orders/Index.vue')
    },
    {
        path: '/Orders/Create',
        name: 'OrdersCreate',
        component: () => import('@/views/orders/Create.vue')
    },
    {
        path: '/Orders/Delete/:id',
        name: 'OrdersDelete',
        component: () => import('@/views/orders/Delete.vue')
    },
    {
        path: '/Orders/Details/:id',
        name: 'OrdersDetails',
        component: () => import('@/views/orders/Details.vue')
    },
    {
        path: '/Orders/Edit/:id',
        name: 'OrdersEdit',
        component: () => import('@/views/orders/Edit.vue')
    },
    {
        path: '/Pictures',
        name: 'PicturesIndex',
        component: () => import('@/views/pictures/Index.vue')
    },
    {
        path: '/Pictures/Create/:id',
        name: 'PicturesCreate',
        component: () => import('@/views/pictures/Create.vue')
    },
    {
        path: '/Pictures/Delete/:id',
        name: 'PicturesDelete',
        component: () => import('@/views/pictures/Delete.vue')
    },
    {
        path: '/Products',
        name: 'ProductsIndex',
        component: () => import('@/views/products/Index.vue')
    },
    {
        path: '/Products/Create',
        name: 'ProductsCreate',
        component: () => import('@/views/products/Create.vue')
    },
    {
        path: '/Products/Delete/:id',
        name: 'ProductsDelete',
        component: () => import('@/views/products/Delete.vue')
    },
    {
        path: '/Products/Details/:id',
        name: 'ProductsDetails',
        component: () => import('@/views/products/Details.vue')
    },
    {
        path: '/Products/Edit/:id',
        name: 'ProductsEdit',
        component: () => import('@/views/products/Edit.vue')
    },
    {
        path: '/Providers',
        name: 'ProvidersIndex',
        component: () => import('@/views/providers/Index.vue')
    },
    {
        path: '/Providers/Create',
        name: 'ProvidersCreate',
        component: () => import('@/views/providers/Create.vue')
    },
    {
        path: '/Providers/Delete/:id',
        name: 'ProvidersDelete',
        component: () => import('@/views/providers/Delete.vue')
    },
    {
        path: '/Providers/Details/:id',
        name: 'ProvidersDetails',
        component: () => import('@/views/providers/Details.vue')
    },
    {
        path: '/Providers/Edit/:id',
        name: 'ProvidersEdit',
        component: () => import('@/views/providers/Edit.vue')
    },
    {
        path: '/Statuses',
        name: 'StatusesIndex',
        component: () => import('@/views/statuses/Index.vue')
    },
    {
        path: '/Statuses/Create',
        name: 'StatusesCreate',
        component: () => import('@/views/statuses/Create.vue')
    },
    {
        path: '/Statuses/Delete/:id',
        name: 'StatusesDelete',
        component: () => import('@/views/statuses/Delete.vue')
    },
    {
        path: '/Statuses/Details/:id',
        name: 'StatusesDetails',
        component: () => import('@/views/statuses/Details.vue')
    },
    {
        path: '/Statuses/Edit/:id',
        name: 'StatusesEdit',
        component: () => import('@/views/statuses/Edit.vue')
    },
    {
        path: '/Transactions',
        name: 'TransactionsIndex',
        component: () => import('@/views/transactions/Index.vue')
    },
    {
        path: '/Transactions/Create',
        name: 'TransactionsCreate',
        component: () => import('@/views/transactions/Create.vue')
    },
    {
        path: '/Transactions/Delete/:id',
        name: 'TransactionsDelete',
        component: () => import('@/views/transactions/Delete.vue')
    },
    {
        path: '/Transactions/Details/:id',
        name: 'TransactionsDetails',
        component: () => import('@/views/transactions/Details.vue')
    },
    {
        path: '/Transactions/Edit/:id',
        name: 'TransactionsEdit',
        component: () => import('@/views/transactions/Edit.vue')
    }
];

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
