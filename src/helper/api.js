import { APIRoutePath } from "../utils/config";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_JIKEN_URL,
  timeout: 31000,
  headers: {
    Accept: "application/json",
  },
});

/* Get Section */
export const getAllAnime = async(data) => {
  return await AxiosInstance.get(APIRoutePath.GET_ALL_ANIME, { params: data });
};

export const getDetailAnime = async(data) => {
    return await AxiosInstance.get(`${APIRoutePath.GET_DETAIL_ANIME}/${data.id}/full`);
  };
