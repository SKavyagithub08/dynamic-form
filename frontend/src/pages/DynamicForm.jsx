import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DynamicForm = () => {
  const { id } = useParams(); // Get form ID from URL
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/forms/${id}`);
        setSchema(res.data.fields);
      } catch (err) {
        console.error("Schema fetch failed:", err);
      }
    };
    fetchSchema();
  }, [id]);

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  const validate = () => {
    let newErrors = {};
    schema.forEach((field) => {
      const val = formData[field.label] || "";
      if (field.required && val.trim() === "") {
        newErrors[field.label] = "This field is required";
      }
      if (field.validation) {
        try {
          const regex = new RegExp(field.validation);
          if (!regex.test(val)) {
            newErrors[field.label] = "Invalid format";
          }
        } catch {
          newErrors[field.label] = "Invalid regex";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/form-responses`, {
        formId: id,
        responses: formData,
      });

      // Navigate to the Thank You page
      navigate("/thank-you");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to submit form.", {
        position: "top-right",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "8px",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Fill the Form</h2>
        <form onSubmit={handleSubmit}>
          {schema.map((field, index) => (
            <div key={index} className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">{field.label}</label>
              {field.type === "textarea" && (
                <textarea
                  className={`w-full border p-3 rounded ${
                    errors[field.label] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "checkbox" && (
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
                  checked={formData[field.label] || false}
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
              )}
              {field.type === "radio" &&
                field.options?.map((option, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={field.label}
                      value={option}
                      checked={formData[field.label] === option}
                      onChange={(e) => handleChange(field.label, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              {field.type === "select" && (
                <select
                  className={`w-full border p-3 rounded ${
                    errors[field.label] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "date" && (
                <input
                  type="date"
                  className={`w-full border p-3 rounded ${
                    errors[field.label] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type !== "textarea" &&
                field.type !== "checkbox" &&
                field.type !== "radio" &&
                field.type !== "select" &&
                field.type !== "date" && (
                  <input
                    type={field.type}
                    className={`w-full border p-3 rounded ${
                      errors[field.label] ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData[field.label] || ""}
                    onChange={(e) => handleChange(field.label, e.target.value)}
                  />
                )}
              {errors[field.label] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.label]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md transform hover:scale-105 transition-transform ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
