import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";
import {Cart} from "./components/cart/Cart";
import {ProductList} from "./components/shopping/ProductList";
import {Auth} from "./pages/auth";
import {ShopContextProvider} from "./context/ShopContext";
import {SearchProvider} from "./context/SearchContext";

function App() {
  return (
    <div className="App">
        <SearchProvider>
            <ShopContextProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path={"/"} element={<ProductList />}></Route>
                        <Route path={"/auth"} element={<Auth />}></Route>
                        <Route path={"/cart"} element={<Cart />}></Route>
                    </Routes>
                </Router>
            </ShopContextProvider>
        </SearchProvider>
    </div>
  );
}

export default App;
