import { useState, useEffect } from "react";

// Slide Component
function Slide({ imageUrl, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <h2 className="text-2xl mt-4 text-center">{title}</h2>
      <p className="mt-2 text-center">{description}</p>
    </div>
  );
}

// Carousel Component
export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  // Slide data defined within the Carousel component
  const slideData = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/800x400?text=Slide+1",
      title: "Slide 1",
      description: "This is the first slide."
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/800x400?text=Slide+2",
      title: "Slide 2",
      description: "This is the second slide."
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/800x400?text=Slide+3",
      title: "Slide 3",
      description: "This is the third slide."
    }
  ];

  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slideData.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slideData.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="overflow-hidden relative w-full h-full">
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${curr * 100}%)`, width: `${slideData.length * 100}%` }}
      >
        {slideData.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 h-full">
            <Slide
              imageUrl={slide.imageUrl}
              title={slide.title}
              description={slide.description}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <span>&#x2190;</span>
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <span>&#x2192;</span>
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slideData.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}