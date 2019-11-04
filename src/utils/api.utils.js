import _isObject from 'lodash/isObject';

const defaultClientId = 'UWNGMI23BN1DU0F4C2V4NV4Y1LYOOH4SPFFQH5VIH31ZPEL0'
const defaultClientSecret = 'GYMSBI4CSUSX0XTTFOH54KVVL51M1WED11XMKW5QRCLEN15I'
const baseUrl = 'https://api.foursquare.com/v2/venues'

const request = async (url, query = []) => {
  const qString = query.concat([
    'v=20191102'
  ]).join('&')

  const response = await fetch(`${url}?${qString}`)
  return response.json()
}

export const getVenueNearLondon = async (input) => {
  if (_isObject(input)) {
    const { clientId, clientSecret, venueName = '' } = input;
  
    const data = await request(
      `${baseUrl}/search`,
      [
        'near=London',
        `client_id=${clientId || defaultClientId}`,
        `client_secret=${clientSecret || defaultClientSecret}`,
        `query=${venueName}`
      ]
    )
    return data.response;
  }
}

export const getSimilarVenue = async (venueId) => {
  const data = await request(
    `${baseUrl}/search/${venueId}/similar`
  );
  return data.response;
}
