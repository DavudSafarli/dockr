import Vue from "vue";
import { Containers } from './@types';

export const store = Vue.observable({
  containers: {} as Containers,
});

export const mutations = {
  setContainers(containers: Containers) {
    store.containers = containers
  },
}

export const actions = {
  async loadContainers() {
    const containers = await window.api.Container.List()
    mutations.setContainers(containers)
  }
}