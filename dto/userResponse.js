// DTO
class UserResponse {
    constructor(user) {
      this.id = user.id
      this.username = user.username;
      this.fullname = user.fullname;
      this.email = user.email;
      this.balance = user.balance;
      this.avatar_url = user.avatar_url;
    }
  }
  
  module.exports = { UserResponse };