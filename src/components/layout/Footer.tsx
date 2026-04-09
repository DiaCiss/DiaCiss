import Link from 'next/link'
import { Sparkles, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black">
                <span className="text-white">Dia</span>
                <span className="gradient-text">Ciss</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              La première marketplace de designs créatifs personnalisés en Afrique. Livraison rapide par des designers professionnels.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500/20 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Plateforme</h3>
            <ul className="space-y-2">
              {['Accueil', 'Catégories', 'Designers', 'Comment ça marche', 'Tarifs'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Top Catégories</h3>
            <ul className="space-y-2">
              {['Mariage', 'Réseaux Sociaux', 'Concert & Musique', 'Restauration', 'Graduation', 'Anniversaire'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                contact@diaciss.com
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                +221 77 000 00 00
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Paiements acceptés</p>
              <div className="flex flex-wrap gap-2">
                {['Orange Money', 'Wave', 'Free Money'].map((p) => (
                  <span key={p} className="px-2 py-1 glass rounded-md text-xs text-gray-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 DiaCiss. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {['Conditions', 'Confidentialité', 'Cookies'].map((item) => (
              <Link key={item} href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
