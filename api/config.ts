export const API_CONFIG = {
  BASE_URL: "https://whispy.xquare.app",
  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  SOUNDS_BY_THEME: (theme: string) => `/sound/${theme}`,
} as const;
