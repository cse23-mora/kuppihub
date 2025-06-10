import Link from 'next/link';
import Image from 'next/image';
import { subjects as allSubjectsFromUtil } from '@/utils/subjects';
// Preloader likely not needed as data is from getStaticProps
// import Preloader from '@/components/Preloader';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

// Define types for props
type Subject = {
  slug: string;
  name: string;
  description?: string; // Assuming subjects might have this
  // Add other subject properties if available in your subjects util
};

type SubjectsPageProps = {
  subjects: Subject[];
  // If video counts were to be passed, they'd be here:
  // videoCounts: { [slug: string]: number };
};

export const getStaticProps: GetStaticProps<SubjectsPageProps> = async () => {
  // If video counts are needed:
  // const videoRes = await fetch('https://cse23.org/kuppihub-data/sem2.json');
  // const allVideos = await videoRes.json();
  // const videoCounts = allSubjectsFromUtil.reduce((acc, subject) => {
  //   acc[subject.slug] = allVideos.filter(v => v.subject === subject.slug).length;
  //   return acc;
  // }, {});

  return {
    props: {
      subjects: allSubjectsFromUtil,
      // videoCounts, // if doing counts
    },
  };
};

export default function SubjectsPage({ subjects }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Removed client-side data fetching, loading states, and useEffect for scrollTo.
  // The 'subjects' prop comes from getStaticProps.

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
            // const videoCount = videoCounts ? videoCounts[subject.slug] : 0; // if using videoCounts

            return (
              <Link 
                href={`/subjects/${subject.slug}`}
                key={subject.slug}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/subjects/${subject.slug}.jpg`} // Assumes images are in public/subjects/
                      alt={subject.name}
                      className="h-full w-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Video count display removed for now to simplify, can be added back if getStaticProps provides counts */}
                    {/* <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-semibold">{videoCount} videos available</p>
                    </div> */}
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
