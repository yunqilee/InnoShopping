import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";
import {Cart} from "./components/cart/Cart";
import {ProductList} from "./components/shopping/ProductList";
import {Auth} from "./pages/auth";
import {Register} from "./pages/register";
import {ShopContextProvider} from "./context/ShopContext";
import {SearchProvider} from "./context/SearchContext";

function App() {
  return (
    <div className="App">
        <Router>
            <SearchProvider>
                <ShopContextProvider>
                    <Navbar />
                    <Routes>
                        <Route path={"/"} element={<ProductList />}></Route>
                        <Route path={"/auth"} element={<Auth />}></Route>
                        <Route path={"/register"} element={<Register />}></Route>
                        <Route path={"/cart"} element={<Cart />}></Route>
                    </Routes>
                </ShopContextProvider>
            </SearchProvider>
        </Router>
    </div>
  );
}

export default App;
