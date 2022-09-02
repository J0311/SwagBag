const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();
const env = argv.env || 'dev';

function writeFileUsingFS(targetPath: any, data: any) {
  writeFile(targetPath, data, function (err: any) {
    if (err) {
      console.log(err);
    }

    if (data !== '') {
      console.log('File created: ' + targetPath);
    }
  });
}

const envDir = './src/environments';

if (!existsSync(envDir)) {
  mkdirSync(envDir);
}

writeFileUsingFS(envDir + '/environment.ts', '');
writeFileUsingFS(envDir + '/environment.prod.ts', '');

const isProd = env === 'prod';

const baseUrl = isProd
  ? 'http://swagbag.us-east-1.elasticbeanstalk.com'
  : 'http://localhost:8080';
const originUrl = isProd
  ? 'http://swagbag.us-east-1.elasticbeanstalk.com'
  : 'http://localhost:4200';
const targetPath = isProd
  ? envDir + '/environment.prod.ts'
  : envDir + '/environment.ts';

const data = `export const environment = {
    production: ${isProd},
    withCredentials: true,
    baseUrl: '${baseUrl}',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '${originUrl}',
    },
    accessCode: '${process.env.ACCESS_CODE}',
    region: '${process.env.REGION}',
    bucketName: '${process.env.BUCKET_NAME}',
    accessKeyId: '${process.env.ACCESS_KEY_ID}',
    secretAccessKey: '${process.env.SECRET_ACCESS_KEY}',
};
`;

writeFileUsingFS(targetPath, data);
