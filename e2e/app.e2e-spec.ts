import { WeatherMnPage } from './app.po';

describe('weather-mn App', () => {
  let page: WeatherMnPage;

  beforeEach(() => {
    page = new WeatherMnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
