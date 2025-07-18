import WebFont from 'webfontloader';

export function loadFonts() {
  WebFont.load({
    google: {
      families: ['Press+Start+2P', 'Roboto:400,700'],
    },
  });
}
