const DOCTORS = [
  {
    name: "Dr. Alexander Wright, DDS",
    title: "Lead Cosmetic Dentist & Smile Architect",
    credentials: "BDS, MS (Cosmetic Dentistry) • 16+ Years Experience",
    bio: "Specialising in bespoke porcelain veneers, digital smile simulation, and minimally invasive aesthetic rehabilitations.",
    imageSrc: "/doctors/doctor_1_male_glasses.webp",
    imageAlt: "Dr. Alexander Wright, Lead Cosmetic Dentist at We Design Smiles",
    specialties: ["Porcelain Veneers", "Digital Smile Design", "Laser Aesthetics"],
  },
  {
    name: "Dr. Elena Rostova, DMD",
    title: "Specialist Orthodontist & Invisalign Elite Provider",
    credentials: "BDS, MOrth (Orthodontics) • 12+ Years Experience",
    bio: "Pioneering clear aligner mechanics and digital facial harmony treatments for teens and adults with gentle, predictable results.",
    imageSrc: "/doctors/doctor_2_female.webp",
    imageAlt: "Dr. Elena Rostova, Specialist Orthodontist at We Design Smiles",
    specialties: ["Invisalign Elite", "Clear Aligners", "Facial Harmony"],
  },
  {
    name: "Dr. Marcus Vance, DDS",
    title: "Oral Implantologist & Surgical Director",
    credentials: "BDS, MDS (Oral Surgery & Implantology) • 14+ Years Experience",
    bio: "Expert in computer-guided 3D implant placement, immediate tooth replacement, and complex bone augmentation protocols.",
    imageSrc: "/doctors/doctor_3_male.webp",
    imageAlt: "Dr. Marcus Vance, Oral Implantologist at We Design Smiles",
    specialties: ["Guided Implants", "All-on-X Surgery", "Bone Grafting"],
  },
];

function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* ─── Hero Row: Story + Clinic Reception Image ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Story & Mission */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4] bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200/60 inline-block">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-5 leading-[1.1]">
              More Than a Dental Clinic —{" "}
              <span className="text-[#06b6d4]">A Smile Sanctuary</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
              Founded over two decades ago, We Design Smiles was built on a single conviction: that every patient deserves world-class aesthetic dentistry delivered in an environment of total calm, trust, and artistry.
            </p>
            <p className="text-base text-slate-600 mt-4 leading-relaxed">
              Our clinic merges surgical precision with genuine warmth. From the moment you walk through our doors, you&#39;ll experience care that treats you as an individual — not a procedure number.
            </p>

            {/* Mission Statement */}
            <blockquote className="mt-8 pl-5 border-l-4 border-[#06b6d4] bg-cyan-50/50 rounded-r-xl py-4 pr-4">
              <p className="text-slate-700 font-medium italic text-sm sm:text-base leading-relaxed">
                &#34;Our mission is to transform lives one smile at a time — combining cutting-edge technology with compassionate, patient-centred care.&#34;
              </p>
              <footer className="mt-2 text-xs text-slate-500 font-semibold tracking-wide uppercase">
                — Clinic Founding Mission Statement
              </footer>
            </blockquote>

            {/* Credential Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Years of Excellence", value: "25+" },
                { label: "Specialist Dentists", value: "12+" },
                { label: "Procedures Completed", value: "50k+" },
                { label: "Awards & Accreditations", value: "18" },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-2xl font-extrabold text-[#06b6d4]">{item.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wide">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Clinic Reception Photograph */}
          <div className="relative group">
            <div className="aspect-[16/10] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/80">
              <img
                src="/doctors/01_reception.png"
                alt="We Design Smiles modern dental clinic welcome reception and patient lounge"
                loading="lazy"
                width={576}
                height={346}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating accent badge */}
            <div className="absolute -bottom-5 -left-4 sm:-left-5 bg-slate-950 text-white rounded-2xl px-5 py-3.5 shadow-xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-pulse" />
                <p className="text-xl sm:text-2xl font-extrabold text-[#06b6d4] tracking-tight">A+</p>
                <span className="text-xs font-semibold text-slate-300">Accredited Clinic</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                Modern Reception &amp; Lounge
              </p>
            </div>
          </div>
        </div>

        {/* ─── Meet Our Doctors Section ─── */}
        <div className="mt-24 sm:mt-32">
          {/* Section Heading */}
          <div className="text-center mb-14 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06b6d4] bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200/60 inline-block">
              Meet Our Doctors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              World-Class Specialists, Dedicated to Your Smile
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Our internationally trained clinical team combines decades of specialized dentistry with artistry and compassionate care.
            </p>
          </div>

          {/* Doctor Cards Grid: 3 doctors side by side */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
            {DOCTORS.map((doctor, idx) => (
              <article
                key={idx}
                className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#06b6d4]/60 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Doctor Portrait Container */}
                <div className="aspect-[4/5] w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={doctor.imageSrc}
                    alt={doctor.imageAlt}
                    loading="lazy"
                    width={1312}
                    height={1199}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Doctor Details */}
                <div className="p-3 sm:p-5 lg:p-7 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-lg lg:text-xl tracking-tight group-hover:text-[#06b6d4] transition-colors leading-snug">
                    {doctor.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#06b6d4] font-bold mt-0.5 sm:mt-1 uppercase tracking-wider leading-tight">
                    {doctor.title}
                  </p>
                  <p className="text-[9px] sm:text-xs text-slate-500 font-medium mt-1 leading-tight">
                    {doctor.credentials}
                  </p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 mt-2 sm:mt-3 leading-relaxed flex-grow line-clamp-3 sm:line-clamp-none">
                    {doctor.bio}
                  </p>

                  {/* Specialty Pills */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3 sm:mt-5 pt-2 sm:pt-4 border-t border-slate-100">
                    {doctor.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] sm:text-[11px] font-medium text-slate-600 bg-slate-100 group-hover:bg-cyan-50 group-hover:text-[#06b6d4] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Booking CTA link */}
                  <a
                    href="#appointment"
                    className="inline-flex items-center justify-between w-full mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-xs font-bold text-slate-800 hover:text-[#06b6d4] transition-colors group/link"
                  >
                    <span>Book Consultation</span>
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#06b6d4] transform transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
