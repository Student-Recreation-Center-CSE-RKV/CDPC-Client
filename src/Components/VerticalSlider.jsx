import React from 'react';
import Slider from 'react-slick';
import './Styles/verticalSlider.css'; // Add custom styles

const images = [
  'https://via.placeholder.com/300x200?text=Image+1',
  'https://via.placeholder.com/300x200?text=Image+2',
  'https://via.placeholder.com/300x200?text=Image+3',
  'https://via.placeholder.com/300x200?text=Image+4',
];

const VerticalCarousel = () => {
  const settings = {
    dots: false,              // Disable dots
    infinite: true,           // Infinite scrolling
    slidesToShow: 1,          // Show 1 slide at a time
    slidesToScroll: 1,        // Scroll 1 slide at a time
    vertical: true,           // Enable vertical movement
    verticalSwiping: true,    // Enable vertical swipe gestures
    autoplay: true,           // Autoplay carousel
    autoplaySpeed: 2000,      // Set autoplay speed (2 seconds)
    arrows: false,            // Hide left-right arrows
  };

  return (
    <div style={{ width: '250px', margin: '0 auto' }}>
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={index}>
            <img src={item} alt={`Carousel${index}`} style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VerticalCarousel;
