
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const signInUrl = "/api/v1/signin";
export const providerSignInUrl = "/api/v1/provider-login";
export const signUpUrl = "/api/v1/signup";
export const dashboardUrl = "/api/v1/dashboard";

export const githubId = process.env.GITHUB_ID || "";
export const githubSecret = process.env.GITHUB_SECRET || "";
export const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
