import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
describe('AppComponent', () => {
  let fixture: AppComponent;
  let themeService: ThemeService;

  beforeEach(() => {
    fixture = new AppComponent(themeService);
  });

  it('should should have a title SwagBag', () => {
    expect(fixture.title).toEqual('SwagBag');
  });
});
