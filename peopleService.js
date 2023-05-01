import axios from "axios";


let getFriends = () =>{
    const config = {
        method: "GET",
        url: "https://localhost:50001/api/friends",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
};

let deleteFriend = (payload) =>{
    const config = {
        method: "DELETE",
        url:  "https://localhost:50001/api/friends/" + payload,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(()=>{
        return payload;
    });
};

let addFriend = (payload) =>{
    const config = {
        method: "POST",
        url: "https://localhost:50001/api/friends",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
};

let editFriend = (payload) =>{
    const config = {
        method: "PUT",
        url: "https://localhost:50001/api/friends/" + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
};


export {getFriends, deleteFriend, addFriend, editFriend};

