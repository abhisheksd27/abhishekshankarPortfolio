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
  background: "#f8fafc",
  padding: "24px 16px"
};

const wrapper = {
  maxWidth: "1100px",
  margin: "0 auto"
};

const header = {
  marginBottom: "24px"
};

const title = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "8px"
};

const subtitle = {
  color: "#6b7280",
  lineHeight: 1.6
};

const sectionCard = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "18px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)"
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
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "4px"
};

const sectionSubtitle = {
  color: "#6b7280",
  fontSize: "0.92rem",
  lineHeight: 1.5
};

const countBadge = {
  background: "#e5e7eb",
  color: "#111827",
  borderRadius: "999px",
  padding: "4px 10px",
  fontSize: "0.85rem",
  fontWeight: 600
};

const inputRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "14px",
  flexWrap: "wrap"
};

const inputStyle = {
  flex: 1,
  minWidth: "240px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontSize: "0.95rem",
  outline: "none"
};

const buttonStyle = {
  padding: "12px 16px",
  border: "none",
  borderRadius: "10px",
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
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
  padding: "10px 14px",
  borderRadius: "999px",
  background: "#f3f4f6",
  color: "#111827",
  fontSize: "0.95rem"
};

const tagRemoveStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "16px",
  color: "#6b7280",
  lineHeight: 1
};

const emptyText = {
  color: "#6b7280",
  fontSize: "0.95rem"
};

const saveRow = {
  marginTop: "24px"
};

const saveButton = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};

export default Skills;