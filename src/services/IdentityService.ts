import { IHTTPResponse } from '@/types/IHTTPResponse';
import Axios, { AxiosError } from 'axios';
import { IMessages } from '@/types/IMessages';
import { ApiBaseUrl } from '@/configuration';
import { ILoginRequest } from '@/types/ILoginRequest';
import { IRegisterRequest } from '@/types/IRegisterRequest';
import { ILoginResponse } from '@/types/ILoginResponse';
import { IRegisterResponse } from '@/types/IRegisterResponse';

export class IdentityService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static async Login(apiEndpoint: string, loginRequest: ILoginRequest): Promise<IHTTPResponse<ILoginResponse>> {
        try {
            const response = await this.axios.post<ILoginResponse>(apiEndpoint, JSON.stringify(loginRequest));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data as ILoginResponse
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                ok: false,
                status: axiosError.response?.status ?? 500,
                messages: (axiosError.response?.data as IMessages).messages,
            }
        }
    }

    static async Register(apiEndpoint: string, registerRequest: IRegisterRequest): Promise<IHTTPResponse<IRegisterResponse>> {
        try {
            const response = await this.axios.post<IRegisterResponse>(apiEndpoint, JSON.stringify(registerRequest));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data as IRegisterResponse
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                ok: false,
                status: axiosError.response?.status ?? 500,
                messages: (axiosError.response?.data as IMessages).messages,
            }
        }
    }
}
