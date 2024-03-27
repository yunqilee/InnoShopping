import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";
import {Cart} from "./components/cart/Cart";
import {Product} from "./components/shopping/Product";
import {ShopContextProvider} from "./components/context/shop-context";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
          <Router>
              <Navbar />
              <Routes>
                  <Route path={"/"} element={<Product />}></Route>
                  <Route path={"/cart"} element={<Cart />}></Route>
              </Routes>
          </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
