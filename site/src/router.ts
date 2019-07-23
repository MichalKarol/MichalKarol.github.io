import Vue from 'vue';
import Router from 'vue-router';
import Blog from './views/Blog.vue';
import EventBus from '@/event-bus';
import store from '@/store';

Vue.use(Router);


const router = new Router({
  linkActiveClass: 'a is-active',
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Blog,
      meta: {
        title: 'Blog',
      },
    }, {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About Me',
      },
      component: () => import('./views/AboutMe.vue'),
    }, {
      path: '/projects',
      name: 'projects',
      meta: {
        title: 'Projects',
      },
      component: () => import('./views/Projects.vue'),
    }, {
      path: '/post/:id',
      name: 'post',
      meta: {
        title: '',
      },
      beforeEnter: (to, from, next) => {
        store.dispatch('getPost', to.params.id);
        next();
      },
      component: () => import('./views/Post.vue'),
      props: true,
    }, {
      path: '*',
      meta: {
        title: 'Error',
      },
      component: () => import('./views/404.vue'),
    },
  ],
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
  EventBus.$emit('header-change', to.meta.title);
});

export default router;
