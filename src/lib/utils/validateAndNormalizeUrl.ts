import normalizeUrl from "normalize-url";
import isUrl from "is-url";

export const validateAndNormalizeUrl = (input: string): string | null => {
  if (!input) return null;

  const normalizedUrl = normalizeUrl(input);
  const isUrlValid = isUrl(normalizedUrl);

  return isUrlValid ? normalizedUrl : null;
};
