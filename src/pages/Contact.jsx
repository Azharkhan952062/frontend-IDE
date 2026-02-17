import { useState } from "react";

const Contact = () => {

  const [form, setForm] = useState({ name:"", email:"", message:"" });

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSend = ()=>{
    if(!form.name || !form.email || !form.message){
      alert("Fill all fields");
      return;
    }

    const subject = `KodeBase Message from ${form.name}`;
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.location.href = `mailto:azhar.dev.kodebase@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-[-150px] right-[-150px]" />

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 w-full max-w-xl z-10">

        <h1 className="text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Contact Me
        </h1>
        <p className="text-center text-gray-400 mb-8">Let's build something amazing 🚀</p>

        <div className="space-y-5">

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition"
          />

          <input
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message..."
            value={form.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none transition"
          />

          <button
            onClick={handleSend}
            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
          >
            Send Message ✉️
          </button>

        </div>
      </div>
    </div>
  );
};

export default Contact;
