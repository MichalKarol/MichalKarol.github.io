import Vue from 'vue';
import Router from 'vue-router';
import Blog from './views/Blog.vue';
import store from '@/store';

Vue.use(Router);


const router = new Router({
  linkActiveClass: 'a is-active',
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Blog,
    }, {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutMe.vue'),
    }, {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
    }, {
      path: '/post/:id',
      name: 'post',
      beforeEnter: (to, from, next) => {
        store.dispatch('getPost', to.params.id);
        next();
      },
      component: () => import('./views/Post.vue'),
      props: true,
    }, {
      path: '*',
      component: () => import('./views/Error.vue'),
    },
  ],
});

export default router;
