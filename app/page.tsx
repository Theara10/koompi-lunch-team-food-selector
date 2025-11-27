"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { dishes, type Dish } from "./data/dishes";

export default function Home() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectRandomDish = () => {
    setIsAnimating(true);
    // Simulate a shuffle effect
    let shuffleCount = 0;
    const maxShuffles = 10;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * dishes.length);
      setSelectedDish(dishes[randomIndex]);
      shuffleCount++;
      if (shuffleCount >= maxShuffles) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#f8f5f2] text-slate-800 font-sans selection:bg-orange-200 selection:text-orange-900 pb-24">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-8 space-y-2">
          <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 tracking-tight pb-2">
            KOOMPI Lunch Team
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-light max-w-2xl mx-auto">
            Don't know what to eat? I got you covered!
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Recipe Display */}
          {selectedDish && (
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-500 ease-in-out transform animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-48 sm:h-64 lg:h-full bg-slate-100">
                  {selectedDish.image ? (
                    <Image
                      src={selectedDish.image}
                      alt={selectedDish.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-orange-50 text-orange-200">
                      <svg
                        className="w-16 h-16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                      {selectedDish.name}
                    </h2>
                    <div className="h-1 w-16 bg-orange-500 rounded-full" />
                  </div>

                  <div className="space-y-6">
                    {/* Ingredients */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        Ingredients
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1">
                        {selectedDish.ingredients.map((ingredient, index) => (
                          <li
                            key={index}
                            className="text-slate-600 text-xs sm:text-sm flex items-start"
                          >
                            <span className="text-orange-400 mr-1.5">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        Instructions
                      </h3>
                      <ol className="space-y-2">
                        {selectedDish.instructions.map((instruction, index) => (
                          <li key={index} className="flex">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center mr-2 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                              {instruction}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!selectedDish && !isAnimating && (
            <div className="text-center p-8 bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl w-full">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">
                Ready to Cook?
              </h3>
              <p className="text-slate-500 text-sm">
                Click the button below to find your next delicious meal.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Action Button */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <button
          onClick={selectRandomDish}
          disabled={isAnimating}
          className="pointer-events-auto group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-orange-600 rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="mr-2">
            {isAnimating ? "Discovering..." : "Find a Recipe"}
          </span>
          {!isAnimating && (
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
          {isAnimating && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </main>
  );
}
