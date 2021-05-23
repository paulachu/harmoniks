import { inject, observer } from "mobx-react";
import React from "react";
import { Route } from "react-router";
import { compose } from "recompose";

const Auth = ({ component, user }) => {
    const Component = component;

    return (
        <Route
            render={(props) => {
                user.refreshInfo();
                return <Component {...props} />;
            }}
        />
    );
};

export default compose(inject("user"), observer)(Auth);
