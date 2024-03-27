import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar";
import {Cart} from "./pages/cart/Cart";
import {Product} from "./pages/shopping/Product";

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Routes>
              <Route path={"/"} element={<Product />}></Route>
              <Route path={"/cart"} element={<Cart />}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
