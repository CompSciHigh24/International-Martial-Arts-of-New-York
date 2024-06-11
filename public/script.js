const { json } = require("express");

const form = document.querySelector("form");

.createForm.addEventListener("submit", (e) =>{
  e.preventDefualt();

  const listData = new FormData(createForm);
  const reqBody = Object.Enteries(listData);

  fetch('/login&sign', {
    method: "POST",
    headers: {"Content-Type": 'application/json'},
    body:JSON.stringify(reqBody)

    .then(() =>{
      window.location.href = "/login&sign";
    })
  })
})