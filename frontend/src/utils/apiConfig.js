/**
 * Determines the base URL for API requests.
 * Uses relative paths by default to support Vite proxy and same-origin deployments.
 * @returns {string}
 */
export const getBaseUrl = () => {
  // Allow explicit override via env variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Default to relative path (works with Vite proxy and same-origin prod)
  return '';
};
