import { useRouter } from 'next/router'; // To access route params if needed, though getStaticProps provides them
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link'; // For internal navigation
import { subjects as allSubjects } from '@/utils/subjects';
// Preloader might be used if fallback: true/blocking, or for client-side transitions
// For fallback: false and SSG, data is there at build time.
// import Preloader from '@/components/Preloader';

// Define types (can be moved to a types file)
type SubjectType = {
  slug: string;
  name: string;
  description?: string;
  // other fields from your subjects util
};

type VideoType = {
  id: string;
  subject: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  duration?: string;
  url?: string;
  DownloadLink?: string;
  telegramDownload?: string;
  telegramDownload2?: string;
  KuppiMaterial?: string;
  YoutubeVideo?: boolean; // Assuming this indicates if it's a YouTube video to be played internally
};

type SubjectPageProps = {
  videos: VideoType[];
  currentSubject: SubjectType;
};


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allSubjects.map((subject) => ({
    params: { subjectName: subject.slug },
  }));
  return { paths, fallback: false }; // fallback: false means 404 for unknown slugs
};

export const getStaticProps: GetStaticProps<SubjectPageProps, { subjectName: string }> = async (context) => {
  const { params } = context;
  const subjectName = params!.subjectName; // Non-null assertion as subjectName is part of the path

  // Fetch all video data
  const videoRes = await fetch('https://cse23.org/kuppihub-data/sem2.json', { cache: 'no-store' });
  const allVideos: VideoType[] = await videoRes.json();

  // Filter videos for the current subject
  const subjectVideos = allVideos.filter((video) => video.subject.toLowerCase() === subjectName.toLowerCase());

  // Find current subject details
  const currentSubject = allSubjects.find((s) => s.slug.toLowerCase() === subjectName.toLowerCase());

  if (!currentSubject) {
    return { notFound: true }; // Or handle as an error
  }

  return {
    props: {
      videos: subjectVideos,
      currentSubject,
    },
  };
};

const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path d="M9.999 15.17l-.422 4.96c.606 0 .868-.261 1.18-.574l2.828-2.692 5.863 4.288c1.075.591 1.844.281 2.13-.992l3.86-18.026c.328-1.547-.561-2.148-1.6-1.777L1.378 9.237c-1.52.585-1.5 1.423-.259 1.802l5.733 1.79L19.238 4.61c.595-.384 1.136-.172.69.213L9.999 15.17z" />
  </svg>
);



export default function SubjectPage({ videos, currentSubject }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Data (videos, currentSubject) is now passed as props.
  // Client-side fetching, loading states, and useParams are removed.
  // window.scrollTo(0,0) is removed.

  // Sort videos client-side (can also be done in getStaticProps if preferred)
  const sortedVideos = [...videos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Preloader check might be useful if fallback:true or 'blocking' is used in getStaticPaths
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading subject...</div>; // Or a Preloader component
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 capitalize">
            {currentSubject.name} Videos {/* Use currentSubject from props */}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            {sortedVideos.length} videos found
          </p>
        </div>

        {sortedVideos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No videos available for {currentSubject.name}.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {sortedVideos.map(video => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                    {video.title}
                  </h2>
                  <p className="text-gray-700 mb-3 line-clamp-3">{video.description}</p>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p>👩‍🏫 <span className="font-medium">Author:</span> {video.author}</p>


                 {video.duration && (
  <p>
    ⏱ <span className="font-medium">Duration:</span> {video.duration}
  </p>
)}
  <p>📅 <span className="font-medium">Published:</span> {new Date(video.publishedAt).toISOString().split('T')[0]}</p>


                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
  {video.url && (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer noopener"
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      🎥 Watch Video
    </a>
  )}

    {video.DownloadLink && (
    <a
      href={video.DownloadLink}
      target="_blank"
      rel="noreferrer noopener"
      className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
       ⬇️ Download
    </a>
  )}
  
  
  {video.telegramDownload && (
    <a
      href={video.telegramDownload}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-2 bg-[#229ED9] text-white px-4 py-2 rounded-lg hover:bg-[#1b8dbd] transition shadow-md"
    >
      <TelegramIcon />
      Download via Telegram
    </a>
  )}

  
  {video.telegramDownload && video.telegramDownload2 && (
  <a
    href={video.telegramDownload2}
    target="_blank"
    rel="noreferrer noopener"
    className="flex items-center gap-2 bg-[#229ED9] text-white px-4 py-2 rounded-lg hover:bg-[#1b8dbd] transition shadow-md"
  >
    <TelegramIcon />
    Download via Telegram part 2
  </a>
 )}



   {video.KuppiMaterial && (
    <a
      href={video.KuppiMaterial}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-2 bg-[#7ae52e] text-white px-4 py-2 rounded-lg hover:bg-[#b947f3] transition shadow-md"
    >
      <TelegramIcon />
      Download Kuppi Materials
    </a>
  )}



    {video.YoutubeVideo && (
     <Link
       href={`/watch/${video.id}`}
       className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
     >
      🎬 Watch on Youtube
     </Link>
  )}
</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
