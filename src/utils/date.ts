import dayjs from 'dayjs';

export const dateFormat = (
  date = new Date(),
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  return dayjs(date).format(format);
};
