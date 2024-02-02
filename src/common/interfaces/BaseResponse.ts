export interface IBaseResponse<T> {
  code: number;
  success: boolean;
  data: T;
  errors: string[];
  page?: {
    page: number;
    total: number;
    totalPage: number;
  } | null;
}
