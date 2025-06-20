import React, { useState } from "react";
import "./App.css";

const fieldTypes = ["Text", "Number", "TextArea", "Checkbox"];

function App() {
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [fieldInput, setFieldInput] = useState({
    label: "",
    type: "text",
  });

  const addField = () => {
    if (!fieldInput.label.trim()) return;
    setFields([...fields, { ...fieldInput, id: Date.now() }]);
    setFieldInput({ label: "", type: "text" });
  };

  const handleChange = (id, value) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Data:\n" + JSON.stringify(formValues, null, 2));
  };

  return (
    <div className="container">
      <h2>Dynamic Form Builder</h2>

      <div className="add-field">
        <h3>Add a new field</h3>
        <input
          type="text"
          placeholder="Field Label"
          value={fieldInput.label}
          onChange={(e) => setFieldInput({ ...fieldInput, label: e.target.value })}
        />
        <select
          value={fieldInput.type}
          onChange={(e) => setFieldInput({ ...fieldInput, type: e.target.value })}
        >
          {fieldTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={addField}>Add Field</button>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Generated Form</h3>
        {fields.map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            ) : field.type === "checkbox" ? (
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                />
                <span>{field.label}</span>
              </div>
            ) : (
              <input
                type={field.type}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
          </div>
        ))}
        {fields.length > 0 && <button type="submit">Submit</button>}
      </form>
    </div>
  );
}

export default App;
