export interface Role {
  id: string;
  name: string;
  desc: string;
  numberOfUsers?: number;
  permission?: RoleItem[];
}

export interface Feature {
  id: string;
  name: string;
}
export interface RoleGroup {
  id: string;
  roles: RoleItem[];
}

export interface RoleItem {
  id: string;
  name: string;
}
