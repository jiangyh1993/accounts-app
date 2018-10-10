import { getJSON } from "jquery";
import $ from "jquery";

export const api =
  process.env.REACT_APP_RECORDS_API_URL || "http:localhost:5000";

export const getAll = () => getJSON(`${api}/api/v1/records`);

export const create = body => $.post(`${api}/api/v1/records`, body);
