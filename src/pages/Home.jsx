
import React, { useEffect, useState } from "react";
import Nabvar from "../components/Navbar";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const api_base_url = "https://backend-ide-np5g.onrender.com";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#111827",
      borderColor: "#374151",
      color: "white",
      borderRadius: "12px",
      padding: "4px",
      boxShadow: "none",
    }),
    menu: (provided) => ({ ...provided, backgroundColor: "#0f172a" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#1f2937" : "#0f172a",
      color: "white",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({ ...provided, color: "white" }),
    placeholder: (provided) => ({ ...provided, color: "#9ca3af" }),
    input: (provided) => ({ ...provided, color: "white" }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    let pythonRunTime = data.find(runtime => runtime.language === "python");
    let jsRunTime = data.find(runtime => runtime.language === "javascript");
    let cRunTime = data.find(runtime => runtime.language === "c");
    let cppRunTime = data.find(runtime => runtime.language === "c++");
    let javaRunTime = data.find(runtime => runtime.language === "java");
    let bashRunTime = data.find(runtime => runtime.language === "bash");

    const newOptions = [
      { value: "python", label: `python (${pythonRunTime?.version})`, language: pythonRunTime?.language, version: pythonRunTime?.version },
      { value: "javascript", label: `javascript (${jsRunTime?.version})`, language: jsRunTime?.language, version: jsRunTime?.version },
      { value: "c", label: `c (${cRunTime?.version})`, language: cRunTime?.language, version: cRunTime?.version },
      { value: "c++", label: `c++ (${cppRunTime?.version})`, language: cppRunTime?.language, version: cppRunTime?.version },
      { value: "java", label: `java (${javaRunTime?.version})`, language: javaRunTime?.language, version: javaRunTime?.version },
      { value: "bash", label: `bash (${bashRunTime?.version})`, language: bashRunTime?.language, version: bashRunTime?.version },
    ];
    setOptions(newOptions);
  };

  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("token") })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.projects);
        else toast.error(data.msg);
      })
  };

  useEffect(() => { getRunTimes(); getProjects(); }, []);

  const createProj = () => {
    if (!selectedLanguage || !selectedLanguage.version) {
      toast.error("Please select language again");
      return;
    }
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, projectLanguage: selectedLanguage.value, token: localStorage.getItem("token"), version: selectedLanguage.version })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) { setName(""); navigate("/editor/" + data.projectId) }
        else toast.error(data.msg);
      });
  };

  const deleteProject = (id) => {
    let conf = confirm("Are you sure want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: id, token: localStorage.getItem("token") })
      })
        .then(res => res.json())
        .then(data => { if (data.success) getProjects(); else toast.error(data.msg); });
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/updateProj", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: editProjId, token: localStorage.getItem("token"), name: name })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) { setIsEditModelShow(false); navigate("/editor/" + editProjId); setName(""); setEditProjId(""); getProjects(); }
        else toast.error(data.msg);
      })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      <Nabvar />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-20 pt-8 gap-6">
        <h3 className="text-2xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] animate-[pulse_4s_ease-in-out_infinite]">Ready to build something amazing today? 🚀</h3>
        <button onClick={() => setIsCreateModelShow(true)}
          className="px-6 py-3 w-full md:w-auto rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30">
          + Create Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div className="px-4 md:px-20 mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects && projects.length > 0 ? projects.map((project) => (
          <div key={project._id}
            className="group bg-[#020617]/60 backdrop-blur-xl border border-white/10 hover:border-indigo-400/40 p-6 rounded-2xl transition-all hover:scale-[1.03] shadow-lg">

            <div onClick={() => navigate("/editor/" + project._id)} className="cursor-pointer flex items-center gap-6">
              <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition">
                {project.projectLanguage === "python" ? (
                  <img className="w-14 h-14 object-contain" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-1024.png" alt="python" />
                ) : project.projectLanguage === "javascript" ? (
                  <img className="w-14 h-14 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="javascript" />
                ) : project.projectLanguage === "c++" ? (
                  <img className="w-14 h-14 object-contain" src="data:image/png;base64,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" alt="c++" />
                ) : project.projectLanguage === "c" ? (
                  <img className="w-14 h-14 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFHVBqLBfSY_CjGjCWSrzHJBPI-Q28BYsDOQ&s" alt="c" />
                ) : project.projectLanguage === "java" ? (
                  <img className="w-14 h-14 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8p5df_VNc1pR61LEJFDP8B6EZwa5iYduw1w&s" alt="java" />
                ) : project.projectLanguage === "bash" ? (
                  <img className="w-14 h-14 object-contain" src="https://logowik.com/content/uploads/images/bash-icon1720765783.logowik.com.webp" alt="bash" />
                ) : null}
              </div>

              <div>
                <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition">{project.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{new Date(project.date).toDateString()}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setIsEditModelShow(true); setEditProjId(project._id); setName(project.name); }}
                className="flex-1 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 transition">Edit</button>
              <button onClick={() => deleteProject(project._id)}
                className="flex-1 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition">Delete</button>
            </div>
          </div>
        )) : <p className="text-center col-span-full text-gray-400 text-lg">No Projects Found !</p>}
      </div>

      {/* CREATE MODAL */}
      {
        isCreateModelShow && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 md:p-8 w-[95%] md:w-[420px] shadow-2xl">
              <h3 className="text-2xl font-semibold mb-4">Create Project</h3>
              <input onChange={(e) => setName(e.target.value)} value={name}
                className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-indigo-500 outline-none"
                placeholder="Enter project name" />
              <Select placeholder="Select a language" options={options} styles={customStyles}
                onChange={(selectedOption) => setSelectedLanguage(selectedOption)} />
              {selectedLanguage && (
                <>
                  <p className="text-green-400 mt-4 text-sm">Selected: {selectedLanguage.language} ({selectedLanguage.version})</p>
                  <button onClick={createProj}
                    className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 transition">
                    Create Project
                  </button>
                </>
              )}
            </div>
          </div>
        )
      }

      {/* EDIT MODAL */}
      {
        isEditModelShow && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#020617] border border-white/10 rounded-2xl p-8 w-[420px] shadow-2xl">
              <h3 className="text-2xl font-semibold mb-4">Update Project</h3>
              <input onChange={(e) => setName(e.target.value)} value={name}
                className="w-full mb-4 px-4 py-3 rounded-xl bg-[#0f172a] border border-gray-700 focus:border-indigo-500 outline-none"
                placeholder="Enter project name" />
              <button onClick={updateProj}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-105 transition">
                Update Project
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Home;
