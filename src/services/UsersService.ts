import { DocumentClient } from "aws-sdk/client/dynamodb";
import User from "../model/User";

export default class UserService {
  private Tablename: string = "users";

  constructor(private docClient: DocumentClient) {}

  async getUsers(): Promise<User[]> {
    const users = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return users.Items as User[];
  }

  async createUser(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: user,
      })
      .promise();
    return user as User;
  }

  async getUser(id: string): Promise<any> {
    const user = await this.docClient
      .get({
        TableName: this.Tablename,
        Key: {
          id: id,
        },
      })
      .promise();
    if (!user.Item) {
      throw new Error("Id does not exit");
    }
    return user.Item as User;
  }

  async getUserByName(user: User): Promise<User> {
    const result = await this.docClient
      .scan({
        TableName: this.Tablename,
        FilterExpression: "#name = :name",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": user.name,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    if (!result.Items[0]) {
      throw new Error("User does not exit");
    }
    return result.Items[0] as User;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { id: id },
        UpdateExpression: "set #status = :status",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": user.status,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as User;
  }

  async deleteUser(id: string, user: Partial<User>): Promise<User> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { id: id },
        UpdateExpression:
          "set #status = :status, #is_deleted = :is_deleted, #deletedAt = :deletedAt",
        ExpressionAttributeNames: {
          "#status": "status",
          "#is_deleted": "is_deleted",
          "#deletedAt": "deletedAt",
        },
        ExpressionAttributeValues: {
          ":status": user.status,
          ":is_deleted": user.is_deleted,
          ":deletedAt": user.deletedAt,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return updated.Attributes as User;
  }
}
