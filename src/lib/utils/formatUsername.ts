export const formatUsername = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9-_]/g, "");
};
