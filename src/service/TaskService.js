import axios from 'axios';

class TaskService {
  baseUrl = "http://localhost:9001/task";
  token = localStorage.getItem("token");

  addTask(data) {
    return axios.post(`${this.baseUrl}/add?token=${this.token}`, data);
  }

  getAll() {
    return axios.get(`${this.baseUrl}/getAll?token=${this.token}`);
  }

  updateTask(taskId) {
    return axios.put(`${this.baseUrl}/update?taskId=${taskId}`);
  }

  deleteTask(id) {
    return axios.delete(`${this.baseUrl}/delete?taskId=${id}`);
  }

editTask(taskId, data) {
  return axios.put(`${this.baseUrl}/edit?taskId=${taskId}`, data);
}
// title
// startdate
// enddate
// description
// status
}

export default new TaskService();