import React from 'react';

function ResumeItem({ title, time, location, details }) {
  return (
    <div className='resume-item'>
      <h4>{title}</h4>
      <h5>{time}</h5>
      <p>
        <em>{location}</em>
      </p>
      {details && (
        <ul>
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResumeItem;
