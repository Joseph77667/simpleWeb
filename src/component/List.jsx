import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Student from "./Student";

const List = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:8080/student/all");
        if (!res.ok) {
          throw new Error(`Http status : ${res.status}`);
        }
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    <h1>Loading.....</h1>;
  }

  const handleDelete = async (id) => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
        // Make the DELETE request to the server
        const response = await fetch(`http://localhost:8080/student/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
        }

        // Update the state by filtering out the deleted student
        setData((prevData) => prevData.filter(stu => stu.id !== id));
        alert('Student deleted successfully!');
    } catch (err) {
        console.error("Error deleting student:", err);
        alert("Error deleting student. Please try again.");
    }
};

const handleUpdate = () => {
  
}


  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border border-gray-300">ID</th>
          <th className="px-4 py-2 border border-gray-300">Name</th>
          <th className="px-4 py-2 border border-gray-300">Grade</th>
          <th className="px-4 py-2 border border-gray-300">Phone Number</th>
          <th className="px-4 py-2 border border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((student) => (
            <Student
              key={student.id}
              student={student}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center px-4 py-2 border border-gray-300"
            >
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default List;
