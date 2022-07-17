import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { hashPassword, comparePassword } from "@libs/helpers";
import usersService from "../../services";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateJWT = (id: string, name: string, roles: string): string => {
  const userData: object = {
    id,
    name,
    roles,
  };
  const token: string = jwt.sign(userData, SECRET_KEY, { algorithm: "HS512" });
  // const decoded: any = jwt.verify(token, SECRET_KEY);
  return token;
};

export const signIn = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const user = await usersService.getUserByName(event.body);
      if (user) {
        if (comparePassword(event.body.password, user.password)) {
          const jwt: string = await generateJWT(user.id, user.name, user.roles);
          return formatJSONResponse({
            token: jwt,
          });
        } else {
          return formatJSONResponse({
            status: 400,
            message: "Passwords dont match",
          });
        }
      } else {
        return formatJSONResponse({
          status: 400,
          message: "No user with that email",
        });
      }
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const users = await usersService.getUsers();
  return formatJSONResponse({
    users,
  });
});

export const createUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = v4();
      const user = await usersService.createUser({
        id: id,
        name: event.body.name,
        password: hashPassword(event.body.password),
        roles: event.body.roles || "member",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: Boolean(event.body.status) || false,
        is_deleted: Boolean(false),
      });
      return formatJSONResponse({
        user,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const user = await usersService.getUser(id);
      return formatJSONResponse({
        user,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const updateUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const user = await usersService.updateUser(id, {
        status: Boolean(event.body.status),
      });
      return formatJSONResponse({
        user,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const deleteUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const user = await usersService.deleteUser(id, {
        status: false,
        is_deleted: true,
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString(),
      });
      return formatJSONResponse({
        user,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
