import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function WatchVideo() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch('https://cse23.org/kuppihub-data/sem2.json')
      .then(res => res.json())
      .then(data => {
        // Find by id (convert videoId param to number)
        const found = data.find(v => v.id === Number(videoId));
        setVideo(found);
      });
  }, [videoId]);

  if (video === null) {
    return <div className="p-4 sm:p-8 text-center">Loading...</div>;
  }

  // Check for YoutubeVideo property
  if (!video || !video.YoutubeVideo) {
    return (
      <div className="p-4 sm:p-8 text-center text-red-600 font-semibold">
        No video to show.
      </div>
    );
  }

  // Helper to extract YouTube video ID from URL
  function getYouTubeId(url) {
    if (!url) return null;
    // Support watch, youtu.be, and embed URLs
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const youtubeId = getYouTubeId(video.YoutubeVideo);

  if (!youtubeId) {
    return (
      <div className="p-4 sm:p-8 text-center text-red-600 font-semibold">
        Invalid YouTube URL.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 p-4 sm:p-6">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center px-4 max-w-4xl">
        {video.title}
      </h1>
      
      {/* Responsive YouTube iframe container */}
      <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
      
      {/* Description */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
}