import { motion } from "framer-motion";
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs';
import path from 'path';

// Define types
type Tutor = {
  name: string;
  image: string;
  subjects: string[];
  sessions: number;
  linkedin: string;
};

type TutorsPageProps = {
  tutors: Tutor[];
};

export const getStaticProps: GetStaticProps<TutorsPageProps> = async () => {
  const tutorsFilePath = path.join(process.cwd(), 'public/data/tdata.json');
  const tutorsJsonData = fs.readFileSync(tutorsFilePath, 'utf-8');
  const tutorsData: Tutor[] = JSON.parse(tutorsJsonData);

  const sortedTutors = [...tutorsData].sort((a, b) => b.sessions - a.sessions);

  return {
    props: {
      tutors: sortedTutors,
    },
  };
};

export default function TutorsPage({ tutors }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Data (tutors) is now passed as props.
  // Client-side fetching, loading states, and useEffect for scrollTo are removed.

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Our CSE 23 Mentors 
          </span>💙
        </h1>

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A heartfelt thank you to these kind souls who selflessly led <strong>kuppi sessions</strong> for the CSE 23 batch. Your knowledge and time meant everything!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                 
                  src={`/Tutors/${tutor.image}.jpg`}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-base font-semibold text-gray-800">{tutor.name}</h2>
                <p className="text-xs text-gray-600 mt-1 mb-1">
                  <strong>Subjects:</strong> {tutor.subjects.join(", ")}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {tutor.sessions} Kuppi Sessions
                </p>
                <a
                  href={tutor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
