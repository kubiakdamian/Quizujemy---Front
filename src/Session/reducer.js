const initialStateUser = {
  user: {}
};

const session = (state = initialStateUser, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.data };
    case "LOGOUT":
      return { user: {} };
    default:
      return state;
  }
};

export default session;