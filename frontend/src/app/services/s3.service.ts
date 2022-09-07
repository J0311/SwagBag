import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3 } from 'aws-sdk';
import { environment } from '../../environments/environment';

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

  /**
   * Generates an URL to be used to upload to the S3 bucket.
   * Expires in 60 minutes from generation
   * @param randomImageName 
   * @returns 
   */
  generateUploadUrl(randomImageName: string) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: randomImageName,
      Expires: 60,
    });
  }

  /**
   * Sends a put request to upload the file to the S3 Bucket
   * @param url 
   * @param image 
   * @returns 
   */
  uploadImage(url: string, image: File) {
    return this.http.put(url, image, {
      headers: { 'Content-Type': image.type },
    });
  }
}
