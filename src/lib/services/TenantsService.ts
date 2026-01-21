/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TenantDTO } from '../models/TenantDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantsService {
    /**
     * Récupérer un tenant par son ID
     * @param id
     * @returns TenantDTO OK
     * @throws ApiError
     */
    public static getTenantById(
        id: string,
    ): CancelablePromise<TenantDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Mettre à jour un tenant
     * @param id
     * @param requestBody
     * @returns TenantDTO OK
     * @throws ApiError
     */
    public static updateTenant(
        id: string,
        requestBody: TenantDTO,
    ): CancelablePromise<TenantDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Supprimer un tenant
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTenant(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Récupérer tous les tenants
     * @returns TenantDTO OK
     * @throws ApiError
     */
    public static getAllTenants(): CancelablePromise<Array<TenantDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants',
        });
    }
    /**
     * Créer un nouveau tenant
     * @param requestBody
     * @returns TenantDTO OK
     * @throws ApiError
     */
    public static createTenant(
        requestBody: TenantDTO,
    ): CancelablePromise<TenantDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Rechercher des tenants par nom
     * @param name
     * @returns TenantDTO OK
     * @throws ApiError
     */
    public static searchTenantsByName(
        name: string,
    ): CancelablePromise<Array<TenantDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/search',
            query: {
                'name': name,
            },
        });
    }
}
