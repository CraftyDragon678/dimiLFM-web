import loadable from "@loadable/component";

export const Root = loadable(() => import("./Root"));
export const Login = loadable(() => import("./Login"));
export const Chat = loadable(() => import("./Chat"));
export const NotFound = loadable(() => import("./NotFound"));
