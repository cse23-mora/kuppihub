import Link from "next/link";
import Image from "next/image";
import { subjects as allSubjectsFromUtil } from '@/utils/subjects';
import { motion } from "framer-motion";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

// Define types for props
type Subject = {
  slug: string;
  name: string;
  description?: string;
  // Add other subject properties if available in your subjects util
};

type Video = {
  id: string; // Or number, adjust as per your video data structure
  subject: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string; // Or Date
  url?: string;
  telegramDownload?: string;
  DownloadLink?: string;
  telegramDownload2?: string;
  KuppiMaterial?: string;
  // Add other video properties
};

type HomePageProps = {
  videos: Video[];
  subjects: Subject[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    // Fetch video data
    const videoRes = await fetch('https://cse23.org/kuppihub-data/sem2.json');
    
    if (!videoRes.ok) {
      throw new Error(`Failed to fetch videos: ${videoRes.status}`);
    }
    
    const videos: Video[] = await videoRes.json();

    // The 'subjects' data is imported locally from utils
    return {
      props: {
        videos,
        subjects: allSubjectsFromUtil,
      },
      revalidate: 3600, // ISR - revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Return empty data on error
    return {
      props: {
        videos: [],
        subjects: allSubjectsFromUtil,
      },
      revalidate: 60, // Retry more frequently on error
    };
  }
};

export default function HomePage({ videos, subjects }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Educational Resources Hub
            </span>
          </h1>
          <p className="text-lg font-medium text-gray-700 mb-6 tracking-wide">
            <span className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
              Proudly presented by CSE 23 Batch
            </span>
          </p>
          <a 
            href="https://cse23.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Visit CSE23.org
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => {
            const subjectVideos = videos.filter(v => v.subject === subject.slug);

            return (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/subjects/${subject.slug}`}
                  className="block transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden group">
                    <div className="relative h-48 w-full">
                      <Image
                        src={`/subjects/${subject.slug}.jpg`}
                        alt={subject.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:opacity-75 transition-opacity duration-300"
                        priority={index < 3} // Load first 3 images with priority
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-semibold">{subjectVideos.length} videos available</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {subject.name}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {subject.description || `Explore ${subject.name} videos and materials`}
                      </p>
                    </div>

                    <div className="px-6 pb-4 flex justify-between items-center text-sm text-gray-500">
                      <div className="flex space-x-4 items-center">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {subjectVideos.length} videos available
                        </div>
                      </div>
                      <span className="text-blue-600 font-medium">View All →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}