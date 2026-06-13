const addTimeSlots = (start, end) => {
  const times = [];
  let currentTime = new Date(start);

  while (currentTime <= end) {
      times.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
  }
  return times;
};

export default addTimeSlots;