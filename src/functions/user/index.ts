import { handlerPath } from "@libs/handler-resolver";

export const signIn = {
  handler: `${handlerPath(__dirname)}/handler.signIn`,
  events: [
    {
      http: {
        method: "post",
        path: "auth/login",
      },
    },
  ],
};

export const getUsers = {
  handler: `${handlerPath(__dirname)}/handler.getUsers`,
  events: [
    {
      http: {
        method: "get",
        path: "users/",
      },
    },
  ],
};

export const createUser = {
  handler: `${handlerPath(__dirname)}/handler.createUser`,
  events: [
    {
      http: {
        method: "post",
        path: "user",
      },
    },
  ],
};

export const getUser = {
  handler: `${handlerPath(__dirname)}/handler.getUser`,
  events: [
    {
      http: {
        method: "get",
        path: "user/{id}",
      },
    },
  ],
};

export const updateUser = {
  handler: `${handlerPath(__dirname)}/handler.updateUser`,
  events: [
    {
      http: {
        method: "put",
        path: "user/{id}",
      },
    },
  ],
};

export const deleteUser = {
  handler: `${handlerPath(__dirname)}/handler.deleteUser`,
  events: [
    {
      http: {
        method: "delete",
        path: "user/{id}",
      },
    },
  ],
};
