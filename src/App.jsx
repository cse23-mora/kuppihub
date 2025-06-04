import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Subject from './pages/Subject';
import Subjects from './pages/Subjects';
import Search from './pages/Search';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop'; 
import ScrollToTopButton from './components/ScrollToTopButton';
import TutorsPage from './pages/TutorsPage';
import WatchVideo from './pages/WatchVideo';
import NotFound from "./pages/NotFound";
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000); // 1s fake load
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectName" element={<Subject />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Tutors" element={<TutorsPage />} />
             <Route path="/watch/:videoId" element={<WatchVideo />} />
              <Route path="*" element={<NotFound />} /> {/* 404 route */}
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}
