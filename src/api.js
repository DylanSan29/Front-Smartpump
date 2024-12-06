import axios from 'axios';

const API_URL = "http://localhost:3001/api";
const makeApiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axios({
      method: method,
      url: `${API_URL}${endpoint}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

const getApi = (endpoint) => {
  return makeApiRequest('GET', endpoint);
};

const postApi = (endpoint, data) => {
  return makeApiRequest('POST', endpoint, data);
};

const patchApi = (endpoint, data) => {
  return makeApiRequest('PATCH', endpoint, data);
};

const deleteApi = (endpoint) => {
  return makeApiRequest('DELETE', endpoint);
};

export { getApi, postApi, patchApi, deleteApi };
