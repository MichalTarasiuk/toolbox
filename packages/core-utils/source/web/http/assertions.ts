/**
 * Check that the url is image resource.
 *
 * @param url Uniform Resource Locator
 */
export const isImageUrl = async (url: string) => {
  const response = await fetch(url, { method: 'HEAD' })

  return response.headers.get('Content-Type')?.startsWith('image')
}
