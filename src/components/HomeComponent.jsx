import React from 'react';
import '../css/home.css'; // Optional: for extra styling
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  return (
    <div className="homepage">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand"to={'/'} >Masomo School</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#cbc">CBC Curriculum</a></li>
              <li className="nav-item"><a className="nav-link" href="#why-masomo">Why Us</a></li>
              <li className="nav-item"><Link className="nav-link" to={"/login"}>Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero position-relative text-white">
        <img src="images/banner1.jpg" alt="Hero Banner" className="w-100 img-fluid" style={{ maxHeight: '500px', objectFit: 'cover' }} />
        <div className="hero-text position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-50 p-4 rounded">
          <h1>Empowering Minds Through Competence</h1>
          <p>Welcome to Masomo School – Nurturing Future Leaders in Kenya.</p>
          <a href="#cbc" className="btn btn-light">Learn More About CBC</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-success">About Masomo School</h2>
          <p>
            Masomo School is a leading institution dedicated to providing quality education rooted in the Competency-Based Curriculum (CBC) as set by the Kenyan Ministry of Education.
            We focus on holistic development, creativity, and real-world skills for tomorrow’s leaders.
          </p>
        </div>
      </section>

      {/* CBC Section */}
      <section id="cbc" className="py-5">
        <div className="container">
          <h2 className="text-success">Understanding CBC in Kenya</h2>
          <p>
            The Competency-Based Curriculum (CBC) was introduced in Kenya to replace the 8-4-4 system. It focuses on nurturing learners' talents and abilities through practical,
            skill-oriented learning experiences. CBC emphasizes learner-centered teaching and aims at developing competencies that align with national development goals.
          </p>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">✔️ Focus on Skills & Talents</li>
            <li className="list-group-item">✔️ Learner-Centered Approach</li>
            <li className="list-group-item">✔️ Real-Life Problem Solving</li>
            <li className="list-group-item">✔️ Continuous Assessment</li>
          </ul>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-masomo" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-success text-center mb-4">Why Choose Masomo School?</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Experienced Teachers</h3>
                  <p className="card-text">Our educators are trained in CBC and committed to student growth.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Modern Facilities</h3>
                  <p className="card-text">We provide state-of-the-art labs, libraries, and learning spaces.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Co-Curricular Activities</h3>
                  <p className="card-text">Students explore sports, arts, tech, and leadership beyond books.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 text-center">
        <div className="container">
          <h2 className="text-success">Join Masomo School Today!</h2>
          <p>Enroll your child in a school that builds future-ready citizens.</p>
          <a href="/admissions" className="btn btn-success">Apply Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Masomo School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;
