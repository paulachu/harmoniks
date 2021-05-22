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
                            <Route path="/requests" exact component={RequestsPage} />
                            <Redirect to="/" />
                        </Switch>
                    </AnimatePresence>
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
