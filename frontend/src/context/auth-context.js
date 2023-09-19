import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  username: null,
  password: null,
  type: null,
  logoutHandler: function () {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      this.username = null;
      this.password = null;
      this.type = null;
    }
  },
});

export default AuthContext;
