const backendDomain = "http://localhost:8080"

const SummaryAPI = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "POST",
    },

    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "POST",
    },

    current_user:{
        url: `${backendDomain}/api/user-details`,
        method: "GET",
    },

    logout:{
        url: `${backendDomain}/api/logout`,
        method: "GET",
    },

    allUsers:{
        url: `${backendDomain}/api/all-users`,
        method: "GET",
    },

    updateUser:{
        url: `${backendDomain}/api/update-user`,
        method: "POST",
    },

    uploadProduct:{
        url: `${backendDomain}/api/upload-product`,
        method: "POST",
    },

    allProduct:{
        url: `${backendDomain}/api/get-product`,
        method: "GET",
    },

    updateProduct:{
        url: `${backendDomain}/api/update-product`,
        method: "POST",
    },
}


export default SummaryAPI;