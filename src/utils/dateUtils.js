import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('dddd, MMM D, YYYY');
};

export const TimeFormatter = (isoString) => {
  return moment(isoString).format('h:mm A');
};

export const isoToMMDDYYYY = (isoDate) => {
  return moment(isoDate).format('MM/DD/YYYY');
};

export const calculateDuration = (startTime, endTime) => {
  const duration = moment.duration(moment(endTime).diff(moment(startTime)));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes() % 60);
  
  let durationString = '';

  if (hours > 0) {
    durationString += `${hours} hours `;
  }

  if (minutes > 0) {
    durationString += `${minutes} minutes`;
  }

  return durationString.trim();
};

export const convertHoursToHoursAndMinutes = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

export const formatISOToLocalDateTime = (isoString) => {
  console.log('moment(isoString).: ', moment(isoString).format('MM/DD/YYYY h:mm a'));

  return moment(isoString).format('MM/DD/YYYY h:mm a');
};