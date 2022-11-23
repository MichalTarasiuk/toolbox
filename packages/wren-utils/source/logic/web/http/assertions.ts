/**
 * Check that the url is image resource.
 *
 * @param url Uniform Resource Locator
 */
export const isImageUrl = async (url: string) => {
  const response = await fetch(url, {method: 'HEAD'});

  return response.headers.get('Content-Type')?.startsWith('image');
};

/**
 * Checks if two URLs are on the same origin.
 */
export const isSameOrigin = (source: string, destination: string) => {
  try {
    const localURL = new URL(source);
    const destinationURL = new URL(destination);

    return localURL.protocol === destinationURL.protocol && localURL.host === destinationURL.host;
  } catch {
    // throw error when destination is path

    return true;
  }
};

/**
 * Checks if the provided string is a valid JSON.
 */
export const isValidJSON = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};
