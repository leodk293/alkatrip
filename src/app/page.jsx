"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import Footer from "../../components/Footer";

import MustDoActivities from "../../components/MustDoActivities";
import TraditionalSpas from "../../components/TraditionnalSpas";
import SwimmingPool from "../../components/SwimmingPool";

import restaurant from "../../public/restaurant.jpg";
import swimming_pool from "../../public/swimming-pool.jpg";
import forest from "../../public/forest.jpg";
import villa from "../../public/villa.jpg";
import activity from "../../public/actitvity.jpg";
import car from "../../public/car.jpg";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { src: restaurant, alt: "Restaurant experience" },
    { src: swimming_pool, alt: "Swimming pool experience" },
    { src: forest, alt: "Forest experience" },
  ];

  const categories = [
    { src: villa, alt: "Villa & Riads" },
    { src: activity, alt: "Activities" },
    { src: restaurant, alt: "Restaurant experience" },
    { src: swimming_pool, alt: "Swimming pools" },
    { src: car, alt: "Car rental" },
    { src: forest, alt: "Forest experience" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="relative w-full h-screen">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="block mb-2 sm:mb-4">Experiences to live,</span>
              <span className="block">not to seek.</span>
            </h1>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
          aria-label="Previous image"
        >
          <ChevronLeft
            size={24}
            className="text-white group-hover:scale-110 transition-transform sm:w-8 sm:h-8"
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 group"
          aria-label="Next image"
        >
          <ChevronRight
            size={24}
            className="text-white group-hover:scale-110 transition-transform sm:w-8 sm:h-8"
          />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / images.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap mt-10 justify-center gap-6 sm:gap-8 py-4">
        {categories.map((element) => (
          <Link href={""} key={element.alt}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                <Image
                  src={element.src}
                  alt={element.alt}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                  priority
                />
              </div>
              <p className="text-center text-sm sm:text-base font-medium">
                {element.alt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <MustDoActivities />
      <TraditionalSpas />
      <SwimmingPool />

      <Footer />
    </main>
  );
}
