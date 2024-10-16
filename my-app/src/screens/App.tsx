import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Dashboard} from "./Dashboard";
import {AuthForm} from "./AuthForm";
import PrivateRoute from "../components/PrivateRoute";
import {EditTask} from "../components/tasks/EditTask";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/edit-task/:id" element={<EditTask />}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
