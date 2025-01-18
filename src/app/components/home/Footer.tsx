import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-midnight-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">JourneyWise</h3>
            <p className="text-gray-300">Explore the world with ease</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-accent">Travel Guides</Link></li>
              <li><Link href="/community" className="hover:text-accent">Community</Link></li>
              <li><Link href="/support" className="hover:text-accent">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent"><Facebook /></a>
              <a href="#" className="hover:text-accent"><Twitter /></a>
              <a href="#" className="hover:text-accent"><Instagram /></a>
              <a href="#" className="hover:text-accent"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2023 JourneyWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

