import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Science in Software Engineering</h4>
                <h5>FAST National University</h5>
              </div>
              <h3>2022-2026</h3>
            </div>
            <p>
              Currently pursuing a degree in Software Engineering with a focus on modern software development practices,
              algorithms, data structures, and full-stack development. Actively participating in university projects and
              hackathons to enhance practical skills and collaborative problem-solving abilities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate in Pre-Engineering</h4>
                <h5>Adamjee Government Science College, Karachi</h5>
              </div>
              <h3>2020-2022</h3>
            </div>
            <p>
              Completed pre-engineering studies with a strong foundation in mathematics, physics, and computer science.
              Developed analytical thinking and problem-solving skills that formed the basis for my software engineering career.
              Participated in various technical competitions and coding events.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Full-Stack Developer</h4>
                <h5>Remote Client Projects</h5>
              </div>
              <h3>2023-Present</h3>
            </div>
            <p>
              Working with international clients to deliver custom web and mobile applications. Specializing in MERN stack development,
              machine learning integration, and secure application architecture. Successfully completed projects in e-commerce,
              healthcare analytics, and secure data management systems with a focus on user experience and performance optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
