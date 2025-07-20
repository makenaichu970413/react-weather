import { get as _get } from "lodash-es";
import { DOMAIN } from "../constant";
import type { TCRUD, TEndpoint, TResponseStatus } from "../models";

type TDomain = keyof typeof DOMAIN;

export type PFetch<TData> = {
  method: TCRUD;
  endpoint?: TEndpoint;
  pks?: (string | null)[] | null;
  domain?: TDomain;
  headers?: object | null;
  baseURL?: string | null;
  dataType?: "JSON" | "BLOB" | null;
  responseType?: "JSON" | "BLOB";
  params?: TData | null;
  data?: TData | null;
  abort?: boolean; // Controls whether to cancel previous requests to the same URL
};

export type TFetch<TResult> = {
  result: TResult | null;
  error: string | null;
  status: number | null;
};

export type PGet<TData> = Omit<PFetch<TData>, "method" | "data">;

export type PPost<TData> = Omit<PFetch<TData>, "method">;

export type PPatch<TData> = PPost<TData>;

export type PDelete<TData> = PPost<TData>;

export type PUpload<TData> = Omit<PPost<FormData>, "data"> & {
  file: File | Blob;
  data?: TData | null;
};

function CheckResponseError<TData, TResult>(props: {
  api: PFetch<TData>;
  response: Response;
  result: Partial<TResponseStatus>; //? Assume the result is ERROR
}) {
  const { api, result, response } = props;
  const { method, endpoint } = api;
  const code = result?.cod ?? null;
  const message = result?.message ?? null;

  if (!response.ok) {
    return message ?? `${method} "/${endpoint} ERROR`;
  } else if (code && message) return `[${code}] ${message}`;

  return null;
}

//? Store "activeRequests" by URL & AbortController
const activeRequests = new Map<string, AbortController>();

export async function CRUD<TData, TResult>(props: PFetch<TData>) {
  const {
    method,
    endpoint = "",
    domain = "WEATHER",
    headers: pHeaders = null,
    pks: pPks = [],
    params: pParams = null,
    data: pData = null,
    dataType = null,
    responseType = "JSON",
    abort = true,
  } = props;

  const response: TFetch<TResult> = {
    result: null,
    error: null,
    status: null,
  };

  if (!endpoint) return response;

  const pks = pPks?.filter((val) => val) as string[];
  const params = pParams ? new URLSearchParams(pParams) : null;

  let URL = DOMAIN[domain];
  URL = `${URL}${endpoint}`;
  if (pks.length) URL = `${URL}/${pks.join("/")}`;
  if (params) URL = `${URL}?${params}`;

  //? Cancel any existing request to this URL if cancelPrevious is true (default)
  if (abort && activeRequests.has(URL)) {
    activeRequests.get(URL)?.abort();
    activeRequests.delete(URL);
  }

  //? Create new abort controller for this request
  const controller = new AbortController();
  activeRequests.set(URL, controller);

  const headers = {
    ...(pHeaders && pHeaders),
    ...(dataType === "JSON" && { "Content-Type": "application/json" }),
  };

  console.log(`${method} "/${endpoint}": `, { props, headers });

  try {
    const res = await fetch(URL, {
      method: method,
      headers: headers,
      ...(pData && dataType === "JSON" && { body: JSON.stringify(pData) }),
      ...(pData && dataType === "BLOB" && { body: pData as BodyInit }),
      signal: controller.signal,
    });

    response["status"] = res.status;

    if (responseType === "JSON") {
      const temp = await res.json();
      const error = CheckResponseError<TData, TResult>({
        response: res,
        api: props,
        result: temp,
      });
      if (error) throw new Error(error);

      response["result"] = temp as TResult;
    } else if (responseType === "BLOB") {
      response["result"] = ((await res.blob()) || null) as TResult;
    }
  } catch (error) {
    response.error = `${error}`;
  } finally {
    //? Clean up the request from "activeRequests" map
    activeRequests.delete(URL);
  }

  console.log(`${method} "/${endpoint}" RES: `, response);
  return response;
}

export async function GET<TData, TResult>(props: PGet<TData>) {
  return await CRUD<TData, TResult>({ method: "GET", ...props });
}

export async function POST<TData, TResult>(props: PPost<TData>) {
  return await CRUD<TData, TResult>({ method: "POST", ...props });
}

export async function PATCH<TData, TResult>(props: PPatch<TData>) {
  return await CRUD<TData, TResult>({ method: "PATCH", ...props });
}

export async function DELETE<TData, TResult>(props: PDelete<TData>) {
  return await CRUD<TData, TResult>({ method: "DELETE", ...props });
}

export async function UPLOAD<TData, TResult>(props: PUpload<TData>) {
  const { file, data = null, ...rest } = props;
  const formData: FormData = new FormData();

  // Append file with proper filename
  const filename = _get(file, "name") ?? null;
  if (filename) formData.append("file", file, filename);
  else formData.append("file", file);

  // Append additional data if provided
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = _get(data, key) ?? null;
      if (value) formData.append(key, value);
    });
  }

  return await CRUD<FormData, TResult>({
    abort: false,
    ...rest,
    method: "POST",
    dataType: "BLOB",
    data: formData,
  });
}
