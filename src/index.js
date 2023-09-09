// for the signup page only
// adding data
const signupForm = document.querySelector(".signup-form");
const signupBtn = document.querySelector(".signup-btn");
const usernameInp = signupForm.username;
const emailInp = signupForm.email;
const passwordInp = signupForm.password;
const confirmPasswordInp = signupForm.confirmPassword;
const loadingOverlay = document.querySelector(".loading-overlay");
const passwordChecker = document.querySelector(".passowrd-checker");
const colors = ["red", "yellow", "yellowgreen", "green"];
const errorMessage = document.querySelector(".error");
// let var
let hasNumber = false;
let hasLetter = false;
let hasSymbol = false;
let hasSixChara = false;
let passwordCheckerWidth = 0;
let validStrongPasscode = false;

//reusable functions
const setPasscodeCheckerStyle = function () {
  passwordChecker.style.width = `${passwordCheckerWidth}%`;
  if (passwordCheckerWidth === 25) {
    passwordChecker.style.backgroundColor = colors[0];
  } else if (passwordCheckerWidth === 50) {
    passwordChecker.style.backgroundColor = colors[1];
  } else if (passwordCheckerWidth === 75) {
    validStrongPasscode = true;
    passwordChecker.style.backgroundColor = colors[2];
  } else if (passwordCheckerWidth === 100) {
    validStrongPasscode = true;
    passwordChecker.style.backgroundColor = colors[3];
  } else {
    passwordChecker.style.backgroundColor = colors[0];
  }
};
const displayError = function (mess = "") {
  errorMessage.textContent = mess;
};
// pre setter
setPasscodeCheckerStyle();
displayError();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC00iFTbcjqa_SZLkrVRHh8KaCbJX3ndac",
  authDomain: "axio-5a310.firebaseapp.com",
  projectId: "axio-5a310",
  storageBucket: "axio-5a310.appspot.com",
  messagingSenderId: "148611109014",
  appId: "1:148611109014:web:11cb6a83912f95c4ff72b7",
  measurementId: "G-T3WJ0GDQTP",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const colRef = collection(db, "userData");
// real time collection data

onSnapshot(colRef, (snapshot) => {
  let data = [];
  snapshot.docs.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  // console.log(data);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// EVENTS
passwordInp.addEventListener("keyup", (e) => {
  // console.log(hasNumber, hasLetter, hasSymbol, hasSixChara);
  e.preventDefault();
  // regex
  const NumRegEx = /[0-9]/;
  const lettRegEx = /[a-z]/gi;
  const symbRegEx = /[|:;!#*[()<>=,".'~`$/\]}{?%^]/gi;
  const alphaKeyCodeRegex = /[65-90]/;
  //
  //
  if (NumRegEx.test(passwordInp.value) && !hasNumber) {
    hasNumber = true;
    passwordCheckerWidth += 25;
    setPasscodeCheckerStyle();
  } else if (hasNumber && !NumRegEx.test(passwordInp.value)) {
    hasNumber = false;
    passwordCheckerWidth -= 25;
    setPasscodeCheckerStyle();
  }
  if (lettRegEx.test(passwordInp.value) && !hasLetter) {
    hasLetter = true;
    passwordCheckerWidth += 25;
    setPasscodeCheckerStyle();
  } else if (hasLetter && !lettRegEx.test(passwordInp.value)) {
    hasLetter = false;
    passwordCheckerWidth -= 25;
    setPasscodeCheckerStyle();
  }
  if (symbRegEx.test(passwordInp.value) && !hasSymbol) {
    hasSymbol = true;
    passwordCheckerWidth += 25;
    setPasscodeCheckerStyle();
  } else if (hasSymbol && !symbRegEx.test(passwordInp.value)) {
    hasSymbol = false;
    passwordCheckerWidth -= 25;
    setPasscodeCheckerStyle();
  }
  if (passwordInp.value.length >= 6 && !hasSixChara) {
    hasSixChara = true;
    passwordCheckerWidth += 25;
    setPasscodeCheckerStyle();
  } else if (hasSixChara && !(passwordInp.value.length >= 6)) {
    hasSixChara = false;
    passwordCheckerWidth -= 25;
    setPasscodeCheckerStyle();
  }
});
/// activating the signup button
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayError("");
  if (
    passwordInp.value &&
    confirmPasswordInp.value &&
    confirmPasswordInp.value === passwordInp.value &&
    passwordInp.value.length > 6 &&
    usernameInp.value &&
    usernameInp.value.length > 2 &&
    emailInp.value &&
    // !emailExist &&
    validStrongPasscode
  ) {
    signupForm.reset();
    loadingOverlay.classList.remove("none");
    document
      .querySelector(".cancel-loading-overlay")
      .addEventListener("click", (e) => {
        e.preventDefault();
        loadingOverlay.classList.add("none");
      });
    //
    addDoc(colRef, {
      username: usernameInp.value,
      userImage: "none",
    }).then(() => {
      signupForm.reset();
    });
    createUserWithEmailAndPassword(auth, emailInp.value, passwordInp.value)
      .then((cred) => {
        signupForm.reset();
        console.log(cred.user);
        loadingOverlay.classList.add("none");
        location.replace("./dist/login.html");
      })
      .catch((err) => {
        loadingOverlay.classList.add("none");
        console.log(err.message);
      });
  } else if (!usernameInp.value) {
    displayError("please input a username");
  } else if (!emailInp.value) {
    displayError("please input an email ");
  } else if (passwordInp.value === "") {
    displayError("please input a username");
  } else if (!passwordInp.value && !validStrongPasscode) {
    displayError("please password is not strong enough");
  } else if (passwordInp.value !== confirmPasswordInp.value) {
    displayError("please password is not the same");
  } else if (passwordInp.value.length < 6) {
    displayError("password must contain at least 6 characters");
  }
});
//deleteing data

//////////////////////////////////////////////////////////////////
