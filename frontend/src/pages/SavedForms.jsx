import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SavedForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        console.log(response.data); // Debugging: Check the fetched forms
        setForms(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load forms.");
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Saved Forms
        </h1>

        {forms.length === 0 ? (
          <p className="text-center text-gray-500">No forms created yet.</p>
        ) : (
          <ul className="space-y-4">
            {forms.map((form) => (
              <li
                key={form._id}
                className="border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-100 transition"
              >
                <Link to={`/form/${form._id}`} className="block text-lg font-medium text-gray-700">
                  📝 {form.formName || "Untitled Form"}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedForms;
