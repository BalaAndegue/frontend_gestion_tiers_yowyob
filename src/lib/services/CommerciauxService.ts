/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommercialDTO } from '../models/CommercialDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommerciauxService {
    /**
     * Récupérer un commercial par ID
     * @param id ID du commercial
     * @returns CommercialDTO Commercial trouvé
     * @throws ApiError
     */
    public static getCommercialById(
        id: string,
    ): CancelablePromise<CommercialDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/commerciaux/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Commercial non trouvé`,
            },
        });
    }
    /**
     * Mettre à jour un commercial
     * @param id ID du commercial
     * @param requestBody
     * @returns CommercialDTO Mise à jour réussie
     * @throws ApiError
     */
    public static updateCommercial(
        id: string,
        requestBody: CommercialDTO,
    ): CancelablePromise<CommercialDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/commerciaux/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Commercial non trouvé`,
            },
        });
    }
    /**
     * Supprimer un commercial
     * @param id ID du commercial
     * @returns any Suppression réussie
     * @throws ApiError
     */
    public static deleteCommercial(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/commerciaux/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Commercial non trouvé`,
            },
        });
    }
    /**
     * Désactiver un commercial
     * @param id
     * @returns CommercialDTO OK
     * @throws ApiError
     */
    public static deactivateCommercial(
        id: string,
    ): CancelablePromise<CommercialDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/commerciaux/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Activer un commercial
     * @param id
     * @returns CommercialDTO OK
     * @throws ApiError
     */
    public static activateCommercial(
        id: string,
    ): CancelablePromise<CommercialDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/commerciaux/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Récupérer tous les commerciaux
     * @returns CommercialDTO Liste récupérée avec succès
     * @throws ApiError
     */
    public static getAllCommerciaux(): CancelablePromise<Array<CommercialDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/commerciaux',
        });
    }
    /**
     * Créer un commercial
     * Crée un nouveau commercial dans le système avec auto-génération du code comptable
     * @param requestBody
     * @returns CommercialDTO Commercial créé avec succès
     * @throws ApiError
     */
    public static createCommercial(
        requestBody: CommercialDTO,
    ): CancelablePromise<CommercialDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/commerciaux',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Données invalides`,
                500: `Erreur interne du serveur`,
            },
        });
    }
    /**
     * Récupérer les commerciaux inactifs
     * @returns CommercialDTO OK
     * @throws ApiError
     */
    public static getInactiveCommerciaux(): CancelablePromise<Array<CommercialDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/commerciaux/inactive',
        });
    }
    /**
     * Récupérer les commerciaux actifs
     * @returns CommercialDTO OK
     * @throws ApiError
     */
    public static getActiveCommerciaux(): CancelablePromise<Array<CommercialDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/commerciaux/active',
        });
    }
}
