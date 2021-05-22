import { inject, observer } from "mobx-react";
import React from "react";
import { Redirect, Route } from "react-router";
import { compose } from "recompose";

const Auth = ({ component, user }) => {
    const Component = component; 
    return (
        <Route
            render={(props) => {
                if (user.isUser || user.cookie.get("user")) {
                    user.refreshInfo();
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/signin",
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default compose(inject('user'), observer)(Auth);
