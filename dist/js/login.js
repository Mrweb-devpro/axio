"use strict";

import { signInWithEmailAndPassword } from "firebase/auth";

const loginEmail = document.querySelector(".loign-email-inp");
const loginPasswordInp = document.querySelector(".login-password-inp");
const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, loginEmail.value, loginPasswordInp.value)
    .then((cred) => {
      console.log("UserLoggedIn", cred.uers);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
