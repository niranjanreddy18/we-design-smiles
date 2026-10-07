function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: "Treatments",
      links: [
        { label: "Smile Makeovers", href: "#services" },
        { label: "Dental Implants", href: "#services" },
        { label: "Invisalign", href: "#services" },
        { label: "Teeth Whitening", href: "#services" },
        { label: "Dental Veneers", href: "#services" },
        { label: "Preventive Care", href: "#services" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Specialists", href: "#about" },
        { label: "Technology", href: "#about" },
        { label: "Location", href: "#location" },
        { label: "Contact", href: "#appointment" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "HIPAA Compliance", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="py-14 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight text-white block leading-none">WE DESIGN SMILES</span>
                <span className="text-[10px] tracking-wider uppercase text-cyan-400 font-medium">Aesthetic Dental Studio</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
              Premium aesthetic dentistry combining cutting-edge technology with compassionate, patient-centred care.
            </p>

            {/* Clinic Hours Pill */}
            <div className="mt-5 inline-flex items-center gap-2 bg-slate-900 border border-white/10 rounded-full px-3.5 py-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-300">Mon–Sat: 8 AM – 7 PM</span>
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} We Design Smiles Dental Studio. All rights reserved.</p>
          <p className="text-slate-600">
            Built with React + Vite · Django REST API Backend
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
