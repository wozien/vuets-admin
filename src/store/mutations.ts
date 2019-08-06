import jwt_decode from 'jwt-decode';

const mutations = {
  SET_USER(state: any, user: any) {
    user = user ? jwt_decode(user) : '';
    state.user = user;
  }
};

export default mutations;
