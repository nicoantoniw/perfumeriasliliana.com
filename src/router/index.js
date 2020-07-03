import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignUp from '../components/SignUp.vue';
import Product from '../components/Product.vue';
import Products from '../components/Products.vue';
import Cart from '../components/Cart.vue';
import AdminProducts from '../components/admin/AdminProducts.vue';
import AdminCategories from '../components/admin/AdminCategories.vue';
import Options from '../components/admin/Options.vue';
import Variants from '../components/admin/Variants.vue';
import WebsiteProducts from '../components/admin/WebsiteProducts.vue';
import FeaturedProducts from '../components/admin/FeaturedProducts.vue';
import PromotionProducts from '../components/admin/PromotionProducts.vue';
import Users from '../components/admin/Users.vue';
import Order from '../components/admin/Order.vue';
import PaymentSuccess from '../components/payments/PaymentSuccess.vue';
import PaymentError from '../components/payments/PaymentError.vue';
import Orders from '../components/Orders.vue';
import Faqs from '../components/Faqs.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Stores from '../components/Stores.vue';
import Profile from '../components/Profile.vue';
import Forgot from '../components/Forgot.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      free: true
    }
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp,
    meta: {
      free: true
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
    meta: {
      free: true
    }
  },
  {
    path: '/producto/:productId',
    name: 'product',
    component: Product,
    meta: {
      free: true
    }
  },
  {
    path: '/productos/:category',
    name: 'products',
    component: Products,
    meta: {
      free: true
    }
  },
  {
    path: '/carrito',
    name: 'cart',
    component: Cart,
    meta: {
      isAuthenticated: true,
      isAdmin: true
    }
  },
  {
    path: '/compras',
    name: 'orders',
    component: Orders,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/perfil',
    name: 'profile',
    component: Profile,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: Faqs,
    meta: {
      free: true
    }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: Contact,
    meta: {
      free: true
    }
  },
  {
    path: '/acerca',
    name: 'about',
    component: About,
    meta: {
      free: true
    }
  },
  {
    path: '/stores',
    name: 'stores',
    component: Stores,
    meta: {
      free: true
    }
  },
  {
    path: '/payment/success',
    name: 'paymentSuccess',
    component: PaymentSuccess,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/payment/error',
    name: 'paymentError',
    component: PaymentError,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/admin/products',
    name: 'adminProducts',
    component: AdminProducts,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/website-products',
    name: 'websiteProducts',
    component: WebsiteProducts,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/categories',
    name: 'adminCategories',
    component: AdminCategories,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/options',
    name: 'options',
    component: Options,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/variants/:productId',
    name: 'variants',
    component: Variants,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/featured-products',
    name: 'featuredProducts',
    component: FeaturedProducts,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/promotion-products',
    name: 'promotionProducts',
    component: PromotionProducts,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/users',
    name: 'users',
    component: Users,
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/orders',
    name: 'order',
    component: Order,
    meta: {
      isAdmin: true
    }
  },
  { path: '*', redirect: '/' }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.free)) {
    next();
  }
  else if (localStorage.getItem('role') === 'admin') {
    if (to.matched.some(record => record.meta.isAdmin))
      next();
  } else if (localStorage.getItem('token') !== null) {
    if (to.matched.some(record => record.meta.isAuthenticated))
      next();
  } else {
    next('/');
  }
});

export default router;
