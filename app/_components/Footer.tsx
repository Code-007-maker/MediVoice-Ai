export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo / Name */}
        <div>
          <h2 className="text-xl font-bold text-white">Arbaj Khan</h2>
          <p className="mt-2 text-sm">
            Building AI-powered healthcare solutions for a healthier tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-500">Home</a></li>
            <li><a href="#features" className="hover:text-green-500">Features</a></li>
            <li><a href="https://portfolio-arbaj.onrender.com/" className="hover:text-green-500">About</a></li>
            <li><a 
              href="https://wa.me/918404060786" 
              target="_blank" 
              className="hover:text-green-500"
            >
            Contact
            </a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Me</h3>
          <div className="flex justify-center md:justify-start gap-5">
            <a href="https://x.com/KhanArbaj5269" target="_blank" className="hover:text-white">🐦</a>
            <a href="https://github.com/Arbaj-coder" target="_blank" className="hover:text-white">💻</a>
            <a href="https://www.linkedin.com/in/arbaj-khan-8a9123260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="hover:text-white">🔗</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Arbaj Khan. All Rights Reserved.
      </div>
    </footer>
  )
}
