import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { subjects } from "../utils/subjects";

import Preloader from "../components/Preloader"; // Import Preloader component

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

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch video data from local JSON file
    fetch("https://cse23.org/kuppihub-data/sem2.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch video data");
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (query && videos.length > 0) {
      const results = videos.filter((video) => {
        const searchable = [
          video.title,
          video.description,
          video.author,
          video.subject,
          video.level,
          new Date(video.publishedAt || "").toLocaleDateString("en-US"),
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      });
      setFilteredVideos(results);
    } else {
      setFilteredVideos([]);
    }
  }, [query, videos]);

  const getSubjectName = (slug) => {
    const subject = subjects.find((s) => s.slug === slug);
    return subject ? subject.name : slug;
  };

  if (loading) {
    return <Preloader />; // Show preloader while loading
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          Search Results for: <span className="text-blue-600">"{query}"</span>
        </h1>

        {filteredVideos.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No videos found
            </h2>
            <p className="text-gray-500 mb-4">
              Try different keywords or browse all subjects.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                    {video.title}
                  </h2>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {video.description}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p>
                      👩‍🏫 <span className="font-medium">Author:</span>{" "}
                      {video.author}
                    </p>

                    <p>
                      📅 <span className="font-medium">Published:</span>{" "}
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
