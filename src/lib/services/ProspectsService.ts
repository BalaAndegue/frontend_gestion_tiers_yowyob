/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProspectDTO } from '../models/ProspectDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProspectsService {
    /**
     * Récupérer un prospect par ID
     * @param id ID du prospect
     * @returns ProspectDTO Prospect trouvé
     * @throws ApiError
     */
    public static getProspectById(
        id: string,
    ): CancelablePromise<ProspectDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/prospects/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Prospect non trouvé`,
            },
        });
    }
    /**
     * Mettre à jour un prospect
     * @param id ID du prospect
     * @param requestBody
     * @returns ProspectDTO Mise à jour réussie
     * @throws ApiError
     */
    public static updateProspect(
        id: string,
        requestBody: ProspectDTO,
    ): CancelablePromise<ProspectDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/prospects/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Prospect non trouvé`,
            },
        });
    }
    /**
     * Supprimer un prospect
     * @param id ID du prospect
     * @returns any Suppression réussie
     * @throws ApiError
     */
    public static deleteProspect(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/prospects/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Prospect non trouvé`,
            },
        });
    }
    /**
     * Désactiver un prospect
     * @param id
     * @returns ProspectDTO OK
     * @throws ApiError
     */
    public static deactivateProspect(
        id: string,
    ): CancelablePromise<ProspectDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/prospects/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Activer un prospect
     * @param id
     * @returns ProspectDTO OK
     * @throws ApiError
     */
    public static activateProspect(
        id: string,
    ): CancelablePromise<ProspectDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/prospects/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Récupérer tous les prospects
     * @returns ProspectDTO Liste récupérée avec succès
     * @throws ApiError
     */
    public static getAllProspects(): CancelablePromise<Array<ProspectDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/prospects',
        });
    }
    /**
     * Créer un prospect
     * Crée un nouveau prospect dans le système avec auto-génération du code comptable
     * @param requestBody
     * @returns ProspectDTO Prospect créé avec succès
     * @throws ApiError
     */
    public static createProspect(
        requestBody: ProspectDTO,
    ): CancelablePromise<ProspectDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/prospects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Données invalides`,
                500: `Erreur interne du serveur`,
            },
        });
    }
    /**
     * Récupérer les prospects inactifs
     * @returns ProspectDTO OK
     * @throws ApiError
     */
    public static getInactiveProspects(): CancelablePromise<Array<ProspectDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/prospects/inactive',
        });
    }
    /**
     * Récupérer les prospects actifs
     * @returns ProspectDTO OK
     * @throws ApiError
     */
    public static getActiveProspects(): CancelablePromise<Array<ProspectDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/prospects/active',
        });
    }
}
