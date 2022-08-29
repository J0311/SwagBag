import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  });

  it('should should have a title SwagBag', () => {
    expect(fixture.title).toEqual('SwagBag');
  });
});
