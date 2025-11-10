export default function daysInShelter(dateEntered) {
  const today = new Date();
  dateEntered = new Date(dateEntered);
  const timeDifference = today.getTime() - dateEntered.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}
