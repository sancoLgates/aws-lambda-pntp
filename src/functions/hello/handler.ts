import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { hashPassword } from "@libs/helpers";
import { v4 } from "uuid";
import schema from "./schema";
import usersService from "../../services";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const id = v4();
    await usersService.createUser({
      id: id,
      name: event.body.name,
      password: hashPassword("password123"),
      roles: "superadmin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: Boolean(true),
      is_deleted: Boolean(false),
    });
    return formatJSONResponse({
      message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
      event,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const main = middyfy(hello);
