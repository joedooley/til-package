export const checkForWindow = cb => typeof window !== 'undefined' && cb();

export const setLocation = path =>
  checkForWindow(() => {
    window.location.href = path;
  });
