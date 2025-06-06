import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-3">
      {/* Big error code */}
      <h1 className="display-1 fw-bold text-primary mb-0">404</h1>

      {/* Friendly message */}
      <p className="lead mt-2 mb-4 text-muted">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Two quick-action buttons */}
      <div className="d-flex gap-3 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-primary btn-sm d-flex align-items-center"
        >
          <i className="bi bi-arrow-left me-1" /> Go Back
        </button>

        <Link
          to="/"
          className="btn btn-primary btn-sm d-flex align-items-center"
        >
          <i className="bi bi-house-door me-1" /> Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
