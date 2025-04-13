import { useState } from "react";
import axios from "axios";

const CreateForm = () => {
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { label: "", type: "text", required: false, validation: "" }]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const saveFormSchema = async () => {
    try {
      await axios.post("http://localhost:5000/api/forms", { fields });
      alert("Form schema saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dynamic Form Builder</h1>
      {fields.map((field, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-white shadow">
          <input
            className="border p-2 mr-2"
            placeholder="Label"
            value={field.label}
            onChange={(e) => updateField(index, "label", e.target.value)}
          />
          <select
            className="border p-2 mr-2"
            value={field.type}
            onChange={(e) => updateField(index, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="textarea">Textarea</option>
          </select>
          <input
            className="border p-2 mr-2"
            placeholder="Regex Validation (optional)"
            value={field.validation}
            onChange={(e) => updateField(index, "validation", e.target.value)}
          />
          <label className="mr-2">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(index, "required", e.target.checked)}
            />
            Required
          </label>
          <button onClick={() => removeField(index)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
            ❌
          </button>
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <button onClick={addField} className="bg-blue-500 text-white px-4 py-2 rounded">
          ➕ Add Field
        </button>
        <button onClick={saveFormSchema} className="bg-green-600 text-white px-4 py-2 rounded">
          💾 Save Form Schema
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
