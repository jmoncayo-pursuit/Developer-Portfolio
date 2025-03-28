import React from 'react';
import ResumeItem from './ResumeItem';

function Education() {
  const educationData = [
    {
      title: 'Full Stack Web Development',
      time: '2023 - 2024',
      location: 'Pursuit, New York, NY',
      details: [
        'Intensive 12-month software engineering fellowship',
        'Front-end: React, JavaScript, HTML5, CSS3',
        'Back-end: Node.js, Express, PostgreSQL',
      ],
    },
    // Add more education items here if needed
  ];

  return (
    <div className='resume-section'>
      <h3>Education</h3>
      {educationData.map((item, index) => (
        <ResumeItem key={index} {...item} />
      ))}
    </div>
  );
}

export default Education;
