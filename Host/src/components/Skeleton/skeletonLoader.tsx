import React from "react";
import "../../styles/Skeleton/skeletonLoader.css";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="skeleton-loader-container">
      <div className="skeleton-header"></div>
      <div className="skeleton-sidebar"></div>
      <div className="skeleton-content"></div>
    </div>
  );
};

export default SkeletonLoader;
