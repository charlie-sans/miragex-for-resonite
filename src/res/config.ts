type Config = {
  appCode: string;
  cv: {
    mirage: {
      host: { path: string; ownerId: string; fallback: string };
      useSsl: { path: string; ownerId: string; fallback: boolean };
    };
  };
};

const {
  APP_CODE,
  MIRAGE_HOST_CV_PATH,
  MIRAGE_USE_SSL_CV_PATH,
  MIRAGE_URL,

  CV_OWNER_ID,
} = process.env;

const appCode = "Cat_Viewer";
const rawFallbackUrl = `http://localhost:${3000}/`;
const fallbackHost = rawFallbackUrl.split("/")[2] ?? `localhost:${3000}/`;
const fallbackUseSSL = rawFallbackUrl.startsWith("https");

console.log(fallbackHost, fallbackUseSSL);

export const config: Config = {
  appCode,
  cv: {
    mirage: {
      host: {
        path: MIRAGE_HOST_CV_PATH ?? "",
        ownerId: CV_OWNER_ID ?? "",
        fallback: fallbackHost,
      },
      useSsl: {
        path: MIRAGE_USE_SSL_CV_PATH ?? "",
        ownerId: CV_OWNER_ID ?? "",
        fallback: fallbackUseSSL,
      },
    },
  },
};
