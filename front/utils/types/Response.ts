export type Response<T> = {
    code: number;
    ok: boolean;
    data?: T;
    message?: string;
    error?: any;
}