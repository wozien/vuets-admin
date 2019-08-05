import jwt_decode from 'jwt-decode';

const mutations = {
  SET_USER(state: any, user: any) {
    const decode = jwt_decode(user);
    state.user = decode;
  }
};

export default mutations;
