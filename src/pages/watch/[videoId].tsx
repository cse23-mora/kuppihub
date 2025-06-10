import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
// Import Link if related videos are to be linked via next/link
// import Link from 'next/link';

// Define types
type VideoType = {
  id: number | string; // Assuming id can be number or string from JSON
  title: string;
  description: string;
  subject: string; // Used for related videos
  YoutubeVideo?: string; // URL for the YouTube video
  // Add other video properties if available
};

type WatchVideoPageProps = {
  video: VideoType;
  relatedVideos: VideoType[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const videoRes = await fetch('https://raw.githubusercontent.com/cse23-mora/kuppihub-data/refs/heads/main/sem2.json');
  const videos: VideoType[] = await videoRes.json();

  const paths = videos
    .filter(video => video.YoutubeVideo) // Only generate paths for videos that have a YouTube link
    .map((video) => ({
      params: { videoId: video.id.toString() },
    }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<WatchVideoPageProps, { videoId: string }> = async (context) => {
  const { params } = context;
  const videoId = params!.videoId;

  const videoRes = await fetch('https://cse23.org/kuppihub-data/sem2.json');
  const allVideos: VideoType[] = await videoRes.json();

  const currentVideo = allVideos.find((v) => v.id.toString() === videoId);

  if (!currentVideo || !currentVideo.YoutubeVideo) {
    return { notFound: true };
  }

  // Optional: Filter related videos (e.g., from the same subject, excluding current)
  const relatedVideos = allVideos.filter(
    (v) => v.subject === currentVideo.subject && v.id.toString() !== videoId && v.YoutubeVideo
  ).slice(0, 5); // Limit related videos and ensure they are also YouTube videos

  return {
    props: {
      video: currentVideo,
      relatedVideos: relatedVideos,
    },
  };
};

export default function WatchVideoPage({ video, relatedVideos }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="p-4 sm:p-8 text-center">Loading...</div>;
  }

  // Helper to extract YouTube video ID from URL (can be moved outside component or to a utils file)
  function getYouTubeId(url?: string): string | null {
    if (!url) return null;
    // Support watch, youtu.be, and embed URLs
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const youtubeId = getYouTubeId(video.YoutubeVideo);

  // This check is largely handled by getStaticProps notFound, but good for robustness if props were somehow invalid
  if (!youtubeId) {
    return (
      <div className="p-4 sm:p-8 text-center text-red-600 font-semibold">
        Invalid or missing YouTube URL for this video.
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
      <div className="w-full max-w-4xl mx-auto px-4 mb-8"> {/* Added mb-8 for spacing */}
        <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
          {video.description}
        </p>
      </div>

      {/* Related Videos Section (Basic Example) */}
      {relatedVideos && relatedVideos.length > 0 && (
        <div className="w-full max-w-4xl mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">Related Videos:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedVideos.map(relVideo => (
              <Link key={relVideo.id} href={`/watch/${relVideo.id.toString()}`} className="block p-3 bg-white rounded-lg shadow hover:shadow-md transition">
                  <p className="text-sm font-medium text-blue-600 truncate">{relVideo.title}</p>
                  <p className="text-xs text-gray-500">{relVideo.subject}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}