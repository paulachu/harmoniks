import { Provider } from "mobx-react";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RequestsPage from "./pages/RequestsPage.js"
import user from "./stores/User";
import Presentation from "./pages/Presentation";
import Profil from "./pages/Profil";
import Auth from "./authentication/Auth"; // for requests, history and profil
import History from "./pages/History";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider user={user}>
                    <Navigation />
                    <AnimatePresence>
                        <Switch>
                            <Route path="/" exact component={Presentation}/>
                            <Route path="/signin" exact component={SignIn} />
                            <Route path="/signup" exact component={SignUp} />

                            <Auth path="/requests" exact component={RequestsPage} />
                            <Auth path="/history" exact component={History} />
                            <Auth path="/profil" exact component={Profil} />
                            <Redirect to="/" />
                        </Switch>
                    </AnimatePresence>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
