export const ASKCODER_LOGO_URL =
  'https://res.cloudinary.com/di8oznn6y/image/upload/v1781876205/AskCoder_Logo_uae9mc.png';

export const LOGO_WIDTH = 300;
export const LOGO_HEIGHT = 200;

export const logoSize = (width) => ({
  width,
  height: Math.round(width * (LOGO_HEIGHT / LOGO_WIDTH)),
});
