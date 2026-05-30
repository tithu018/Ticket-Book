const AUTH_STORAGE_KEY = 'tithu-auth-user';

export const getAuthSession = () => {
  try {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedSession) {
      return null;
    }

    const parsedSession = JSON.parse(storedSession);
    return parsedSession?.token
      ? parsedSession
      : { token: null, user: parsedSession };
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const getAuthUser = () => getAuthSession()?.user || null;

export const getAuthToken = () => getAuthSession()?.token || null;

export const saveAuthSession = (session) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('auth-change'));
};

export const saveAuthUser = (user) => saveAuthSession({ token: null, user });

export const clearAuthUser = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event('auth-change'));
};
