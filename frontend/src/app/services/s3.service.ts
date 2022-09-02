import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3 } from 'aws-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  region = environment.region;
  bucketName = environment.bucketName;
  accessKeyId = environment.accessKeyId;
  secretAccessKey = environment.secretAccessKey;

  constructor(private http: HttpClient) {}

  s3 = new S3({
    region: this.region,
    accessKeyId: this.accessKeyId,
    secretAccessKey: this.secretAccessKey,
    signatureVersion: 'v4',
  });

  generateUploadUrl(randomImageName: string) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: randomImageName,
      Expires: 60,
    });
  }

  uploadImage(url: string, image: File) {
    return this.http.put(url, image, {
      headers: { 'Content-Type': image.type },
    });
  }
}
