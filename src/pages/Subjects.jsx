import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { subjects } from '../utils/subjects';

import Preloader from '../components/Preloader'; // Import Preloader component

export default function Subjects() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch videos from local JSON file
    fetch('https://cse23.org/kuppihub-data/sem2.json', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        setVideos(data);
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch(error => {
        console.error('Error loading videos:', error);
        setLoading(false); // Ensure loading is set to false even in case of an error
      });
  }, []);

  if (loading) {
    return <Preloader />; // Show preloader while loading
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            All Subjects
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map(subject => {
            const subjectVideos = videos.filter(v => v.subject === subject.slug);
       
          

            return (
              <Link 
                to={`/subjects/${subject.slug}`} 
                key={subject.slug}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl">
                  <div className="relative h-48 w-full">
                    <img
                      src={`/subjects/${subject.slug}.jpg`}
                      alt={subject.name}
                      className="h-full w-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-semibold">{subjectVideos.length} videos available</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                      {subject.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {`Explore ${subject.name} videos and materials`}
                    </p>
                  </div>

                  <div className="px-6 pb-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                 
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                         
                       
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
