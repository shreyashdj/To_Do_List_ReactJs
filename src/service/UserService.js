import axios from 'axios';

class UserService {
  baseUrl = "http://localhost:9001/user";

  login(data) {
    return axios.post(`${this.baseUrl}/login`, data);
  }

  addUser(data) {
    return axios.post(`${this.baseUrl}/add`, data);
  }
}

export default new UserService();