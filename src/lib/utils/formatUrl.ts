import normalizeUrl from "normalize-url";

export const formatUrl = (url: string): string => {
  const normalizedUrl = normalizeUrl(url, {
    stripProtocol: true,
    stripWWW: true,
  });

  return normalizedUrl;
};
