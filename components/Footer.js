import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#6C3AED] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white font-bold text-base">
                S
              </div>
              <span className="text-xl font-extrabold text-white">SpeaklyAI</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI voice agents that answer your business phone 24/7. Built for small businesses across Canada and the US.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="block text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="block text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#use-cases" className="block text-sm text-slate-400 hover:text-white transition-colors">Use Cases</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">About</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Blog</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Careers</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">TCPA Compliance</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-slate-500">&copy; 2026 SpeaklyAI. All rights reserved.</span>
          <span className="text-sm text-slate-500">hello@speaklyai.ca</span>
        </div>
      </div>
    </footer>
  );
}
