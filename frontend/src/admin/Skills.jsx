import { useEffect, useState } from "react";
import api from "../utils/api";

const defaultSkills = {
  dataEngineering: [],
  cyberSecurity: [],
  programmingLanguages: [],
  fullStack: [],
  databases: [],
  applications: [],
  machineLearning: [],
  dsa: []
};

const defaultInputs = {
  dataEngineering: "",
  cyberSecurity: "",
  programmingLanguages: "",
  fullStack: "",
  databases: "",
  applications: "",
  machineLearning: "",
  dsa: ""
};

function Skills() {
  const [skills, setSkills] = useState(defaultSkills);
  const [inputs, setInputs] = useState(defaultInputs);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/portfolio");
        const incoming = res.data?.skills;

        setSkills({
          ...defaultSkills,
          ...(incoming && typeof incoming === "object" && !Array.isArray(incoming)
            ? incoming
            : {})
        });
      } catch (err) {
        console.error("Failed to load skills:", err);
        setSkills(defaultSkills);
      }
    };

    load();
  }, []);

  const addSkill = (category) => {
    const value = inputs[category]?.trim();
    if (!value) return;

    const currentItems = Array.isArray(skills[category]) ? skills[category] : [];

    if (currentItems.includes(value)) return;

    setSkills((prev) => ({
      ...prev,
      [category]: [...currentItems, value]
    }));

    setInputs((prev) => ({
      ...prev,
      [category]: ""
    }));
  };

  const removeSkill = (category, index) => {
    const currentItems = Array.isArray(skills[category]) ? skills[category] : [];

    setSkills((prev) => ({
      ...prev,
      [category]: currentItems.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e, category) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(category);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        ...defaultSkills,
        ...skills
      };

      await api.post("/api/portfolio", { skills: payload });
      setMsg("Skills matrix saved successfully.");
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error("Failed to save skills:", err);
      alert("Failed to update skills. Please verify your admin session.");
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = (label, key, subtitleText) => {
    const items = Array.isArray(skills[key]) ? skills[key] : [];

    return (
      <div style={sectionCard} key={key}>
        <div style={sectionHeader}>
          <div>
            <h3 style={sectionTitle}>{label}</h3>
            {subtitleText && <p style={sectionSubtitle}>{subtitleText}</p>}
          </div>
          <span style={countBadge}>{items.length} items</span>
        </div>

        <div style={inputRow}>
          <input
            style={inputStyle}
            value={inputs[key] || ""}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                [key]: e.target.value
              }))
            }
            onKeyDown={(e) => handleKeyDown(e, key)}
            placeholder={`Add ${label} (press Enter)`}
          />
          <button style={buttonStyle} onClick={() => addSkill(key)}>
            Add
          </button>
        </div>

        <div style={tagWrap}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} style={tagStyle}>
                <span>{item}</span>
                <button
                  style={tagRemoveStyle}
                  onClick={() => removeSkill(key, index)}
                  title="Remove skill"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p style={emptyText}>No skills added under this category yet.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <div style={headerTop}>
            <div>
              <h1 style={title}>Technical Competencies</h1>
              <p style={subtitle}>
                Manage categorized technical capabilities rendered in the public portfolio matrix.
              </p>
            </div>
            <button style={saveButton} onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Matrix"}
            </button>
          </div>
        </div>

        {msg && <div style={successAlert}>{msg}</div>}

        {renderCategory(
          "Data Engineering & Cloud",
          "dataEngineering",
          "Distributed systems, ETL, orchestration, cloud pipelines"
        )}

        {renderCategory(
          "Cybersecurity & Defense",
          "cyberSecurity",
          "SIEM, incident response, network auditing, linux hardening"
        )}

        {renderCategory(
          "Programming Languages",
          "programmingLanguages",
          "Core software engineering languages and scripting"
        )}

        {renderCategory(
          "Full Stack Architecture",
          "fullStack",
          "Frontend frameworks, backend services, API interfaces"
        )}

        {renderCategory(
          "Databases & Storage",
          "databases",
          "Relational, analytical data warehouses, and NoSQL engines"
        )}

        {renderCategory(
          "Developer Tools & Infrastructure",
          "applications",
          "Containers, CI/CD, version control, and productivity tools"
        )}

        {renderCategory(
          "Machine Learning",
          "machineLearning",
          "Modeling, predictive algorithms, and statistical analysis"
        )}

        {renderCategory(
          "DSA & Problem Solving",
          "dsa",
          "Data structures, algorithms, and computational patterns"
        )}

        <div style={saveRow}>
          <button style={saveButton} onClick={handleSave} disabled={loading}>
            {loading ? "Saving Matrix..." : "Save Technical Matrix"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= STYLES =================
const page = {
  minHeight: "100vh",
  background: "#090a0f",
  color: "#f4f4f5",
  padding: "32px 20px 80px",
};

const wrapper = {
  maxWidth: "960px",
  margin: "0 auto",
};

const header = {
  marginBottom: "24px",
};

const headerTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "16px",
  flexWrap: "wrap",
};

const title = {
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "6px",
  letterSpacing: "-0.01em",
};

const subtitle = {
  color: "#a1a1aa",
  lineHeight: 1.5,
  fontSize: "0.88rem",
};

const successAlert = {
  background: "#13231a",
  border: "1px solid #1c3b29",
  color: "#4ade80",
  padding: "10px 16px",
  borderRadius: "6px",
  fontSize: "0.88rem",
  fontWeight: 500,
  marginBottom: "20px",
};

const sectionCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "14px",
};

const sectionTitle = {
  fontSize: "1.02rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "2px",
};

const sectionSubtitle = {
  color: "#71717a",
  fontSize: "0.8rem",
};

const countBadge = {
  background: "#20222b",
  color: "#a1a1aa",
  border: "1px solid #282a35",
  fontFamily: "var(--font-mono)",
  borderRadius: "4px",
  padding: "2px 8px",
  fontSize: "0.75rem",
  fontWeight: 500,
};

const inputRow = {
  display: "flex",
  gap: "8px",
  marginBottom: "14px",
  flexWrap: "wrap",
};

const inputStyle = {
  flex: 1,
  minWidth: "220px",
  padding: "9px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#f4f4f5",
  fontSize: "0.88rem",
  outline: "none",
};

const buttonStyle = {
  padding: "9px 16px",
  border: "1px solid #282a35",
  borderRadius: "6px",
  background: "#181920",
  color: "#f4f4f5",
  fontWeight: 500,
  fontSize: "0.85rem",
  cursor: "pointer",
};

const tagWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const tagStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "4px",
  background: "#181920",
  border: "1px solid #282a35",
  color: "#d4d4d8",
  fontSize: "0.8rem",
  fontFamily: "var(--font-mono)",
  fontWeight: 400,
};

const tagRemoveStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "14px",
  color: "#71717a",
  padding: 0,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
};

const emptyText = {
  color: "#71717a",
  fontSize: "0.82rem",
};

const saveRow = {
  marginTop: "24px",
};

const saveButton = {
  padding: "10px 22px",
  borderRadius: "6px",
  border: "none",
  background: "#ffffff",
  color: "#090a0f",
  fontWeight: 600,
  fontSize: "0.88rem",
  cursor: "pointer",
};

export default Skills;