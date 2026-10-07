const SERVICES = [
  {
    id: "01",
    title: "Aesthetic Smile Makeovers",
    description:
      "Ultra-thin porcelain veneers, composite bonding, and laser gum contouring designed to harmonize naturally with your unique facial profile.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Guided Dental Implants",
    description:
      "Computer-navigated 3D surgical placement for permanent tooth replacement with zero guesswork, precise outcomes, and swift healing protocols.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Invisalign & Clear Aligners",
    description:
      "Discreet orthodontics planned with virtual 3D treatment simulations so you can preview your final smile before treatment begins.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Teeth Whitening",
    description:
      "Professional in-chair laser whitening delivering visibly brighter results in a single session, with custom take-home maintenance kits.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 6a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Dental Veneers",
    description:
      "Custom-crafted ultra-thin porcelain shells bonded to the front surface of your teeth for an instantly flawless, natural-looking smile.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: "06",
    title: "Preventive Dental Care",
    description:
      "Comprehensive hygiene therapy, digital diagnostic X-rays, and personalised oral health programs to maintain your lifelong dental wellness.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 pb-16 sm:pb-20 border-b border-slate-100">
          {[
            { value: "15,000+", label: "Smiles Designed", accent: false },
            { value: "99.4%", label: "Patient Satisfaction", accent: true },
            { value: "25+ Yrs", label: "Clinical Mastery", accent: false },
            { value: "0-Pain", label: "Laser Precision", accent: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${stat.accent ? "text-[#06b6d4]" : "text-slate-900"}`}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1.5 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mt-16 sm:mt-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4] bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200/60 inline-block">
            World-Class Treatments
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Precision Dentistry Meets Artistic Smile Design
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Combining digital 3D intraoral diagnostics, gentle laser micro-dentistry, and bespoke porcelain craftsmanship to create your signature smile.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-16">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#06b6d4] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#06b6d4] flex items-center justify-center group-hover:bg-[#06b6d4] group-hover:text-slate-950 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-6 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                {service.description}
              </p>
              <a
                href="#appointment"
                className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold text-[#06b6d4] hover:text-[#0891b2] transition-colors"
              >
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
