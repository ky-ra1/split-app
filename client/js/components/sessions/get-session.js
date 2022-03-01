function getSession() {
    return axios
        .get("/api/sessions")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Not logged in");
            return error;
        });
}
