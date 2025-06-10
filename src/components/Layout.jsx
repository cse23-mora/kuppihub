import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop'; // Assuming this component handles its own logic
import ScrollToTopButton from './ScrollToTopButton';

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop /> {/* If this is a component that needs to be rendered */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}
