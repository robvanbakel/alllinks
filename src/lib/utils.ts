import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUrl = (url: string) => {
  const { hostname, pathname } = new URL(url);

  let formattedUrl = hostname + pathname;

  if (formattedUrl.startsWith("www.")) {
    formattedUrl = formattedUrl.slice(4);
  }

  if (formattedUrl.endsWith("/")) {
    formattedUrl = formattedUrl.slice(0, -1);
  }

  return formattedUrl;
};

export const formatUsername = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9-_]/g, "");
};
