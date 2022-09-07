import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    service = new ThemeService();
  });

  describe('Setup service', () => {
    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('should have a default theme', () => {
      expect(service.current).toEqual('light');
    });
  });

  describe('Get theme', () => {
    it('should get the theme to dark', () => {
      localStorage.setItem('theme', 'dark');
      expect(service.current).toEqual('dark');
    });

    it('should get the theme to light', () => {
      localStorage.setItem('theme', 'light');
      expect(service.current).toEqual('light');
    });
  });

  describe('Set theme', () => {
    it('should set the theme to dark', () => {
      service.current = 'dark';
      expect(service.current).toEqual('dark');
    });

    it('should set the theme to light', () => {
      service.current = 'light';
      expect(service.current).toEqual('light');
    });

    it('should set the theme to default if unknown value is given', () => {
      service.current = 'unknown';
      expect(service.current).toEqual('light');
    });

    it('should return if the localStorage theme is null', () => {
      localStorage.clear();
      expect(service.current).toEqual('light');
    });
  });
});
