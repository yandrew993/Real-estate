// src/components/imageSlider/ImageSlider.jsx
import React, { useState, useEffect } from "react";
import "./imageSlider.scss";

const images = ["Real-Estate-Kenya.jpg", "bgR.png", "bg.png"];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 15000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="slider">
      <div className="slider-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`slider-image ${currentIndex === index ? "active" : ""}`}
          />
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
