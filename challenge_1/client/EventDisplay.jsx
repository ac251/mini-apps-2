import React from 'react';
import Moment from 'moment';

const EventDisplay = ({ event }) => {
  const { date, description } = event;
  const dateSegments = date.split('/');
  let displayDate;
  if (dateSegments.length === 1) {
    displayDate = parseInt(dateSegments[0], 10) > 0
      ? dateSegments[0]
      : `${-parseInt(dateSegments[0], 10)} BC`;
  } else {
    displayDate = Moment(date).format('MMMM Do YYYY');
  }
  return (
    <div className="event">
      <div>
        {displayDate}
      </div>
      <div dangerouslySetInnerHTML={{ __html: description.split(/\{\{[^]\}\}/) }} />
    </div>
  );
};

export default EventDisplay;
