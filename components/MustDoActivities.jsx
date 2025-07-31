import React, { useState, useEffect } from "react";
import Image from "next/image";

import koutoubia from "../public/actitvities/koutoubia.png";
import wakeBoard from "../public/actitvities/wake-board.png";
import motoCross from "../public/actitvities/moto-cross.jpg";
import potteryClass from "../public/actitvities/pottery-class.jpg";
import parapente from "../public/actitvities/parapente.jpg";
import cookClass from "../public/actitvities/cook-class.jpeg";
import buggy from "../public/actitvities/buggy-palmeraie.jpg";

import Link from "next/link";

import { nanoid } from "nanoid";

export default function MustDoActivities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activities = [
    {
      title: "Visite de la Koutoubia",
      src: koutoubia,
      price: "00.00",
    },
    {
      title: "Balade en moto-cross",
      src: motoCross,
      price: "00.00",
    },
    {
      title: "Wake Board",
      src: wakeBoard,
      price: "00.00",
    },
    {
      title: "Buggy à la palmeraie",
      src: buggy,
      price: "00.00",
    },
    {
      title: "Cours de cuisine dans un riad",
      src: cookClass,
      price: "00.00",
    },
    {
      title: "Atelier de potterie",
      src: potteryClass,
      price: "00.00",
    },
    {
      title: "Parapente",
      src: parapente,
      price: "00.00",
    },
  ];

  // Calculate how many cards to show based on screen size
  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1200) return 4; // lg screens
      if (window.innerWidth >= 768) return 3; // md screens
      if (window.innerWidth >= 640) return 2; // sm screens
      return 1; // mobile
    }
    return 4; // default for SSR
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, activities.length - cardsToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const cardWidth = 100 / cardsToShow;

  return (
    <div className="mt-[7rem] flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold">Must-do activities</h1>

      <div className="relative w-full max-w-10xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsToShow)
                }%)`,
                width: `${activities.length * (100 / cardsToShow)}%`,
              }}
            >
              {activities.map((element, index) => (
                <div
                  key={nanoid(10)}
                  className="px-3"
                  style={{
                    flex: `0 0 ${100 / cardsToShow}%`,
                    maxWidth: `${100 / cardsToShow}%`,
                  }}
                >
                  <Link href={`/activity/${element.title}`} key={index}>
                    <div className="flex flex-col items-center bg-white/5 gap-2 rounded-[8px] shadow border border-gray-100 w-full min-h-[320px] p-4">
                      <div className="relative w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-gray-100">
                        <img
                          src={element.src}
                          alt={element.title}
                          //fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          //priority={index < 4}
                        />
                      </div>
                      <div className="flex flex-col items-center flex-1 justify-between w-full">
                        <h1 className="text-lg font-bold text-gray-800 text-center mt-2">
                          {element.title}
                        </h1>
                        <p className="text-sm font-medium text-gray-600 text-center mt-1">
                          From {element.price} €
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous activities"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next activities"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        {maxIndex > 0 && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`text-sm px-3 py-1 rounded-full transition-all duration-200 ${
              isAutoPlaying
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
