import Vue from 'vue';
import Vuex from 'vuex';
import { HttpResponse } from 'vue-resource/types/vue_resource';
import Post from './models/post';
import Project from './models/project';


Vue.use(Vuex);

const SOURCES_URL = '/sources';

export default new Vuex.Store({
  state: {
    posts: {},
    projects: {},
  },
  mutations: {
    addPosts(state: any, posts: Post[]) {
      Vue.set(state, 'posts',
        posts.reduce((acc: {[id: string]: Post}, post: Post) =>
          Object.assign(acc, {[post.file]: post}), {}),
      );
    },
    addProjects(state: any, projects: Project[]) {
      Vue.set(state, 'projects',
      projects.reduce((acc: {[id: string]: Project}, project: Project) =>
           Object.assign(acc, {[project.key]: project}), {}),
      );
    },
    addPostText(state: any, [key, text]: [string, string]) {
      Vue.set(state.posts[key], 'text', text);
    },
  },
  actions: {
    initPosts({ commit }) {
      (Vue as any).http.get(`${SOURCES_URL}/posts.json`)
        .then((response: HttpResponse) => response.json())
        .then((posts: Post[]) => commit('addPosts', posts.reverse()));
    },
    initProjects({ commit }) {
      (Vue as any).http.get(`${SOURCES_URL}/projects.json`)
        .then((response: HttpResponse) => response.json())
        .then((projects: Project[]) => commit('addProjects', projects));
    },
    getPost({ commit, state }, key: string) {
      const textDownload = () =>
        (Vue as any).http.get(`${SOURCES_URL}/${key}`)
        .then((response: HttpResponse) => response.text())
        .then((text: string) => commit('addPostText', [key, text]));

      if (!state.posts[key]) {
        this.watch(
          (watchedState) => watchedState.posts[key],
          (value) => {
            textDownload();
          });
      } else if (!state.posts[key].text) {
        textDownload();
      }
    },
  },
});
