export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: 'http://swagbag.us-east-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':
      'http://swagbag.us-east-1.elasticbeanstalk.com',
  },
};
