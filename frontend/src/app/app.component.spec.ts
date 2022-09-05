import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
describe('AppComponent', () => {
  let fixture: AppComponent;
  let theme:ThemeService;

  beforeEach(() => {
    fixture = new AppComponent(theme);
  });

  it('should should have a title SwagBag', () => {
    expect(fixture.title).toEqual('E-Commerce Client');
  });
});
