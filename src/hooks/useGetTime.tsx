export const useGetTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const start = 21;
  const end = 24;
  return hour >= start && hour < end;
};
