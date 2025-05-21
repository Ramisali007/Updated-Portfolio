import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  // Project data
  const projects = [
    {
      id: 1,
      title: "AutoEase - Car Rental Platform",
      category: "Full Stack Application",
      tools: "MERN Stack (MongoDB, Express, React, Node.js), Socket.IO, JWT, Google Maps API",
      description: "A modern car rental platform with real-time chat, booking management, and role-based access control. Features include user authentication, advanced car search, PDF invoices, and real-time notifications.",
      image: "/images/1.jpg",
      link: "https://github.com/Ramisali007/AutoEase"
    },
    {
      id: 2,
      title: "Interactive Portfolio Website",
      category: "Frontend Development",
      tools: "React, TypeScript, GSAP, Three.js, WebGL",
      description: "A modern, interactive portfolio website featuring 3D character animations, smooth scrolling effects, and responsive design. Implements advanced animations using GSAP and Three.js for an immersive user experience.",
      image: "/images/2.jpg",
      link: "https://github.com/Ramisali007/Updated-Portfolio"
    },
    {
      id: 3,
      title: "SkillSwap Platform",
      category: "Full Stack Application",
      tools: "MERN Stack, Microservices, Socket.IO, JWT, Tailwind CSS, Chart.js",
      description: "A comprehensive freelancing platform connecting freelancers with clients. Features include role-based authentication, real-time bidding, in-app messaging, project management, and analytics dashboards. Built with a microservices architecture for scalability.",
      image: "/images/3.jpg",
      link: "https://github.com/Ramisali007/Skill-Swap"
    },
    {
      id: 4,
      title: "Intelligent Patient Flow & Diagnosis Modeling",
      category: "Healthcare Analytics",
      tools: "Python, Streamlit, Machine Learning, Stochastic Processes, Plotly, Scikit-learn",
      description: "A sophisticated healthcare analytics platform that implements stochastic processes and machine learning models to analyze patient flow and predict diagnoses in hospitals. Features include Markov chains for patient transitions, Hidden Markov Models for health states, Poisson processes for arrivals, and interactive 3D visualizations.",
      image: "/images/4.jpg",
      link: "https://github.com/Ramisali007/Intelligent-Patient-Flow-and-diagnosis-Modelling-in-Smart-Hospitals"
    },
    {
      id: 5,
      title: "Deepfake Detection & Software Defect Prediction",
      category: "Machine Learning",
      tools: "Python, PyTorch, Streamlit, SVM, Neural Networks, Audio Processing",
      description: "A comprehensive ML classification pipeline implementing multiple models (SVM, Logistic Regression, Perceptron, DNN) for two distinct tasks: detecting deepfake audio in Urdu and predicting software defects. Features include audio feature extraction, multi-label classification, and an interactive Streamlit interface for real-time predictions.",
      image: "/images/5.jpg",
      link: "https://github.com/Ramisali007/Urdu-Deepfake-Audio-Detection"
    },
    {
      id: 6,
      title: "Secure Photo Storage & Sharing Platform",
      category: "Cryptography & Security",
      tools: "Python, Flask, Public-Key Cryptography, AES Encryption",
      description: "A secure photo storage and sharing platform implementing public-key cryptography for user authentication and secure photo sharing. Features include user registration with public keys, encrypted photo storage using AES, secure friend-to-friend photo sharing, and multi-device support with key management.",
      image: "/images/6.jpg",
      link: "https://github.com/Ramisali007/Extending-Photo-Storage-with-Public-Key-Cryptography"
    }
  ];

  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{project.id}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "10px", fontSize: "14px" }}>{project.description}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
