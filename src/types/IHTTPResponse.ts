export interface IHTTPResponse<TData> {
    ok: boolean;
    status: number;
    data?: TData;
    messages?: string[];
}
