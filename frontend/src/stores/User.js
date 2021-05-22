//import CommonService from './CommonService'

import { action, autorun, computed, makeObservable, observable } from "mobx";
import { createBrowserHistory } from "history";
import axios from "axios";

class UserStore {
    user = {
        isUser : false,
        isAdmin : false,
        name : null,
        dept : 0,
        history : null
    }
    constructor() {
        makeObservable(this, {
            user : observable,
            login: action,
            fillUser : action,
            isAdmin: computed,
            isUser: computed,
            history : computed,
        });
        this.user.login();
        this.user.history = createBrowserHistory();
        // After a refresh HERE #FIXME
    }

    get history() {
        return this.user.history;
    }

    get isAdmin() {
        return this.user.isAdmin;
    }

    get isUser() {
        return this.user.isUser;
    }

    // handling user login
    async login(email, password) {
        const params = {
            method: "post",
            url: process.env.REACT_APP_URI + "/auth/signin",
            withCredentials: true,
            data: {
                email,
                password,
            },
        };
        await axios(params)
            .then((res) => {
                if (res.status !== 200)
                    return { failed: true, message: res.data.error };
                this.fillUser(res.data);
                return { failed: false, message: "SUCCESS" };
            })
            .catch((err) => {
                return { failed: true, message: "API error" };
            });
    }

    fillUser(data) {
        this.user.isUser = true;
        this.user.name = data.full_name;
        this.user.isAdmin = data.isAdmin;
        this.user.dept = data.dept;
        // #FIXME ADD COOKIE
    }

    // handling user login
    async signUp(data) {
        const params = {
            method: "post",
            url: process.env.REACT_APP_URI + "/auth/signup",
            withCredentials: true,
            data
        };
        await axios(params)
            .then((res) => {
                if (res.status !== 301)
                    return { failed: true, message: res.message };
                this.fillUser(res.data);
                return { failed: false, message: "SUCCESS" };
            })
            .catch((err) => {
                console.log(err);
                return { failed: true, message: "API error" };
            });
    }
}

const user = new UserStore();

// update localStorage after each action
autorun(() => {});

export default user;
