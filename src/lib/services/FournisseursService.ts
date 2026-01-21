/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FournisseurDTO } from '../models/FournisseurDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FournisseursService {
    /**
     * Récupérer un fournisseur par ID
     * @param id ID du fournisseur
     * @returns FournisseurDTO Fournisseur trouvé
     * @throws ApiError
     */
    public static getFournisseurById(
        id: string,
    ): CancelablePromise<FournisseurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fournisseurs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Fournisseur non trouvé`,
            },
        });
    }
    /**
     * Mettre à jour un fournisseur
     * @param id ID du fournisseur
     * @param requestBody
     * @returns FournisseurDTO Mise à jour réussie
     * @throws ApiError
     */
    public static updateFournisseur(
        id: string,
        requestBody: FournisseurDTO,
    ): CancelablePromise<FournisseurDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/fournisseurs/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Fournisseur non trouvé`,
            },
        });
    }
    /**
     * Supprimer un fournisseur
     * @param id ID du fournisseur
     * @returns any Suppression réussie
     * @throws ApiError
     */
    public static deleteFournisseur(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/fournisseurs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Fournisseur non trouvé`,
            },
        });
    }
    /**
     * Désactiver un fournisseur
     * @param id
     * @returns FournisseurDTO OK
     * @throws ApiError
     */
    public static deactivateFournisseur(
        id: string,
    ): CancelablePromise<FournisseurDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/fournisseurs/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Activer un fournisseur
     * @param id
     * @returns FournisseurDTO OK
     * @throws ApiError
     */
    public static activateFournisseur(
        id: string,
    ): CancelablePromise<FournisseurDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/fournisseurs/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Récupérer tous les fournisseurs
     * @returns FournisseurDTO Liste récupérée avec succès
     * @throws ApiError
     */
    public static getAllFournisseurs(): CancelablePromise<Array<FournisseurDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fournisseurs',
        });
    }
    /**
     * Créer un fournisseur
     * Crée un nouveau fournisseur dans le système avec auto-génération du code comptable
     * @param requestBody
     * @returns FournisseurDTO Fournisseur créé avec succès
     * @throws ApiError
     */
    public static createFournisseur(
        requestBody: FournisseurDTO,
    ): CancelablePromise<FournisseurDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/fournisseurs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Données invalides`,
                500: `Erreur interne du serveur`,
            },
        });
    }
    /**
     * Récupérer les fournisseurs inactifs
     * @returns FournisseurDTO OK
     * @throws ApiError
     */
    public static getInactiveFournisseurs(): CancelablePromise<Array<FournisseurDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fournisseurs/inactive',
        });
    }
    /**
     * Récupérer les fournisseurs actifs
     * @returns FournisseurDTO OK
     * @throws ApiError
     */
    public static getActiveFournisseurs(): CancelablePromise<Array<FournisseurDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fournisseurs/active',
        });
    }
}
