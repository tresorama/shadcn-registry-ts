export const createPerformanceTimer = () => {
  const startDate = Date.now();
  return {
    getElapsedTime: () => Date.now() - startDate,
  };
};