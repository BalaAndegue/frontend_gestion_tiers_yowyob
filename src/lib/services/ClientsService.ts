/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientDTO } from '../models/ClientDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientsService {
    /**
     * Récupérer un client par ID
     * Retourne un client spécifique par son ID
     * @param id ID du client
     * @returns ClientDTO Client trouvé
     * @throws ApiError
     */
    public static getClientById(
        id: string,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clients/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Client non trouvé`,
            },
        });
    }
    /**
     * Mettre à jour un client
     * Met à jour les informations d'un client existant
     * @param id ID du client
     * @param requestBody
     * @returns ClientDTO Client mis à jour avec succès
     * @throws ApiError
     */
    public static updateClient(
        id: string,
        requestBody: ClientDTO,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/clients/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Client non trouvé`,
            },
        });
    }
    /**
     * Supprimer un client
     * Supprime un client du système
     * @param id ID du client à supprimer
     * @returns any Client supprimé avec succès
     * @throws ApiError
     */
    public static deleteClient(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/clients/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Client non trouvé`,
            },
        });
    }
    /**
     * Mettre à jour le statut TVA
     * Défini si le client est assujetti à la TVA
     * @param id
     * @param assujetti
     * @returns ClientDTO OK
     * @throws ApiError
     */
    public static updateTvaStatus(
        id: string,
        assujetti: boolean,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/clients/{id}/tva',
            path: {
                'id': id,
            },
            query: {
                'assujetti': assujetti,
            },
        });
    }
    /**
     * Mettre à jour les canaux de vente
     * Active ou désactive les canaux de vente (Détail, Demi-Gros, Gros, Super-Gros)
     * @param id
     * @param venteDetail
     * @param venteDemiGros
     * @param venteGros
     * @param venteSuperGros
     * @returns ClientDTO OK
     * @throws ApiError
     */
    public static updateSalesChannels(
        id: string,
        venteDetail?: boolean,
        venteDemiGros?: boolean,
        venteGros?: boolean,
        venteSuperGros?: boolean,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/clients/{id}/sales-channels',
            path: {
                'id': id,
            },
            query: {
                'venteDetail': venteDetail,
                'venteDemiGros': venteDemiGros,
                'venteGros': venteGros,
                'venteSuperGros': venteSuperGros,
            },
        });
    }
    /**
     * @param id
     * @returns ClientDTO OK
     * @throws ApiError
     */
    public static deactivateClient(
        id: string,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/clients/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns ClientDTO OK
     * @throws ApiError
     */
    public static activateClient(
        id: string,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/clients/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Récupérer tous les clients
     * Retourne la liste de tous les clients
     * @returns ClientDTO Liste des clients récupérée avec succès
     * @throws ApiError
     */
    public static getAllClients(): CancelablePromise<Array<ClientDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clients',
        });
    }
    /**
     * Créer un client
     * Crée un nouveau client dans le système
     * @param requestBody
     * @returns ClientDTO Client créé avec succès
     * @throws ApiError
     */
    public static createClient(
        requestBody: ClientDTO,
    ): CancelablePromise<ClientDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/clients',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Données invalides`,
                500: `Erreur interne du serveur`,
            },
        });
    }
    /**
     * @returns ClientDTO OK
     * @throws ApiError
     */
    public static getInactiveClients(): CancelablePromise<Array<ClientDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clients/inactive',
        });
    }
    /**
     * @returns ClientDTO OK
     * @throws ApiError
     */
    public static getActiveClients(): CancelablePromise<Array<ClientDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/clients/active',
        });
    }
}
