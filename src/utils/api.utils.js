import _isObject from 'lodash/isObject';
import moment from 'moment';

const baseUrl = 'https://api.foursquare.com/v2/venues'

const request = async (url, query = []) => {
  const qString = query.concat([
    `v=${moment().format('YYYYMMDD')}`
  ]).join('&')

  const response = await fetch(`${url}?${qString}`)
  return response.json()
}

export const getVenueNearLondon = async (params) => {
  if (_isObject(params)) {
    const { authToken, venueName = '' } = params;

    const data = await request(
      `${baseUrl}/search`,
      [
        'near=London',
        `oauth_token=${authToken}`,
        `query=${venueName}`
      ]
    );
    return data.response;
  }
}

export const getSimilarVenue = async (params) => {
  if (_isObject(params)) {
    const { authToken, venueId = '' } = params;
    
    const data = await request(
      `${baseUrl}/${venueId}/similar`,
      [
        `oauth_token=${authToken}`
      ]
    );
    return data.response;
  }
  
}
