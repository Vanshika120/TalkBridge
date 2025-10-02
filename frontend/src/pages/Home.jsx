const Home = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-20">
    <div className="text-center px-6 max-w-3xl">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 
                     bg-clip-text text-transparent drop-shadow-md">
        🌐 Real-Time Language Translator
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
        Type or speak and instantly translate into your chosen language.
        <br />
        Experience seamless, real-time communication across the globe.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/translate"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white
                     shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 font-medium"
        >
          🚀 Start Translating
        </a>
        <a
          href="/history"
          className="px-6 py-3 rounded-full bg-white/80 text-purple-700 border border-purple-200
                     shadow hover:bg-white hover:scale-105 transition-transform duration-300 font-medium"
        >
          📜 View History
        </a>
      </div>
    </div>
  </div>
);

export default Home;
