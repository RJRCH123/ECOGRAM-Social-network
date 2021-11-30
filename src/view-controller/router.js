/* eslint-disable consistent-return */
import { components } from '../pages/index.js';
import { auth, createUserWithEmailAndPassword } from '../../firebase/firebaseconfig.js';

export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/welcome':
    case '#/': {
      return sectionMain.appendChild(components.welcome());
    }
    case '#/signin': {
      sectionMain.appendChild(components[id]());
      break;
    }
    case '#/signup': {
      sectionMain.appendChild(components[id]());
      document
        .getElementById('btn-welcome-signup')
        .addEventListener('click', () => {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log('created');
              alert(`Created User ${user}`);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(`Notification:${errorCode}${errorMessage}`);
              alert(`Notification: ${errorMessage}`);
            });
        });
      return;
    }
    case '#/home': {
      return sectionMain.appendChild(components.home());
    }
    default:
      return sectionMain.appendChild(components.different());
  }
};
