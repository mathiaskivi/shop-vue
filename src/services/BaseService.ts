import { IHTTPResponse } from '@/types/IHTTPResponse';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { IMessages } from '@/types/IMessages';
import { ApiBaseUrl } from '@/configuration';
import { IState } from '@/store/Types';

export class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(state: IState | null): AxiosRequestConfig | undefined {
        if (state === null || state.token === null) {
            return undefined;
        }

        return {
            headers: {
                Authorization: 'Bearer ' + state.token
            }
        }
    }

    static async getAll<TEntity>(apiEndpoint: string, state: IState | null): Promise<IHTTPResponse<TEntity[]>> {
        if (state !== null && state.language !== null) {
            apiEndpoint += '?culture=' + state.language.name;
        }

        try {
            const response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.getAxiosConfiguration(state));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data
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

    static async get<TEntity>(apiEndpoint: string, state: IState | null): Promise<IHTTPResponse<TEntity>> {
        if (state !== null && state.language !== null) {
            apiEndpoint += '?culture=' + state.language.name;
        }

        try {
            const response = await this.axios.get<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(state));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data
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

    static async put<TEntity>(apiEndpoint: string, entity: TEntity, state: IState | null): Promise<IHTTPResponse<TEntity>> {
        if (state !== null && state.language !== null) {
            apiEndpoint += '?culture=' + state.language.name;
        }

        try {
            const response = await this.axios.put<TEntity>(apiEndpoint, JSON.stringify(entity), BaseService.getAxiosConfiguration(state));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data
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

    static async post<TEntity>(apiEndpoint: string, entity: TEntity, state: IState | null): Promise<IHTTPResponse<TEntity>> {
        if (state !== null && state.language !== null) {
            apiEndpoint += '?culture=' + state.language.name;
        }

        try {
            const response = await this.axios.post<TEntity>(apiEndpoint, JSON.stringify(entity), BaseService.getAxiosConfiguration(state));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data as TEntity
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

    static async delete<TEntity>(apiEndpoint: string, state: IState | null): Promise<IHTTPResponse<TEntity>> {
        if (state !== null && state.language !== null) {
            apiEndpoint += '?culture=' + state.language.name;
        }

        try {
            const response = await this.axios.delete<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(state));
            return {
                ok: response.status <= 299,
                status: response.status,
                data: response.data
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
