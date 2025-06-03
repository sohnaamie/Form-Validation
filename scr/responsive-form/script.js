const form = document.getElementById("Responsive-form");
const submitButton = form.querySelector("button[type='submit']");
const summaryCard = document.getElementById("summaryCard");
const errorSummary = document.getElementById("errorSummary");


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function isStrongPassword(password) {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
}


function isAdult(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthCheck = today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  return age > 18 || (age === 18 && monthCheck);
}


function validateForm() {
  const fullName = form.fullName.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  const dob = form.dateOfBirth.value;
  const phone = form.telephone.value.trim();
  const country = form.country.value;
  const termsChecked = form.terms.checked;

  let valid = true;

  if (!fullName) valid = false;
  if (!isValidEmail(email)) valid = false;
  if (!isStrongPassword(password)) valid = false;
  if (password !== confirmPassword) valid = false;
  if (!dob || !isAdult(dob)) valid = false;
  if (!phone) valid = false;
  if (!country) valid = false;
  if (!termsChecked) valid = false;

  submitButton.disabled = !valid;
  return valid;
}


form.addEventListener("input", validateForm);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    // Hide the form
    form.style.display = "none";

    // Show the summary card
    const summaryCard = document.getElementById("summaryCard");
    summaryCard.style.display = "block";

    const passwordMask = "•".repeat(form.password.value.length);

    summaryCard.innerHTML = `
      <h2>Thanks for registering!</h2>
      <p><strong>Name:</strong> ${form.fullName.value}</p>
      <p><strong>Email:</strong> ${form.email.value}</p>
      <p><strong>Password:</strong> ${passwordMask}</p>
      <p><strong>DOB:</strong> ${form.dateOfBirth.value}</p>
      <p><strong>Phone:</strong> ${form.telephone.value}</p>
      <p><strong>Country:</strong> ${form.country.value}</p>
    `;
  }
});


