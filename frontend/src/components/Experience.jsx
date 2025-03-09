import React from 'react';
import ResumeItem from './ResumeItem'; // Assuming you have a ResumeItem component

function Experience() {
  const experienceData = [
    {
      title: 'Full Stack Web Developer Fellow',
      time: '2023 - Present',
      location: 'Pursuit, New York, NY',
      details: [
        'Developing full-stack applications using modern JavaScript frameworks',
        'Building RESTful APIs with Node.js and Express',
        'Implementing responsive design principles and user authentication',
      ],
    },
    {
      title: 'Workforce Management',
      time: 'November 2020 - November 2022',
      location: 'Cognizant Intuitive Operations & Automation',
      details: [
        'Saved 1,095+ labor hours by streamlining attendance tracking and reducing occurrence logging time by 7 minutes per entry.',
        'Recovered 160+ labor hours and minimized login disruptions via persistent sessions and systemized tech fixes.',
        'Established a cross-shift "handoff" ritual, fostering collaboration and evolving into a company-wide best practice.',
        'Created a troubleshooting database, centralizing key resources and reducing resolution time for common issues.',
        'Reduced billing variance by 30%, automating reconciliation with Google Sheets scripts and formulas to ensure compliance.',
      ],
    },
    {
      title: 'Fraud Analyst',
      time: 'October 2015 - November 2020',
      location: 'Health ECommerce',
      details: [
        'Prevented $500K in fraud losses by refining guardrails and identifying website vulnerabilities using Salesforce.',
        'Improved fraud detection accuracy and customer satisfaction by collaborating with developers via Jira to enhance prevention tools.',
        'Led cross-training initiatives and standardized escalation handling, increasing SLA compliance and fraud response efficiency.',
      ],
    },
    // Add more experience items here
  ];

  return (
    <div>
      {experienceData.map((item, index) => (
        <ResumeItem key={index} {...item} />
      ))}
    </div>
  );
}

export default Experience;
