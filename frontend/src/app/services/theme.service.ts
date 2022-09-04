import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public static default = 'light';
  public static themes = new Map<string, string>([
    ['light', 'https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css'],
    ['dark', 'https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css']
  ]);

  public get current(): string {
    return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
    localStorage.setItem('theme', value);
    let theme = ThemeService.themes.get(value);
    if (theme == null) return;

    this.style.href = theme;
  }

  private readonly style: HTMLLinkElement;

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    let theme = ThemeService.themes.get(this.current);
    if (theme == null) return;
    
    this.style.href = theme;
  }
}