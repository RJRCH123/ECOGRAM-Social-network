import {
  createUserWithEmailAndPassword,
  auth,
  sendEmailVerification,
  doc, setDoc, db, provider, signInWithPopup,
} from '../utils/firebaseconfig.js';

// Add a new document in collection "users"
async function createNewUser(name, email, uid) {
  await setDoc(doc(db, 'users', uid), {
    uid,
    name,
    email,
  });
}

const cleanModal = () => {
  const check = document.getElementById('modalCheck');
  const nameI = document.getElementById('modalName');
  const errorSU = document.getElementById('modalSignUp');

  if (check) {
    document
      .getElementById('modalCheck')
      .classList.replace('alertmodalCheck', 'modalCheck');
  }

  if (nameI) {
    document
      .getElementById('modalName')
      .classList.replace('alertmodalName', 'modalName');
  }

  if (errorSU) {
    document
      .getElementById('modalSignUp')
      .classList.replace('alertMessageSignUp', 'modalSignUp');
  }
};
// envío de email para la verificación de correo registrado
export const handleSenEmailVerification = () => {
  sendEmailVerification(auth.currentUser)
    .then((result) => {
      console.log('result: ', result);
      // Email verification sent!
      // ...
      console.log('send email');
    })
    .catch(() => {
      console.log('dont send email');
    });
};

export const handleSingUp = (e) => {
  e.preventDefault();
  const name = e.target.closest('form').querySelector('#name').value;
  const email = e.target.closest('form').querySelector('#email').value;
  const password = e.target.closest('form').querySelector('#password').value;

  if (name !== '') {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Add new user
        const emailFS = userCredential.user.email;
        const uidFS = userCredential.user.uid;
        createNewUser(name, emailFS, uidFS);
        cleanModal();
        // Print notification: User created
        document
          .getElementById('modalCheck')
          .classList.replace('modalCheck', 'alertmodalCheck');
        handleSenEmailVerification();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error en signup', errorMessage, errorCode);
        // Print notification: error messeges
        cleanModal();
        document
          .getElementById('modalSignUp')
          .classList.replace('modalSignUp', 'alertMessageSignUp');
        // Print text: error messages of Firebase
        document.getElementById('errormessage').innerHTML = errorCode;
      });
  } else if (name === '' || name == null) {
    cleanModal();
    // Print notification: name incompleted
    document
      .getElementById('modalName')
      .classList.replace('modalName', 'alertmodalName');
  }
};

export const handleSingUpGoogle = (e) => {
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const uid = user.uid;
      createNewUser(name, email, uid)
        .then(() => {
          cleanModal();
          // Print notification: User created
          document
            .getElementById('modalCheck')
            .classList.replace('modalCheck', 'alertmodalCheck');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error en signup', errorMessage, errorCode);
          // Print notification: error messeges
          cleanModal();
          document
            .getElementById('modalSignUp')
            .classList.replace('modalSignUp', 'alertMessageSignUp');
          // Print text: error messages of Firebase
          document.getElementById('errormessage').innerHTML = errorCode;
        });
    })
    .catch(console.log('error en carga'));
};

const SignUp = () => {
  const viewCatalogue = `
  <div class="BoxSignUp">
    <div class="BoxWelcome1">
        <div class="Logo1">
            <img src="img/Logos/LogoG1.png" class="logoSignUp" alt="logoKMS" />
        </div>
        <br>
        <p class="text-home">
            It is a social network focused on creating a community interested in
            the preservation of our only home "🌎The Planet Earth".
          </p>
        <p class="kmr">
            KMR
        </p>
    </div>
    <div class="BoxFormSignUp">
    
      <form>
        <div class="containerSignUp">
          <h1>Sign Up</h1>
          <hr />
          <div class="containerLogin">
          <label for="name"><b>Name</b></label>
          <input
            class="inputSignUp"
            id="name"
            type="text"
            placeholder="Enter Your Name"
            name="name"
            required
          />

          <label for="email"><b>Email</b></label>
          <input
            class="inputSignUp"
            id="email"
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          />

          <label for="psw"><b>Password</b></label>
          <input
            class="inputSignUp"
            id="password"
            type="password"
            placeholder="Enter Password"
            maxlength="8"
            name="psw"
            required
          />

          <label>
            <input
              class="inputCheck"
              type="checkbox"
              checked="checked"
              name="remember"
              style="margin-bottom: 15px"
            />
            Remember me
          </label>

          <p>
            By creating an account you agree to our
            <a href="#/terms" style="color: dodgerblue">Terms & Privacy</a>.
          </p>

          <p id="verify-message" class="verify-message"></p>
          <div class="clearfix">
            <button type="submit" id="btn-welcome-signup" id="signup" class="signupbtn">Sign Up</button>
            <button type="submit" id="btn-signup-google" class="LoginGooglebtn">Sign Up with Google</button>
          </div>
          <div class="clearfix">

          </div>
          <div id="modalSignUp" class="modalSignUp">
            <img src="img/Icons/Alert2.png" class="Alert" alt="Alert" />
            <p id="errormessage"> Error </p>
          </div>
          <div id="modalCheck" class="modalCheck">
            <img src="img/Icons/Verify.png" class="Check" alt="User Created" />
            <p id="CheckMessage"> Your username was created successfully. Check your email.</p>
          </div>
          <div id="modalName" class="modalName">
            <img src="img/Icons/Alert2.png" class="Alert" alt="You need enter your name" />
            <p id="nameMessage"> Required your name </p>
          </div><hr>
          </div> 
          <p>
          Do you already have an account?
            <a href="#/signin" style="color: dodgerblue">Sign In</a>.
          </p>
        </div>
      </form>
    </div>
  </div>
  `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewCatalogue;

  divElemt
    .querySelector('#btn-welcome-signup')
    .addEventListener('click', handleSingUp);

  divElemt
    .querySelector('#btn-signup-google')
    .addEventListener('click', handleSingUpGoogle);
  return divElemt;
};

export default SignUp;

export const actionCodeSettings = () => ({
  url: 'katerint.github.io',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  dynamicLinkDomain: 'katerint.github.io',
});
