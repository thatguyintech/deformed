import { getBackendEndpoint } from "@/config/env";
import { ErrorResponse } from "@/utils/error";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

export const ApiInstance = axios.create({
  baseURL: getBackendEndpoint(),
});

export const callApiAndReturnData = async (api: Promise<AxiosResponse>) => {
  try {
    const response = await api;
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;

    return Promise.reject(
      new ErrorResponse(
        getErrorMessage(axiosError),
        axiosError.response ? axiosError.response?.status : null,
        axiosError.response?.data?.name ?? undefined
      )
    );
  }
};

export const getErrorMessage = (axiosError: AxiosError) => {
  let errorMessage = axiosError.message;
  if (
    axiosError.response?.status === 500 &&
    axiosError.response.headers["deformed-correlation-id"]
  ) {
    const correlationId =
      axiosError.response.headers["deformed-correlation-id"];
    errorMessage = `Internal error`;
  } else if (
    axiosError.response?.data &&
    Object?.keys(axiosError.response?.data).includes("error")
  ) {
    errorMessage = axiosError.response?.data["error"];
  }
  return errorMessage;
};
export const postReq = async (url: string, { data, config }: any) => {
  return callApiAndReturnData(ApiInstance.post(url, data, config));
};

export const getReq = (
  url: string,
  config?: AxiosRequestConfig | undefined,
) => {
  return callApiAndReturnData(ApiInstance.get(url, config));
};
