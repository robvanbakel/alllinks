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
