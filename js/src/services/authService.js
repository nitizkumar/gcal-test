app.service('authService', function () {

  this.setAuth = function (auth) {
    this.auth = auth;
  }

  this.removeAuth = function () {
    delete this.auth;
  }

  this.isAuthenticated = function () {
    if (this.auth === undefined || this.auth === null) {
      return false;
    }
    return true;
  }
});