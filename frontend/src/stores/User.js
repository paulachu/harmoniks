//import CommonService from './CommonService'

import { action, autorun, computed, makeObservable, observable } from "mobx";
import axios from "axios";

class UserStore {
    constructor() {
        makeObservable(this, {
            isAdmin: computed,
            isUser: computed,
            login: action,
        });
    }

    get isAdmin() {
        return false;
    }

    get isUser() {
        return true;
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
                return { failed: false, message: "SUCCESS" };
            })
            .catch((err) => {
                return { failed: true, message: err.toString() };
            });
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
                this.user = res.data;
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
