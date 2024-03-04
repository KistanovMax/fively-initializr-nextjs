export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  text: string;
  createdAt: Date;
}

export interface JobsResponse {
  count: number;
  jobs: {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    applications: number;
  }[];
}

export interface ApplicationsResponse {
  count: number;
  applications: Application[];
}

export type AddJobBody = Omit<Job, 'id' | 'createdAt'>;

export type UpdateJobBody = Omit<Job, 'createdAt'>;

export type ApplyJobBody = Omit<Application, 'id' | 'createdAt'>;
