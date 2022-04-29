import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3007";

// API Class  that contains helper methods with AJAX calls
////////////////////////////////////////////////////////////////

class GoodHabitsApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // token is passed in the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GoodHabitsApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  ///////////////////////////////////////////////////////////////////
  
  // Get user details by username
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Get token for login from username, password.
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  // Signup for site.
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  // Create a new habit
  static async createHabit(data) {
    let res = await this.request(`habits/${data.username}`, data, "post");
    return res.habit;
  }

  // Update an id-habit
  static async getHabit(id, username) {
    let res = await this.request(`habits/${username}/${id}`);
    return res.habit;
  }

  // Update an id-habit
  static async updateHabit(id, username, data) {
    let res = await this.request(`habits/${username}/${id}`, data, "patch");
    return res.habit;
  }

  // Checked an id-habit
  static async checkHabit(id, username, data) {
    console.log("update id-habit in API, id =", id , "username=", username, "data=", data);
    let res = await this.request(`habits/${username}/${id}/checked`, data, "patch");
    console.log("result after update in API", res.habit);
    return res.habit;
  }

  // Delete a habit by id
  static async removeHabit(id, username) {
    await this.request(`habits/${username}/${id}`, {}, "delete");
  }

}

// for debugging purposes, token is put ("testuser" / "password" on class)
// GoodHabitsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwia" + 
//     "XNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0OTk4MTM4OH0.Q-_tKzwP2dW1O0-wFJ3Az6CqdW_zUPax38jp-T2m5fw"


export default GoodHabitsApi;