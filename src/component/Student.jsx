import React from "react";

const Student = ({ student, handleDelete, handleUpdate }) => {

  return (
    <tr key={student.id} className="hover:bg-gray-100">
      <td className="px-4 py-2 border border-gray-300">{student.id}</td>
      <td className="px-4 py-2 border border-gray-300">{student.stuName}</td>
      <td className="px-4 py-2 border border-gray-300">{student.stuGrade}</td>
      <td className="px-4 py-2 border border-gray-300">{student.phNumber}</td>
      <td className="px-4 py-2 border border-gray-300">
        <button 
        type="button" 
        className="bg-red-500 px-2 py-1 text-white rounded hover:bg-red-700"
        onClick={()=> handleDelete(student.id)}
        >Delete</button>
        <button 
        type="button" 
        className="bg-green-500 px-2 py-1 text-white rounded hover:bg-green-700"
        onClick={()=> handleUpdate(student.id)}
        >Update</button>
      </td>
    </tr>
  );
};

export default Student;
