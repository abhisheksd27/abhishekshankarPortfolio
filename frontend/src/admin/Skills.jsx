import { useEffect, useState } from "react";
import api from "../utils/api";

const defaultSkills = {
  programmingLanguages: [],
  fullStack: [],
  databases: [],
  dataEngineering: [],
  cyberSecurity: [],
  machineLearning: [],
  dsa: [],
  applications: []
};

const defaultInputs = {
  programmingLanguages: "",
  fullStack: "",
  databases: "",
  dataEngineering: "",
  cyberSecurity: "",
  machineLearning: "",
  dsa: "",
  applications: ""
};

function Skills() {
  const [skills, setSkills] = useState(defaultSkills);
  const [inputs, setInputs] = useState(defaultInputs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("api/portfolio");
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

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        ...defaultSkills,
        ...skills
      };

      await api.put("api/portfolio/skills", { skills: payload });
      alert("Skills updated successfully");
    } catch (err) {
      console.error("Failed to save skills:", err);
      alert("Failed to update skills");
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = (label, key) => {
    const items = Array.isArray(skills[key]) ? skills[key] : [];

    return (
      <div style={sectionCard} key={key}>
        <div style={sectionHeader}>
          <div>
            <h3 style={sectionTitle}>{label}</h3>
            <p style={sectionSubtitle}>
              Add and organize items under {label.toLowerCase()}.
            </p>
          </div>
          <span style={countBadge}>{items.length}</span>
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
            placeholder={`Add ${label}`}
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
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p style={emptyText}>No items added yet</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h1 style={title}>Skills Management</h1>
          <p style={subtitle}>
            Organize your skills by category so they display clearly in your portfolio.
          </p>
        </div>

        {renderCategory("Programming Languages", "programmingLanguages")}
        {renderCategory("Full Stack", "fullStack")}
        {renderCategory("Databases", "databases")}
        {renderCategory("Data Engineering", "dataEngineering")}
        {renderCategory("Cyber Security", "cyberSecurity")}
        {renderCategory("Machine Learning", "machineLearning")}
        {renderCategory("DSA", "dsa")}
        {renderCategory("Applications", "applications")}

        <div style={saveRow}>
          <button style={saveButton} onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Skills"}
          </button>
        </div>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#080c14",
  color: "#f8fafc",
  padding: "32px 20px 80px"
};

const wrapper = {
  maxWidth: "1100px",
  margin: "0 auto"
};

const header = {
  marginBottom: "28px"
};

const title = {
  fontSize: "2rem",
  fontWeight: 800,
  color: "#f8fafc",
  marginBottom: "8px",
  letterSpacing: "-0.02em"
};

const subtitle = {
  color: "#94a3b8",
  lineHeight: 1.6,
  fontSize: "0.95rem"
};

const sectionCard = {
  background: "rgba(17, 24, 39, 0.75)",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 10px 28px rgba(0, 0, 0, 0.25)"
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "16px"
};

const sectionTitle = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#f8fafc",
  marginBottom: "4px"
};

const sectionSubtitle = {
  color: "#94a3b8",
  fontSize: "0.88rem",
  lineHeight: 1.5
};

const countBadge = {
  background: "rgba(59, 130, 246, 0.15)",
  color: "#93c5fd",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  borderRadius: "999px",
  padding: "3px 10px",
  fontSize: "0.85rem",
  fontWeight: 700
};

const inputRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "16px",
  flexWrap: "wrap"
};

const inputStyle = {
  flex: 1,
  minWidth: "240px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc",
  fontSize: "0.95rem",
  outline: "none"
};

const buttonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)"
};

const tagWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px"
};

const tagStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "7px 14px",
  borderRadius: "999px",
  background: "rgba(59, 130, 246, 0.12)",
  border: "1px solid rgba(59, 130, 246, 0.25)",
  color: "#93c5fd",
  fontSize: "0.88rem",
  fontWeight: 500
};

const tagRemoveStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "16px",
  color: "#fca5a5",
  lineHeight: 1
};

const emptyText = {
  color: "#64748b",
  fontSize: "0.9rem"
};

const saveRow = {
  marginTop: "28px"
};

const saveButton = {
  padding: "13px 28px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.95rem",
  cursor: "pointer",
  boxShadow: "0 4px 16px rgba(37, 99, 235, 0.4)"
};

export default Skills;