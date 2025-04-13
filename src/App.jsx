import { BrowserRouter as Router, Route, Routes } from "react-router";
import './App.css';
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Category } from "./pages/Category";
import { Recipe } from "./pages/Recipe";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Favorites } from "./pages/Favorites";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes >
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/register' element={<Register />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/:name" element={<Category />} />
            <Route path='/:name/:id' element={<Recipe />} />
          </Route>        
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
