import { api } from '../config/axios';
import { Role, Permission } from '../types/role.type';

export interface UserRoleAssignment {
  userId: string;
  roleId: string;
}

export class RoleService {
  private static instance: RoleService;
  private readonly baseUrl = '/roles';

  private constructor() {}

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  async getAllRoles(): Promise<Role[]> {
    const response = await api.get(this.baseUrl);
    return response.data;
  }

  async getRoleById(id: string): Promise<Role> {
    const response = await api.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createRole(role: Partial<Role>): Promise<Role> {
    const response = await api.post(this.baseUrl, role);
    return response.data;
  }

  async updateRole(id: string, role: Partial<Role>): Promise<Role> {
    const response = await api.put(`${this.baseUrl}/${id}`, role);
    return response.data;
  }

  async deleteRole(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async assignRoleToUser(
    assignment: UserRoleAssignment
  ): Promise<boolean> {
    try {
      await api.post(
        `/roles/assign/${assignment.userId}/${assignment.roleId}`
      );
      return true;
    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  async checkPermission(
    userId: string,
    permission: Permission
  ): Promise<boolean> {
    try {
      const response = await api.get(
        `/roles/permissions/check/${userId}?permission=${permission}`
      );
      return response.data.hasPermission;
    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  async getRolesByNames(names: string[]): Promise<Role[]> {
    try {
      const response = await api.post('/roles/by-names', { names });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  private handleError(error: any): void {
    console.error('Role Service Error:', error.response?.data || error.message);
  }
}
