/**
 * Determines the base URL for API requests based on the environment.
 * @returns {string}
 */
export const getBaseUrl = () => {
  // Check if running on localhost (Vite dev server)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // In production, use relative path if served from same origin,
  // or a specific Cloud Run URL if configured.
  return import.meta.env.VITE_API_URL || '';
};
