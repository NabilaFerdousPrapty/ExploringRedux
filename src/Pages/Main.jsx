import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Header/Navbar";


const Main = () => {
    return (
        <div>
             <Navbar/>
             <Outlet/>
        
        </div>
    );
};

export default Main;