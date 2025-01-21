import api from "./index";

const endpoints = {
    getUsers: async () => {
        return await api("/users");
    },
    
    deleteUser: async (user: any) => {
        return await api(`/users/${user.id}`, {
            method: "delete",
            data: JSON.stringify({user}),
        });
    },

    updateUser: async (user: any) => {
        return await api(`/users/${user.id}`, {
            method: "patch",
            data: JSON.stringify({user}),
        });
    },

    createUser: async (user: any) => {
        return await api("/users", {
            method: "post",
            data: JSON.stringify({user}),
        });
    },
}

export default endpoints;