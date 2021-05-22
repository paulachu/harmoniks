//import CommonService from './CommonService'

import { action, autorun, computed, makeObservable, observable } from "mobx";
import { createBrowserHistory } from "history";
import { Cookies } from "react-cookie";
import axios from "axios";

class UserStore {
    user = {
        isUser: false,
        isAdmin: false,
        name: null,
        debt: 0,
        history: null,
        token: null
    };
    constructor() {
        makeObservable(this, {
            user: observable,
            login: action,
            fillUser: action,
            refreshInfo : action,
            isAdmin: computed,
            isUser: computed,
            history: computed,
        });
        this.cookie = new Cookies();
        this.user.history = createBrowserHistory({ forceRefresh: true });
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

    fillUser(data) {
        this.user.isUser = true;
        this.user.name = data.full_name;
        this.user.isAdmin = data.isAdmin;
        this.user.debt = data.debt;
        // ADD COOKIE
        this.user.token = data.access_token;
        this.cookie.set("user_token", this.user.token);
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

    // handling user login
    async signUp(data) {
        const params = {
            method: "post",
            url: process.env.REACT_APP_URI + "/auth/signup",
            withCredentials: true,
            data,
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

    refreshInfo() {
        this.user.token = this.cookie.get("user_token");
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/auth/profile",
            Authorization : "Bearer " + this.user.token,
            withCredentials: true,
        };
        axios(params)
        .then(res => {
            if (res.status === 200)
                this.fillUser(res.data)
            else 
                this.history.push("/signin");
        })
        .catch(this.history.push("/signin"));
    }
}

const user = new UserStore();

// update localStorage after each action
autorun(() => {});

export default user;
