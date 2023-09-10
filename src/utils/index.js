// TODO: bug on the date displayed, off by one probably due to timezone

export const ItineraryType = {
  Activity: 0,
  Flight: 1,
  LodgingCheckin: 2,
  LodgingCheckout: 3,
}

export const tripTitle = ({ title }) => {
  return title;
}

export const tripDateString = ({ startDate, destinations }) => {
  const startDateJS = new Date(startDate);

  let numberOfDays = 0;
  for (let destination of destinations) {
    numberOfDays += destination.numberOfDays;
  }

  const endDateJS = new Date(startDate);
  endDateJS.setDate(startDateJS.getDate() + numberOfDays);

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

  return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
}

export const numberOfPeopleString = ({ numberOfPeople }) => {
  return `${numberOfPeople} ${numberOfPeople > 1 ? 'people' : 'person'}`
}

export const destinationCitiesString = ({ destinations }) => {
  return destinations.map((dC) => dC.city).join(', ');
}

export const cityFromString = ({ cityFrom }) => {
  return cityFrom;
}

export const dayItineraryDate = ({ startDate, itinerary,}, idx) => {
  const itineraryDateJS = new Date(startDate);
  itineraryDateJS.setDate(itineraryDateJS.getDate() + idx);
  // const endDateJS = new Date(endDate); // TODO: use it in edge case scenarios

  const itineraryDay = itineraryDateJS.getDate();
  const itineraryMonth = itineraryDateJS.toLocaleString('default', { month: 'short' });
  const itineraryYear = itineraryDateJS.getFullYear();

  return `${itineraryMonth} ${itineraryDay}`;
}

export const itineraryItemSummaryDescription = ({ itineraryType, description}) => {
  let type = 'TBD';

  switch (itineraryType) {
    case ItineraryType['Activity']:
      type = 'Activity';
      break;
    case ItineraryType['Flight']:
      type = 'Flight';
      break;
    case ItineraryType['LodgingCheckin']:
      type = 'Check-in';
      break;
    case ItineraryType['LodgingCheckout']:
      type = 'Check-out';
  }

  return `${type}: ${description}`;
}
