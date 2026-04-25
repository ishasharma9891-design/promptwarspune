let cachedProfile = null;

/**
 * Gets the cached profile or fetches it from Firestore.
 * Caches in memory for the duration of the session.
 */
export const getProfileCached = async (fetchFn) => {
  if (cachedProfile) {
    return cachedProfile;
  }
  
  const profile = await fetchFn();
  cachedProfile = profile;
  return profile;
};

export const clearProfileCache = () => {
  cachedProfile = null;
};

export const updateProfileCache = (newProfile) => {
  cachedProfile = { ...cachedProfile, ...newProfile };
};
