import Link from 'next/link'

const footerLinks = {
  Services: ['Logo & Branding', 'Marketing Digital', 'Illustration', 'Packaging Design'],
  Communauté: ['Devenir Designer', 'Blog Créatif', 'Concours', 'Événements'],
  Contact: ['@easilydesign.africa', 'Dakar, Sénégal'],
}

export default function Footer() {
  return (
    <footer className="bg-sand-900 text-sand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-black">
                <span className="text-primary-400">Easily</span>
                <span className="text-white">Design</span>
              </span>
            </Link>
            <p className="text-sm text-sand-400 leading-relaxed">
              La première plateforme dédiée à l&apos;excellence créative africaine. Connectant talents et opportunités globales.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-bold text-sand-200 uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-sand-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-sand-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sand-500">
            © 2024 EasilyDesign. Fait avec passion en Afrique.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Support', 'Twitter', 'Dribbble'].map((item) => (
              <Link key={item} href="#" className="text-xs text-sand-500 hover:text-sand-300 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
