export default interface User {
  id: string;
  name: string;
  password: string;
  roles: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deletedAt: string;
}
