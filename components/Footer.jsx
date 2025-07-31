import React from "react";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-[10rem] bg-black text-white py-10 px-6 sm:px-10 lg:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h1 className="text-3xl font-bold mb-3">Akaltrip</h1>
          <p className="text-sm text-gray-300">
            Découvrez les splendeurs de Marrakech en planifiant et en réservant
            votre voyage en ligne grâce à notre plateforme.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">À Propos</h2>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Contact@akaltrip.com</li>
            <li>+212 661-604747</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Liens utiles</h2>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              <Link href="/who-we-are" className="hover:text-gray-100 transition-colors">
                Qui sommes-nous ?
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-100 transition-colors">
                Contactez-nous
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Suivez-nous</h2>
          <div className="flex gap-3">
            <Link
              href="https://www.facebook.com/profile.php?id=100092315485742"
              aria-label="Facebook"
              target="_blank"
              className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full transition-colors"
            >
              <Facebook size={20} color="#fff" />
            </Link>
            <Link
              href="https://www.instagram.com/akaltrip"
              aria-label="Instagram"
              target="_blank"
              className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors"
            >
              <Instagram size={20} color="#fff" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        © 2024 WEVISITE MOROCCO BY LOVINYMEDIA ♥. Tous les droits réservés.
      </div>
    </footer>
  )
}
