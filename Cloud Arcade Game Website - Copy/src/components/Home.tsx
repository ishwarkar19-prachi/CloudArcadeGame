import { Link } from "react-router";
import { Play, Zap, Cloud, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 z-10"></div>
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1751759195549-453a9103e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhcmNhZGUlMjBuZW9ufGVufDF8fHx8MTc2OTE3OTQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Gaming arcade"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl text-white mb-6 font-bold">
              Play Classic Arcade Games
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Anywhere, Anytime
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the nostalgia of classic arcade games powered by cloud technology. 
              No downloads, no installations - just pure gaming fun in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/games"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50"
              >
                <Play className="w-6 h-6" />
                Start Playing Now
              </Link>
              <a 
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-16">
            Why Choose CloudArcade?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Cloud-Powered</h3>
              <p className="text-gray-400">
                All games run on powerful cloud servers. No need for high-end hardware.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Instant Access</h3>
              <p className="text-gray-400">
                Start playing immediately. No downloads, no waiting, no hassle.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Multiple Games</h3>
              <p className="text-gray-400">
                Access a growing library of classic arcade games all in one place.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">Cross-Platform</h3>
              <p className="text-gray-400">
                Play on any device - desktop, tablet, or mobile. Your progress syncs everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl text-white mb-4">
            Ready to Start Gaming?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of players enjoying classic arcade games in the cloud.
          </p>
          <Link 
            to="/games"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50"
          >
            <Play className="w-6 h-6" />
            Browse Games
          </Link>
        </div>
      </section>
    </div>
  );
}
