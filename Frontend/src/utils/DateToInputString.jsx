const DateToInputString = (date) => {
    if (!date) return null;
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString();
};
  
export default DateToInputString;