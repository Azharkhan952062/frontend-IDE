const services = [
  "Online Code Editor",
  "Instant Compilation",
  "Multi Language Support",
  "Cloud Project Storage",
  "Secure Authentication",
  "Fast Execution Engine"
];

const Services = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <h1 className="text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        Our Services
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {services.map((s, i) => (
          <div key={i}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:-translate-y-3 hover:border-blue-400 transition duration-300"
          >
            <div className="text-2xl font-bold mb-3 group-hover:text-blue-400">{s}</div>
            <p className="text-gray-400">
              Powerful and fast experience for developers.
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Services;
