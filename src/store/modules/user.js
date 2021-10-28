
const state = {
  user_info: {}
};

const mutations = {
  setInfo (state, data) { // this.$store.commit('user/setInfo', Info)
    state.user_info = data
  }
};

const getters = {
  getInfo ({ user_info }) { // this.$store.getters['user/getInfo']
    return user_info
  },
};

const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
