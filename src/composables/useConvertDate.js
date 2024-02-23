
export default function useDateConverter() {
  const convertDate = (dateString, options = {}) => {
    const { weekday = 'short', day = 'numeric', month = 'long', year = 'numeric' } = options;

    const date = new Date(dateString);
    const formatterOptions = { timeZone: 'UTC', weekday, day, month, year };
    const formatter = new Intl.DateTimeFormat('id-ID', formatterOptions);
    const formattedDate = formatter.format(date);

    return formattedDate;
  };

  return {
    convertDate,
  };
}
