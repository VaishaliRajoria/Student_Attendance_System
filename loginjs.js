document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get student name and password
        const studentName = document.getElementById("name").value.trim();
        const password = document.getElementById("password").value;
        const nameError = document.getElementById("name-error");
        const passwordError = document.getElementById("password-error");

        // Regular Expression for Name (Only letters, no numbers or symbols)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(studentName)) {
            nameError.textContent = "Name must contain only letters (No numbers or symbols)";
            return;
        } else {
            nameError.textContent = ""; // Clear error message
        }

        // Regular Expression for Strong Password
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            passwordError.textContent = "Password must be at least 8 characters, include one uppercase letter, one number, and one special character.";
            return;
        } else {
            passwordError.textContent = ""; // Clear error message
        }

        // Store student name in localStorage
        localStorage.setItem("studentName", studentName);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });
});
