"use client";
import React, { useEffect, useRef, useState } from "react";

const Counter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const increment = target / (duration / 10);

          const step = () => {
            start += increment;
            if (start >= target) {
              setCount(target);
            } else {
              setCount(Math.floor(start));
              setTimeout(step, 10);
            }
          };
          step();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const OurMission = () => {
  return (
    <section className="sec_two_block_counter py-12 sm:py-16 text-white bg-gradient-to-br from-[#4A6A4D] to-[#D4A01EE0]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <span className="text-xs sm:text-sm font-semibold uppercase text-yellow-200">
              Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 mb-4 leading-snug">
              Every purchase <br className="hidden sm:block" /> has a purpose
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-white/90">
              We have direct partnerships with over 320 Indian artisans and over
              2000 indirectly. As a social enterprise that seeks to offer a
              fair-trade platform, our primary purpose is to support handicraft
              workers. With each purchase you make, you can help make a
              difference.
            </p>
          </div>

          {/* Counter Section */}
          <div className="md:w-1/2 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-8 items-center justify-center">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-white">
                <Counter target={21} suffix="+" />
              </span>
              <p className="text-base sm:text-lg mt-2">STATES</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-white">
                <Counter target={2000} />
              </span>
              <p className="text-base sm:text-lg mt-2">INDIAN ARTISANS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
