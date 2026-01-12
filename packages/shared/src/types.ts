export interface User {
  id: number;
  username: string;
  role: "admin" | "user";
  stats: {
    projects: number;
    bugsFixed: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
