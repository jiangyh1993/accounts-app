import { getJSON } from "jquery";
import $ from "jquery";
import axios from "axios";

export const api =
  process.env.REACT_APP_RECORDS_API_URL || "http:localhost:5000";

export const getAll = () => getJSON(`${api}/api/v1/records`);

export const create = body => $.post(`${api}/api/v1/records`, body);

export const update = (id, body) =>
  axios.put(`${api}/api/v1/records/${id}`, body);

export const remove = id => axios.delete(`${api}/api/v1/records/${id}`);
