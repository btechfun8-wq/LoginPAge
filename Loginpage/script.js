//Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e){
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const jsonData = localStorage.getItem("users")
        const users = JSON.parse(jsonData) || [];

        if (users.some((u)=> u.email === email)) {
            alert("Email already exists! Try logging in");
            return;
        }

        users.push({name, email, password})
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful!")
        window.location.href = "login.html"
    })
}

//Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById("loginEmail").value
        const password = document.getElementById("loginPassword").value

        const jsonData = localStorage.getItem("users");
        const users = JSON.parse(jsonData) || [];

        const validUser = users.find((user) => user.email === email && user.password === password);

        if (validUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(validUser))
            window.location.href = "index.html";
        } else {
            document.getElementById("errorMsg").textContent = "Invalid email and password!"
        }
    })
}

//Home page
if (window.location.pathname.includes('index.html')) {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) {
        window.location.href = 'login.html'
    }else{
        document.getElementById("welcomeMsg").textContent = `Welcome, ${loggedUser.name}! You are successfully logged in.`
        document.getElementById("logoutBtn").addEventListener("click", ()=>{
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html"
        })
    }
}