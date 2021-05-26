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
        token: null,
        visit : null
    };
    constructor() {
        makeObservable(this, {
            user: observable,
            login: action,
            fillUser: action,
            refreshInfo: action,
            logout: action,
            getProfile: action,
            getAllRequests: action,
            getMyRequest: action,
            getDiscordToken : action,
            postRequest: action,
            deleteRequest : action,
            patchUser: action,
            getUser: action,
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
        this.user.name = data.userInfo.full_name;
        this.user.isAdmin = data.userInfo.isAdmin;
        this.user.debt = data.userInfo.debt;
        // ADD COOKIE
        this.user.token = data.access_token;
        this.cookie.set("user_token", this.user.token);
    }

    // handling user login
    login(email, password) {
        const params = {
            url: process.env.REACT_APP_URI + "/auth/signin",
            method: "POST",
            data: {
                email,
                password,
            },
        };
        return axios(params)
            .then((res) => {
                if (res.status !== 201)
                    return { failed: true, message: res.data.message };
                this.fillUser(res.data);
                return { failed: false, message: "SUCCESS" };
            })
            .catch((err) => {
                return { failed: true, message: err.message };
            });
    }

    // handling user login
    signUp(data) {
        const params = {
            method: "POST",
            url: process.env.REACT_APP_URI + "/auth/signup",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        return axios(params)
            .then((res) => {
                if (res.status !== 201)
                    return { failed: true, message: res.data.message };
                this.fillUser(res.data);
                return { failed: false, message: "SUCCESS" };
            })
            .catch((err) => {
                console.log(err);
                return { failed: true, message: err.message };
            });
    }

    logout() {
        this.cookie.remove("user_token");
        this.user.isUser = false;
        this.user.history.push("/signin");
    }
    async getUser(user_id)
    {
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/users/" + user_id,
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
        };
        return axios(params)
            .then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
                this.user.history.push("/signin");
            })
            .catch((err) => {
                console.log(err);
                this.user.history.push("/signin");
            });
    }
    async getProfile() {
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/auth/profile",
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
        };
        return axios(params)
            .then((res) => {
                if (res.status === 200) {
                    return res.data.userInfo;
                }
                this.user.history.push("/signin");
            })
            .catch((err) => {
                console.log(err);
                this.user.history.push("/signin");
            });
    }

    getDiscordToken (requestId) {
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/requests/help/" + requestId,
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
        };
        return axios(params)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                console.log("je passe la");
                console.log(res.data);
                return res.data;
            }
            this.user.history.push("/signin");
        })
        .catch((err) => {
            console.log(err);
            this.user.history.push("/signin");
        });
    }

    async getAllRequests() {
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/requests",
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
        };
        return axios(params)
            .then((res) => {
                if (res.status === 200) return res.data;
                this.user.history.push("/signin");
            })
            .catch((err) => {
                console.log(err);
                this.user.history.push("/signin");
            });
    }

    async getMyRequest() {
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/requests/my",
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
        };
        return axios(params)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length >= 0) {
                        return res.data;
                    }
                    return null;
                }
                this.user.history.push("/signin");
            })
            .catch((err) => {
                console.log(err);
                this.user.history.push("/signin");
            });
    }

    async postRequest(data) {
        const params = {
            method: "post",
            url: process.env.REACT_APP_URI + "/requests",
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
            data: data
        };
        return axios(params)
            .then((res) => {
                if (res.status === 201) 
                    return res.data;
                this.user.history.push("/signin");
            })
            .catch((err) => {
                console.log(err);
                this.user.history.push("/signin");
            });
    }


    async patchUser(data)
    {
        const params = {
            method: "patch",
            url: process.env.REACT_APP_URI + "/users",
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
            data: data
        };
        return axios(params)
            .then((res) => {
                if (res.status === 201) 
                    return res.data;
                this.user.history.push("/signin");
            })
            .catch((err) => {
                console.log(err);
                this.user.history.push("/signin");
            });
    }

    async deleteRequest() {
        const params = {
            method: "delete",
            url: process.env.REACT_APP_URI + "/requests/my",
            headers: {
                Authorization: "Bearer " + this.user.token,
                },
            }
        
        return axios(params).then(res => {
            if (res.status === 200)
                return true;
            this.user.history.push("/signin");

        }).catch(err => {
            console.log(err)
            this.user.history.push("/signin");
        });
    }

    async refreshInfo() {
        this.user.token = this.cookie.get("user_token");
        const params = {
            method: "get",
            url: process.env.REACT_APP_URI + "/auth/profile",
            headers: {
                Authorization: "Bearer " + this.user.token,
            },
        };
        const res = await axios(params)
            .then((res) => {
                if (res.status === 200) {
                    const my_data = {
                        ...res.data,
                        access_token: this.cookie.get("user_token"),
                    };
                    this.fillUser(my_data);
                    return true;
                }
                this.history.push("/signin");
                return false;
            })
            .catch((err) => this.history.push("/signin"));
        return res;
    }
}

const user = new UserStore();

// update localStorage after each action
autorun(() => {});

export default user;
