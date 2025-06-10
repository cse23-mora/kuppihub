import dynamic from 'next/dynamic';
import React from 'react'; // Removed useEffect, useState

// Dynamically import ThreeDModel for client-side rendering only
const ThreeDModel = dynamic(() => import('@/components/ThreeDModel'), {
  ssr: false,
  loading: () => <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex justify-center items-center bg-gray-100 rounded-md"><p>Loading 3D Model...</p></div>
});

// Preloader import is removed as preloader logic is removed
// import Preloader from '@/components/Preloader';

export default function Contact() {
  // Removed loading state and useEffect for preloader and scrollTo

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">
          Got a question or feedback? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* 3D Model */}
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <ThreeDModel />
          </div>
        </div>
      </div>
    </div>
  );
}
