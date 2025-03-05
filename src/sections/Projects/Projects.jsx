import styles from './ProjectsStyles.module.css';

import ProjectCard from '../../common/ProjectCard';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={"https://logo.com/image-cdn/images/kts928pd/production/0edce5f2a29f39d2266c1ded3a9107bfe806736a-357x352.png?w=1080&q=72&fm=webp"}
          link="https://github.com/MohamedMeksi/frontend-blogs"
          h3="blogs"
          p="cite web"
        />


      </div>
    </section>
  );
}

export default Projects;
