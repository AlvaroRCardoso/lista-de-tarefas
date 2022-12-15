const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios.post("http://localhost:3000/users/avatar/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then((res) => {
            Swal.fire(`Upload successful`);
        })
        .catch((err) => {
            Swal.fire(`${err}`);
        });
});
