import axios from "axios"

export let url = "http://localhost:8088/user"
export let postUser = async (data) => {
    try {
        await axios.post(url + "/add", data);
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error(err.message);
        }
    }
}


export let getUser = async (id) => {
    try {
        let result = await axios.get(url + `/${id}`);
        console.log(result.data);
        return result.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error(err.message);
        }
    }
}
export let updateUser = async (data, id) => {
    try {
        await axios.put(url + `/${id}`, data);
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error(err.message);
        }
    }
}

export let deleteUser = async (id) => {
    try {
        await axios.delete(url + `/${id}`);
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error(err.message);
        }
    }
}