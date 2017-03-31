import { PompongSpaPage } from './app.po';

describe('pompong-spa App', () => {
  let page: PompongSpaPage;

  beforeEach(() => {
    page = new PompongSpaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
