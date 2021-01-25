import React, {useEffect} from 'react';
import PromotionsScreen from "./screens/promotions-screen/PromotionsScreen";
import {Provider} from "react-redux";
import rootStore from "./store";
import "./App.scss"
import TopBar from "./components/layout/top-bar/TopBar";
import SideMenu from "./components/layout/side-menu/SideMenu";
// import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css"

const App: React.FC = () => {
    useEffect(() => {
        M.AutoInit();
    });

    return <div className="App">
        <Provider store={rootStore}>
            <div className="top-bar-container">
                <TopBar/>
            </div>
            <div className="app-content">
                <SideMenu/>
                <div className="mock-router">
                    <PromotionsScreen/>
                </div>
            </div>
        </Provider>
    </div>
};

export default App;
