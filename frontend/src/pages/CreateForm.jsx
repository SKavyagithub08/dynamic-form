import { useState } from "react";
import axios from "axios";
import { PlusCircle, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateForm = () => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

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
    if (!formName.trim()) {
      toast.error("Please enter a form name.", {
        position: "top-right", // Display the error message at the top-right
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "8px",
        },
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/forms", {
        formName,
        fields,
      });

      const savedFormId = response.data._id; // Get the saved form's ID
      toast.success(`Form "${formName}" created successfully!`, {
        position: "top-right", // Display the success message at the top-right
        style: {
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
          borderRadius: "8px",
        },
      });
      setTimeout(() => {
        navigate(`/form/${savedFormId}`); // Redirect to the form's unique link
      }, 1000); // Add a slight delay for the toast to display
    } catch (err) {
      console.error(err);
      toast.error("Failed to save form.", {
        position: "top-right", // Display the error message at the top-right
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "8px",
        },
      });
    }
  };

  const handleViewSavedForms = () => {
    navigate("/forms"); // Navigate to the saved forms page
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create a Custom Form
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Form Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Enter a descriptive name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>

        {fields.map((field, index) => (
          <div
            key={index}
            className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Field #{index + 1}</h2>
              <button
                onClick={() => removeField(index)}
                className="text-red-500 hover:text-red-600 flex items-center text-sm"
              >
                <Trash2 size={18} className="mr-1" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Label</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter label"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Field Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="select">Select</option>
                  <option value="date">Date</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Validation (Regex)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="e.g. ^[a-z]+$"
                  value={field.validation}
                  onChange={(e) => updateField(index, "validation", e.target.value)}
                />
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(index, "required", e.target.checked)}
                  className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                />
                <label className="ml-2 text-sm text-gray-700">Required</label>
              </div>

              {(field.type === "select" || field.type === "radio") && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Options</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                    placeholder="Comma-separated values (e.g., Option1, Option2)"
                    value={field.options?.join(",") || ""}
                    onChange={(e) =>
                      updateField(index, "options", e.target.value.split(",").map((opt) => opt.trim()))
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={addField}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-lg transform hover:scale-105 transition-transform"
          >
            <PlusCircle size={18} />
            Add Field
          </button>

          <button
            onClick={saveFormSchema}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-lg transform hover:scale-105 transition-transform"
          >
            <Save size={18} />
            Save Form
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleViewSavedForms}
            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-lg transform hover:scale-105 transition-transform"
          >
            View Saved Forms
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
