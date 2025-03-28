import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div
      className='project-card'
      data-aos='fade-up'
      data-aos-delay='100'
    >
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectCard;
