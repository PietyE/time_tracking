import React from 'react';

const ProjectManagementComponent = () => {
  return (
    <div className="display-flex">
      <h1>ProjectManagementComponent works</h1>
        <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-outline-secondary mr-4">
        Create new project</button>
        </div>
    </div>
  );
};

export default ProjectManagementComponent;