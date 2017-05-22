import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getFavorites: () => client.request({
      method: 'GET',
      url: '/api/favorite'
    }),
    deleteFavorite: ({ id }) => client.request({
      method: 'DELETE',
      url: `/api/favorite/${id}`
    }),
    createFavorite: ({ id, data }) => client.request({
      method: 'POST',
      url: `/api/favorite/${id}`,
      data
    })
  };
};

