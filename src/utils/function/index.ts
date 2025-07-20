export * from "./FuncFormat";
export * from "./FuncValid";

export const UUID = () => {
  return Math.random().toString(36).substring(2);
};
