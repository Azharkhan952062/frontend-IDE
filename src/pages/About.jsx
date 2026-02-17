const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <h1 className="text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        About KodeBase
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Mission</h2>
          <p className="text-gray-300">
            KodeBase allows developers to write and execute code instantly
            without installing compilers. Practice coding anywhere, anytime.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Tech Stack</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-300">

            <div className="bg-black/40 p-4 rounded-xl border border-white/10">⚛ React.js</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">🟢 Node.js</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">🚀 Express.js</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">🍃 MongoDB</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">🔌 Socket.io (Realtime code sync)</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">⚙ JDoodle API (Code Execution & Compilation)</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">🔐 JWT Authentication</div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">🎨 Tailwind CSS</div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
