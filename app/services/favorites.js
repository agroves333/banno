import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getFavorites: () => client.request({
      method: 'GET',
      url: '/favorite'
    }),
    deleteFavorite: ({ id }) => client.request({
      method: 'DELETE',
      url: `/favorite/${id}`
    }),
    updateFavorite: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/favorite/${id}`,
      data
    }),
    createFavorite: ({ id, data }) => client.request({
      method: 'POST',
      url: `/favorite/${id}`,
      data
    })
  };
};

