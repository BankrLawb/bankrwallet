export const onchainKitAppName = "BankrLawb";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const onchainKitAppLogoUrl = `${siteUrl.replace(/\/$/, "")}/logo.png`;

export const onchainKitApiKey =
  process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY?.trim() || undefined;

export const hasOnchainKitApiKey = Boolean(onchainKitApiKey);
