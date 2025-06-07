// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import NotFound from './components/NotFound';
import NotAuthorized from './components/NotAuthorized';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Teachers from './components/admin/Teachers';
import Parents from './components/admin/Parents';
import Classes from './components/admin/Classes';
import Student from './components/admin/Student';
import AdminDashboard from './components/admin/AdminDashboard';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="App-header">
          </header>
        </div>
        <Routes>
            <Route path='/' element={<HomeComponent/>}/>

            {/* Admin Protected Routes */}
            <Route path='/admin-dashboard' 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout/>
                  </ProtectedRoute>
                }>
                <Route path='' element={<AdminDashboard />} />
                <Route path='teachers' element={<Teachers />} />
                <Route path='parents' element={<Parents />} />
                <Route path='students' element={<Student />} />
                <Route path='classes' element={<Classes />} />
            </Route>
            
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/register' element={<RegisterComponent/>}/>

            {/* defaults */}
            <Route path='/not-authorized' element={<NotAuthorized/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
