import React from 'react';

const Frame = ({ frame }) => {
  const displays = {
    strike: 'X',
    spare: '/',
  };
  return ( 
    <div>
      {frame.status === 'open' ? frame.score : displays[frame.status]}
    </div>
  );
}

export default Frame;