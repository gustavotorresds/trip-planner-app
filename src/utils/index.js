// TODO: bug on the date displayed, off by one probably due to timezone

export const tripDateString = ({ startDate, endDate }) => {
  const startDateJS = new Date(startDate);
  const endDateJS = new Date(endDate);

  const startDay = startDateJS.getDate();
  const startMonth = startDateJS.toLocaleString('default', { month: 'short' });
  const startYear = startDateJS.getFullYear();

  const endDay = endDateJS.getDate();
  const endMonth = endDateJS.toLocaleString('default', { month: 'short' });
  const endYear = endDateJS.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`
  } else if (startMonth !== endMonth) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`
  }

  return `${startMonth} ${startDay} - ${endDay}, ${startYear}`
}

export const numberOfPeopleString = ({ numberOfPeople }) => {
  return `${numberOfPeople} ${numberOfPeople > 1 ? 'people' : 'person'}`
}

export const destinationCitiesString = ({ destinationCities }) => {
  return destinationCities.map((dC) => dC.city).join(', ');
}

export const cityFromString = ({ cityFrom }) => {
  return cityFrom;
}
