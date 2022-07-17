import dynamoDBClient from "../model";
import UserService from "./UsersService";

const userService = new UserService(dynamoDBClient());
export default userService;
