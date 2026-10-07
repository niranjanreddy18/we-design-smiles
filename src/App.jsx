import VideoScrubber from "./components/VideoScrubber";
import Header from "./components/Header";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import LocationSection from "./components/LocationSection";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

/** Thin decorative divider used between the three video sections */
function VideoDivider({ label, description }) {
  return (
    <div className="relative w-full bg-white py-4 sm:py-6 md:py-8 flex flex-col items-center justify-center border-t border-b border-slate-100 text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-1.5">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0891b2] bg-cyan-50 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-cyan-200/70 shadow-xs">
          {label}
        </span>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "appointment", label: "Book Appointment" },
];

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">

      {/* ─── Sticky Navigation Header ─── */}
      <Header sections={NAV_SECTIONS} />

      {/* ─── Main Page Content ─── */}
      <main>

        {/* ─── Video Section 1: Reception → Hallway → Treatment Chair ─── */}
        <section id="home" aria-label="Clinic Walkthrough Video">
          <VideoScrubber
            videoFramePath="/videos/video_1_frames"
            totalFrames={240}
            overlayTitle="We Design Smiles - Professional Dental Care"
            overlayDescription="Your journey to perfect smiles starts here."
          />
        </section>

        {/* Divider 1 → 2 */}
        <VideoDivider
          label="Smile Transformations"
          description="Explore our results gallery and aesthetic smile makeovers"
        />

        {/* ─── Video Section 2: Treatment Chair → Results Gallery ─── */}
        <section id="videos" aria-label="Smile Transformations Video">
          <VideoScrubber
            videoFramePath="/videos/video_2_frames"
            totalFrames={240}
            overlayTitle="See Our Smile Transformations - Before & After Results"
            overlayDescription="Join hundreds of satisfied patients who achieved their dream smiles."
          />
        </section>

        {/* Divider 2 → 3 */}
        <VideoDivider
          label="Clinic Experience"
          description="A space designed around your comfort and peace of mind"
        />

        {/* ─── Video Section 3: Empty Area → Active Clinic Continuity ─── */}
        <section id="gallery" aria-label="Clinic Design Video">
          <VideoScrubber
            videoFramePath="/videos/video_3_frames"
            totalFrames={240}
            overlayTitle="Professional Clinic Design - Built for Your Comfort"
            overlayDescription="Every space designed for your peace of mind."
          />
        </section>

        {/* ─── Services & Treatments ─── */}
        <ServicesSection />



        {/* ─── About Us ─── */}
        <AboutSection />

        {/* ─── Location & Maps ─── */}
        <LocationSection />

        {/* ─── Appointment Booking Form ─── */}
        <section id="appointment" className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
          <BookingForm />
        </section>

      </main>

      {/* ─── Footer ─── */}
      <Footer />

    </div>
  );
}

export default App;