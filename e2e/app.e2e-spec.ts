import { InstagraphPage } from './app.po';

describe('instagraph App', function() {
  let page: InstagraphPage;

  beforeEach(() => {
    page = new InstagraphPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
