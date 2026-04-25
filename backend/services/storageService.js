const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

/**
 * Generates a signed URL for a file in GCS.
 * @param {string} bucketName - Name of the bucket.
 * @param {string} fileName - Name of the file.
 * @returns {Promise<string>} Signed URL valid for 1 hour.
 */
const getSignedUrl = async (bucketName, fileName) => {
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  };
  const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl(options);
  return url;
};

/**
 * Lists files in a session's directory.
 * @param {string} bucketName - Name of the bucket.
 * @param {string} sessionId - User session ID.
 * @returns {Promise<Array>} List of file objects.
 */
const listSessionFiles = async (bucketName, sessionId) => {
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: `uploads/${sessionId}/` });
  return files.map(f => ({ name: f.name, id: f.id }));
};

module.exports = { getSignedUrl, listSessionFiles };
