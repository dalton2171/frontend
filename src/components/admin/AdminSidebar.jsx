import { FiHome, FiBarChart2, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white/5 border-r border-white/10 p-4">

      <h1 className="text-cyan-400 text-xl font-bold mb-8">
        DALITECH CONTROL
      </h1>

      <ul className="space-y-4">

        <li onClick={() => navigate("/")}>
          <FiHome /> Home
        </li>

        <li onClick={() => navigate("/analytics")}>
          <FiBarChart2 /> Analytics
        </li>

        <li>
          <FiSettings /> Settings
        </li>

      </ul>

    </div>
  );
}

export default AdminSidebar;