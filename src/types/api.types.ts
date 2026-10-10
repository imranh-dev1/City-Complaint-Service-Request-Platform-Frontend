export interface ApiResponse<T, M = unknown> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  meta?: M;
}