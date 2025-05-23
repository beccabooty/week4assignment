const secretForm = document.querySelector("#secretForm");

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(secretForm);
  const formValues = Object.fromEntries(formData);

  fetch("http://localhost:8080/newSecret", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(formValues);
  console.log(formData);
}

secretForm.addEventListener("submit", handleSubmit); // , reset()

async function getSecrets() {
  const response = await fetch("http://localhost:8080/secrets");
  const secrets = await response.json();
  return secrets;
}

function createSecrets(arrayofdata) {
  arrayofdata.forEach((item) => {
    const alias = document.createElement("h2");
    const secretType = document.createElement("h3");
    const secret = document.createElement("p");

    alias.textContent = item.alias;
    secretType.textContent = item.secrettype;
    secret.textContent = item.secret;

    const allSecrets = document.getElementById("secretDisplay");
    allSecrets.appendChild(alias);
    allSecrets.appendChild(secretType);
    allSecrets.appendChild(secret);
  });
}

async function renderData() {
  const secretData = await getSecrets();
  createSecrets(secretData);
}

renderData();
