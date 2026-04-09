import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import StudentDashboard from "./pages/student/Dashboard";
import CompanyDashboard from "./pages/company/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

import StudentProfile from "./pages/student/Profile";
import CompanyProfile from "./pages/company/Profile";
import AdminProfile from "./pages/admin/Profile"; 

import AdminView from "./pages/admin/View";

import ApplicationDetails from "./pages/admin/ApplicationDetails";
import ViewDrive from "./pages/admin/ViewDrive";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        {/* ---------------- LANDING ---------------- */}
        <Route path="/" element={<Landing />} />

       
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={`/${user.role}`} />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={`/${user.role}`} />}
        />

     
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/company"
          element={
            <ProtectedRoute role="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/profile"
          element={
            <ProtectedRoute role="company">
              <CompanyProfile />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

     
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/view/:type/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminView />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/view/student/:id" element={<StudentProfile />} />
<Route path="/admin/view/company/:id" element={<CompanyProfile />} />

<Route path="/admin/view/application/:id" element={<ApplicationDetails />} />
<Route path="/admin/view/drive/:id" element={<ViewDrive />} />

        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;