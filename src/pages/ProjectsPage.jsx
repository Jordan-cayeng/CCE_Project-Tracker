import React, { useState } from "react";
import Layout from "../components/layout/Layout";  // ✅ includes sidebar + header internally
import ProjectHeader from "../components/Project/ProjectHeader";
import ActivityFeed from "../components/Project/ActivityFeed";
import PhaseCard from "../components/Project/PhaseCard";
import ContactsSection from "../components/Project/ContactsSection";
import data from "../../db.json";

export default function ProjectsPage() {
  const [project, setProject] = useState(data.projects?.[0] || {});
  const activePhases = project?.phases?.filter(
    (phase) => phase.status === "In Progress"
  );

  const handleProjectUpdate = (updatedProject) => {
    setProject({ ...updatedProject });
  };

  return (
    // ✅ Layout automatically handles Sidebar + Header
    <Layout>
      <div className="flex flex-col gap-6 p-6">
        <ProjectHeader project={project} setProject={handleProjectUpdate} />
        <ActivityFeed
          project={project}
          activePhases={activePhases}
          setProject={handleProjectUpdate}
        />
        <ContactsSection
          contacts={project.contacts}
          setProject={handleProjectUpdate}
        />
        <div className="flex flex-col gap-6">
          {project?.phases?.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              project={project}
              setProject={handleProjectUpdate}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
