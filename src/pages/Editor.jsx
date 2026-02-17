import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Editor1 from "@monaco-editor/react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const api_base_url = "https://backend-ide-np5g.onrender.com";

const Editor = () => {
    const [code, setCode] = useState("");
    const [data, setData] = useState(null);
    const [output, setOutput] = useState("");
    const [isError, setIsError] = useState(false);
    const [running, setRunning] = useState(false);   
    let { id } = useParams();

    useEffect(() => {

        if (!id) return;

        fetch(api_base_url + "/getProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                projectId: id
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setCode(res.project.code || "");
                    setData(res.project);
                }
                else toast.error(res.msg);
            })
            .catch(() => toast.error("Server Error"));

    }, [id]);

    const saveProject = () => {

        if (!id) return;

        fetch(api_base_url + "/saveProject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                projectId: id,
                code: code
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) toast.success("Project Saved Successfully");
                else toast.error(res.msg);
            })
            .catch(() => toast.error("Server Error"));
    };

    useEffect(() => {

        const handleSave = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                saveProject();
            }
        };

        window.addEventListener("keydown", handleSave);
        return () => window.removeEventListener("keydown", handleSave);

    }, [code, id]);

    const runProject = async () => {

        if (!data) {
            toast.error("Project not loaded yet");
            return;
        }

        if (running) return;     
        setRunning(true);
        setOutput("Running...");

        let language = (data.projectLanguage || "").toLowerCase();

        const languageMap = {
            "c++": "c++",
            "c": "c",
            "python": "python",
            "java": "java",
            "javascript": "javascript",
            "bash": "bash"
        };

        try {

            const res = await fetch(api_base_url + "/api/code/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: languageMap[language],
                    code: code,
                    input: ""
                })
            });

            const result = await res.json();

            if (!result.success) {
                setIsError(true);
                setOutput(result.output || "Execution failed");
            } else {
                setIsError(false);
                setOutput(result.output || "No Output");
            }

        } catch (err) {
            toast.error("Execution Server Error");
        }

        setRunning(false);   
    };


    return (
        <>
            <Navbar />

            <div className="flex items-center justify-between" style={{ height: "calc(100vh - 90px)" }}>

                <div className="left w-[50%] h-full">
                    <Editor1
                        onChange={(value) => setCode(value || "")}
                        theme="vs-dark"
                        height="100%"
                        width="100%"
                        language={data?.projectLanguage?.toLowerCase() || "plaintext"}
                        value={code}
                    />
                </div>

                <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">

                    <div className="pb-3 border-b-[1px] border-b-[#1e1e1f] flex items-center justify-between px-[30px]">
                        <p className="text-white font-semibold">Output</p>

                        <button
                            disabled={running}
                            className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600 disabled:opacity-50"
                            onClick={runProject}
                        >
                            {running ? "Running..." : "Run"}
                        </button>
                    </div>

                    <pre className={`w-full h-[75vh] mt-3 overflow-auto ${isError ? "text-red-400" : "text-green-400"}`}>
                        {output}
                    </pre>

                </div>

            </div>
        </>
    );
};

export default Editor;
