import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DynamicForm = () => {
  const { id } = useParams(); // assuming URL = /form/:id
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
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

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      console.log({ formId: id, responses: formData });
      await axios.post(`http://localhost:5000/api/form-responses`, {
        formId: id,
        responses: formData,
      });
      alert("Form submitted successfully!");
      setFormData({});
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submit failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Fill the Form</h2>
        {schema.map((field, index) => (
          <div key={index} className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                className={`w-full border p-3 rounded ${
                  errors[field.label] ? "border-red-500" : "border-gray-300"
                }`}
                value={formData[field.label] || ""}
                onChange={(e) => handleChange(field.label, e.target.value)}
              />
            ) : (
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
            onClick={handleSubmit}
            className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "🚀 Submit"}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
