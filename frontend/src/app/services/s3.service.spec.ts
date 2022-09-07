import { S3Service } from './s3.service';

describe('S3Service', () => {
  let service: S3Service;
  let httpMock = {
    put: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new S3Service(httpMock);
  });

  describe('Setup service', () => {
    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('should have region defined', () => {
      expect(service.region).toBeDefined();
    });

    it('should have bucketName defined', () => {
      expect(service.bucketName).toBeDefined();
    });

    it('should have accessKeyId defined', () => {
      expect(service.accessKeyId).toBeDefined();
    });

    it('should have secretAccessKey defined', () => {
      expect(service.secretAccessKey).toBeDefined();
    });
  });

  describe('Generate upload url', () => {
    it('should generate an upload url', () => {
      const url = service.generateUploadUrl('test');
      expect(url).toBeDefined();
    });

    it('should generate an upload url with the correct bucket name', () => {
      const url = service.generateUploadUrl('test');
      expect(url).toContain(service.bucketName);
    });

    it('should generate an upload url with the correct key', () => {
      const url = service.generateUploadUrl('test');
      expect(url).toContain('test');
    });

    it('should generate an upload url with the correct expiration', () => {
      const url = service.generateUploadUrl('test');
      expect(url).toContain('Expires=60');
    });
  });

  describe('Upload image', () => {
    it('should upload an image', () => {
      const url = 'test';
      const image = new File([''], 'test', { type: 'image/png' });
      service.uploadImage(url, image);
      expect(httpMock.put).toHaveBeenCalled();
    });
  });
});
