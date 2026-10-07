function LocationSection() {
  return (
    <section id="location" className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4] bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200/60 inline-block">
            Find Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            Visit Our Clinic
          </h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Conveniently located in the heart of the city, our clinic is easily accessible by road and public transport.
          </p>
        </div>

        {/* Two-column Layout: Map and Details Side by Side */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-8 lg:gap-12 items-stretch">

          {/* Left: Map */}
          <div className="w-full h-full min-h-[260px] sm:min-h-[420px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 bg-slate-100 flex">
            {/*
              Replace the src below with your actual Google Maps embed URL.
              To get one: Google Maps → Share → Embed a map → Copy iframe src.
              Example: https://www.google.com/maps/embed?pb=!1m18!...
            */}
            <iframe
              title="We Design Smiles Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing clinic location"
            />
          </div>

          {/* Right: Contact Details */}
          <div className="flex flex-col gap-2.5 sm:gap-4 lg:gap-6 justify-between">

            {/* Address */}
            <div className="flex items-start gap-2.5 sm:gap-4 p-2.5 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-50 text-[#06b6d4] border border-cyan-200/50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 sm:mb-1">Clinic Address</h3>
                {/* ⚠ Placeholder — replace with actual clinic address */}
                <p className="text-slate-600 text-[11px] sm:text-sm leading-snug sm:leading-relaxed">
                  Clinic Address — To be added<br />
                  City, State — PIN Code
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-2.5 sm:gap-4 p-2.5 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-50 text-[#06b6d4] border border-cyan-200/50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 sm:mb-1">Phone</h3>
                {/* ⚠ Placeholder — replace with actual phone numbers */}
                <p className="text-slate-600 text-[11px] sm:text-sm">+91 XXXXX XXXXX</p>
                <p className="text-slate-500 text-[9px] sm:text-xs mt-0.5 hidden sm:block">24/7 Emergency Line: +91 XXXXX XXXXX</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2.5 sm:gap-4 p-2.5 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-50 text-[#06b6d4] border border-cyan-200/50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5 sm:mb-1">Email</h3>
                {/* ⚠ Placeholder — replace with actual email */}
                <a href="mailto:contact@wedesignsmiles.com" className="text-[#06b6d4] text-[11px] sm:text-sm hover:text-[#0891b2] font-semibold transition-colors truncate block">
                  contact@wedesignsmiles.com
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-2.5 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-50 text-[#06b6d4] border border-cyan-200/50 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Opening Hours</h3>
              </div>
              <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-sm pl-1">
                {[
                  { days: "Mon – Fri", hours: "8:00 AM – 7:00 PM" },
                  { days: "Saturday", hours: "9:00 AM – 5:00 PM" },
                  { days: "Sunday", hours: "Emergency Only" },
                ].map((row) => (
                  <div key={row.days} className="flex justify-between text-slate-600 gap-1">
                    <span className="font-medium">{row.days}</span>
                    <span className="text-right">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Get Directions CTA */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 w-full py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-[#06b6d4]/30 active:scale-[0.99] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
