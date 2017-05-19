import { HttpPage } from './app.po';

describe('http App', () => {
  let page: HttpPage;

  beforeEach(() => {
    page = new HttpPage();
  });

  it('should have a h1 section', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeTruthy();
  });


});
