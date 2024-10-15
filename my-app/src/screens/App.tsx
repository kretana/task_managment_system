import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "../components/PrivateRoute";
import {Dashboard} from "./Dashboard";
import {AdminPanel} from "./AdminPanel"
import {AuthForm} from "./AuthForm";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route
                    path="/dashboard"
                    element={<PrivateRoute allowedRoles={['user', 'admin']}>
                        <Dashboard />
                    </PrivateRoute>}
                />
                <Route
                    path="/admin"
                    element={<PrivateRoute allowedRoles={['user','admin']}>
                        <AdminPanel />
                    </PrivateRoute>}
                />
            </Routes>
        </Router>
    );
}

export default App;
