export declare type TCRUD = "GET" | "POST" | "PATCH" | "DELETE";

declare type TEndpoint = "geo/1.0/direct" | "data/3.0/onecall";

declare type TResponseStatus = {
  cod: 429 | 401;
  message: string;
};
