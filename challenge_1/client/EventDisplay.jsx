import React from 'react';
import Moment from 'moment';

const EventDisplay = ({ event }) => {
  const { date, description } = event;
  return (
    <div>
      <div>
        {Moment(date)}
      </div>
      <div>
        {description}
      </div>
    </div>
  );
};

export default EventDisplay;
