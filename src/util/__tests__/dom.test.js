import { setLocation } from '../dom';

describe('Utils | DOM', () => {
  it('sets the window location()', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    });

    setLocation('/search');

    expect(window.location.href).toEqual('/search');
  });
});
