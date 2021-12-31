/* eslint-disable no-return-await */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import { publicationComponent } from './publication.js';

import {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '../utils/firebaseconfig.js';

import {
  storageRef,
  getFileURL,
  uploadBytes1,
} from '../utils/firebase_storage.js';

/* *************** Obtener un usuario de Firebase *************** */

async function readUser(uid) {
  let data = '';
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //  console.log('Document data:', docSnap.data());
    data = docSnap.data();
    sessionStorage.setItem('user', JSON.stringify(data));
  } else {
    //  doc.data() will be undefined in this case
    console.log('No exist user!');
  }
  return data;
}

/* read text content of a publication */

async function readAPost(uid, elmtTextContentPost) {
  let data = '';
  const docRef = doc(db, 'publications', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    data = docSnap.data().publication;
    //  eslint-disable-next-line no-param-reassign
    elmtTextContentPost.value = data;
    console.log('textPost:', elmtTextContentPost);
  } else {
    console.log('No exist post!');
  }
}

//  obtener url de firebase
async function urlStorage(params) {
  const refStorage = storageRef(params);
  await uploadBytes1(refStorage, params);
  return await getFileURL(refStorage);
}

/* *************** Agregar publicacion a Firebase *************** */
async function addPublication(publication, urlsImg) {
  try {
    console.log('addPublication:', urlsImg);
    //  eslint-disable-next-line no-unused-vars
    await addDoc(collection(db, 'publications'), {
      author: sessionStorage.getItem('key'),
      publication,
      idUserLike: '',
      dateCreated: new Date(),
      urlsImages: urlsImg,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

/* *************** Eliminar publicacion de Firebase *************** */

export const deletePublication = (idPublicationRef) => deleteDoc(doc(db, 'publications', idPublicationRef));

/* *************** Editar publicacion de Firebase *************** */

export const editPublication = (idPublicationRef, postEdit) => {
  const publiUpdate = doc(db, 'publications', idPublicationRef);
  return updateDoc(publiUpdate, {
    publication: postEdit,
    urls: postEdit,
  });
};

/* *************** Template del Home *************** */
const Home = () => {
  const containerHome = document.createElement('div');
  containerHome.classList.add('positionHome');
  const viewHome = `
  <main>
    <!-- HOME PAGE -->
    <section id='Home' class='Box Home'>

      <div class='HomeBox'>
        <div class='UserName'>
        </div>
        <div class='Avatar'>
          <img title='My phofile picture' class='Avatar-img' src='' alt='Avatar Profile'><br>
          <div class='linea2'>&nbsp;</div>
        </div>
        <div class='Bio'>
          <h3>Biography:</h3><br>
          <div>
            <p class='bioText' >Hola, soy amante del arte en reciclado. Hago muchas manualidades pro ambientales. Les invito a ver mi galeria. 🧮 </p>
          </div>
        </div>
        <div class='Inf'>
          <div class='Country'>
            <h3>Country:</h3>
            <div class='CountryFlex'>
              <div class='countryImg'>
              </div>
              <p class ='countryText'></p>
            </div>
          </div>
          <div class='Email'>

          </div>
        </div>
        <div class='Interests'>
          <h3>
            Interests:
          </h3><br>
          <div class='Interests-Box'>
            <img title='My interest' id='Interests-0' src='' alt=''>
            <img title='My interest' id='Interests-1' src='' alt=''>
            <img title='My interest' id='Interests-2' src='' alt=''>
          </div>
        </div>
      </div>

      <div id='publications' class='Publications'>
        <div class='PublicationsContent'>
          <div class='btnPublic'>
            <div class='btnsPublic'>
              <div class='flexFilterBtns'>
                <button id='btnAllPost' class='btnAllPost'>All Posts</button>
                <button id='btnMyPost' class='btnMyPost'>My Posts</button>
              </div>
              <input type='text' id='SearchName' name='firstname' class='SearchName' placeholder='🔍 User Name..'>
            </div>
            <div class='btnMode'>
              <button id='switch' class='switch'>
                <span><img title='Light mode' id='light' src='img/Icons/sun.png' alt='Light mode'></span>
                <span><img title='Dark mode' id='Dark' src='img/Icons/moon.png' alt='Dark mode'></span>
              </button>
            </div>

            <img id='NewPost' class='NewPost' src='img/Icons/WhiteBorder/PlusCircle1.png' alt='Nex Publication'>
          </div>
          <div class='boxPublic'>
          <div id='boxPublications'class='NoneboxPublications'>
            <div class='boxPhotoandName'>
              <div class='boxInternoPhotoandName'>
                <div class='photoPerfil'>
                  <img class='Avatar-img-Post' src='img/Avatares/Animals/AvatarA7.png' alt=''>
                </div>
                <div class='userNamePublication'>

                </div>
              </div>
            </div>
            <div class='publication'>
              <textarea name='comments' placeholder='Type something here...' id='texta2' clase='texta2'></textarea>
              <div id='modalCheckPost' class='modalCheckPost'>
                <img src='img/Icons/Verify.png'  alt='sent email' />
                <p>Your post was published successfully</p> 
              </div>
            </div>
            <div class='preview'></div> 
            <div class='opcionAddPost'>
              <div class='AddPhotoPost'>
                <input title='Add a photo' type='file' id='edit-file' class='inputFilePost'/>
                <img class='inputFilePostIcon'
                src='img/Icons/cameraPost.png'
                title='Add a photo'
                alt='Add a photo'/>
              </div>
              <div class='save'>
                <button id='btnSave' class='btnSave'>Save</button>
                <button id='btnCancel' class='btnCancel'>Cancel</button>
              </div>
            </div>
            <div id='modalNoMoreTwoPost' class='hide modalNoMoreTwoPost'>
              <img src="img/Icons/Alert2.png" class="Alert" alt="Alert" />
              <p>You can't add more two images</p> 
            </div>
          </div>
          <div id='publicado'>

          </div>
        </div>
        </div>
        <div class='SliderNews'>
          <div class='TittleEcoNews'>
            <h3> ECO NEWS </h3>
          </div>  
          <div class='NewsContainer'>
            <div class='News'>
              <img src='img/Notice/notice3.jpg'>
              <h2>COP26: Women are the most affected by climate change</h2>
              <a href='https:// news.un.org/es/story/2021/11/1499772' target='_blank'>See more</a>
            </div><br>
            <div class='News'>
              <img src='img/Notice/notice2.jpg'>
              <h2>
              The era of fossil fuel-powered cars in the spotlight at COP26</h2>
              <a href='https:// news.un.org/es/story/2021/11/1499832' target='_blank'>See more</a>
            </div><br>
            <div class='News'>
              <img src='img/Notice/notice1.jpg'>
              <h2>COP26: Promises 'ring hollow' when fossil fuels continue to receive trillions in subsidies, says Guterres</h2>
              <a href='https:// news.un.org/es/story/2021/11/1499902' target='_blank'>See more</a>
            </div><br>
            <div class='News'>
              <img src='img/Notice/notice5.jpg'>
              <h2>Panela, a sweet bet for the indigenous people to continue living in the Sierra de Colombia</h2>
              <a href='https:// news.un.org/es/story/2021/11/1500632' target='_blank'>See more</a>
            </div> <br>
          </div> 
        </div>
      </div>
    </section>
  </main>`;
  containerHome.innerHTML = viewHome;

  //  Div - Filters
  const divPublicado = containerHome.querySelector('#publicado');
  const btnAllPost = containerHome.querySelector('.btnAllPost');
  const btnMyPost = containerHome.querySelector('.btnMyPost');
  const SearchName = containerHome.querySelector('.SearchName');

  //  Div - img
  const imgPreview = containerHome.querySelector('.preview');

  //  Alert no more two posts
  const alertNoMoreImgs = containerHome.querySelector('#modalNoMoreTwoPost');
  const check = document.getElementById('modalCheckPost');

  // Dark and Light mode
  const btnSwitch = containerHome.querySelector('#switch');
  const boxFather = containerHome.querySelector('#publicado');



  //  Clear Posts
  function clearBoxPosts() {
    while (divPublicado.firstChild) {
      divPublicado.firstChild.remove();
    }
  }

  //  Function - Filters
  function filterPost(filter) {
    switch (filter) {
      case 'all':
        clearBoxPosts();
        reedPublications({});
        break;

      case 'my':
        clearBoxPosts();
        reedPublications({ my: '' });
        break;

      case 'name':
        clearBoxPosts();
        reedPublications({ name: `${SearchName.value}` });
        break;
    }
  }

  // Events for Filters
  btnAllPost.addEventListener('click', () => {
    filterPost('all');
  });
  btnMyPost.addEventListener('click', () => {
    filterPost('my');
  });
  SearchName.addEventListener('keyup', () => {
    clearBoxPosts();
    filterPost('name');
  });

  /* *************** Notificaciones de 'post publicated' *************** */

  const cleanModal = () => {
    if (check) {
      document
        .getElementById('modalCheckPost')
        .classList.replace('AlertmodalCheckPost', 'modalCheckPost');
    } if (alertNoMoreImgs) {
      alertNoMoreImgs.classList.add('hide');
    }
  };

  /* ***** Botón para mostrar la caja de agregar publicación ***** */

  containerHome.querySelector('.NewPost').addEventListener('click', (e) => {
    e.preventDefault();
    document
      .getElementById('boxPublications')
      .classList.replace('NoneboxPublications', 'boxPublications');
  });

  // Dark and Light mode function
  btnSwitch.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
  });

  // Pre-view image in new post
  function previewPost(file) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', function () {
        imgPreview.style.display = 'block';
        const fileName = `${file.name}`.replace(/\s+/g, '').split('.')[0].replace(/[.*+\-?^${}()|[\]\\]/g, '');
        console.log('🚀 ~ file: home.js ~ line 309 ~ fileName', fileName);

        imgPreview.innerHTML += `
        <div id='${fileName}' data-ref='${fileName}' class='boxFlexbtnX'>
          <button title='Delete image' id='btnDeleteImg' class='btnDeleteImg'>X</button>
          <img src='${this.result}'/>
        </div>
        `;

        // Div's images
        const elementsImages = imgPreview.querySelectorAll('[data-ref]');

        elementsImages.forEach((element) => {
          element.querySelector('#btnDeleteImg').addEventListener('click', (e) => {
            e.preventDefault();
            cleanModal();
            //  const divDelete = e.target.dataset.ref;
            const divDelete = e.target.parentNode.dataset.ref;
            const removeImg = imgPreview.querySelector(`#${divDelete}`);
            //  Delete div publication
            removeImg.remove();
            deleteOneImage();
          });
        });
      });
    }
  }

  // Add images in new post
  let arr = [];
  let files = [];
  let countFiles = 0;
  const divCamera = containerHome.querySelector('.inputFilePost');
  divCamera.addEventListener('change', (e) => {
    countFiles = imgPreview.childElementCount + 1;
    console.log('countFiles', countFiles);

    if (countFiles > 2) {
      alertNoMoreImgs.classList.remove('hide');
    }

    if (countFiles == 1) {
      cleanModal();
      files = Object.values(e.target.files);
      //  console.log('1 archivo', files);
      previewPost(files[0]);
      arr.push(files[0]);
    }

    if (countFiles == 2) {
      cleanModal();
      files = Object.values(e.target.files);
      console.log('2 archivos arr', files);
      previewPost(files[0]);
      arr.push(files[0]);
      console.log('total files', arr);
      files = arr;
    }
  });

  console.log('files.......', files);

  //  Función para eliminar el contenido del input al momento de cancelar
  const deleteContentInput = () => {
    containerHome.querySelector('#texta2').value = '';
  };

  const deleteImage = () => {
    files = [];
    arr = [];
    countFiles = 0;
    cleanModal();
    while (imgPreview.firstChild) {
      imgPreview.removeChild(imgPreview.firstChild);
    }
  };

  const deleteOneImage = () => {
    files = [];
    arr = [];
    countFiles = 0;
  };

  /* ***** Botón para ocultar la caja de agregar publicación ***** */
  containerHome.querySelector('.btnCancel').addEventListener('click', (e) => {
    e.preventDefault();
    document
      .getElementById('boxPublications')
      .classList.replace('boxPublications', 'NoneboxPublications');
    //  eslint-disable-next-line no-unused-expressions
    containerHome.querySelector('#texta2').value;
    deleteContentInput();
    deleteImage();
    cleanModal();
  });

  /* *************** evento de añadir publicación con save *************** */

  containerHome.querySelector('#btnSave').addEventListener('click', (e) => {
    if (countFiles == 0) {
      console.log('0 imagen');
      files = [];
    }
    e.preventDefault();
    const publication = containerHome.querySelector('#texta2').value;
    containerHome.querySelector('#texta2').value = containerHome.querySelector('#texta2').defaultValue;

    while (divPublicado.firstChild) {
      divPublicado.removeChild(divPublicado.firstChild);
    }

    // Clean images in new post
    while (imgPreview.firstChild) {
      imgPreview.removeChild(imgPreview.firstChild);
    }

    if (publication !== '') {
      document
        .getElementById('modalCheckPost')
        .classList.replace('modalCheckPost', 'AlertmodalCheckPost');

      // Saved images in storage
      console.log('files:', files);
      if (files.length == 0) {
        // Add publication in firebase store
        console.log('agregando post con 0 imagen');
        cleanModal();
        addPublication(publication, ['']);
        reedPublications({});
      }

      if (files.length == 1) {
        console.log('caso 1');
        const p1 = urlStorage(files[0]);
        cleanModal();
        Promise.all([p1])
          .then((values) => {
            addPublication(publication, values);
            reedPublications({});
            files = [];
          })
          .catch(console.log);
      }

      if (files.length == 2) {
        console.log('caso 2');
        const p1 = urlStorage(files[0]);
        const p2 = urlStorage(files[1]);
        cleanModal();
        Promise.all([p1, p2])
          .then((values) => {
            console.log('caso 2222222222222222', values);
            addPublication(publication, values);
            reedPublications({});
            files = [];
          })
          .catch(console.log);
      }
    }
    if (publication === '') {
      cleanModal();
    }
  });

  /* *************** Agregars información sincronizada del usuario al perfil *************** */

  const infoUser = (info) => {
    containerHome.querySelector(
      '.UserName',
    ).innerHTML += `<br><h1>${info.name}</h1><br>
    <div class='linea2'>&nbsp;</div>`;
    containerHome.querySelector('.Email').innerHTML += `<h3>Email:</h3>
    <p>${info.email}</p>`;
    containerHome.querySelector('.userNamePublication').innerHTML += `
    <p>${info.name}</p>`;

    //  photo
    containerHome.querySelector('.Avatar-img').src = `${info.photo}`;
    //  photo
    containerHome.querySelector('.Avatar-img-Post').src = `${info.photo}`;
    //  Bio
    containerHome.querySelector('.bioText').textContent = `${info.bio}`;
    //  Country
    containerHome.querySelector('.countryText').textContent = `${
      info.country.split(':')[1]
    }`;
    //  Country title
    containerHome.querySelector('.countryText').title = `${
      info.country.split(':')[1]
    }`;
    //  Country flag
    containerHome.querySelector('.countryImg').innerHTML += `
    <img
    title='${info.country.split(':')[1]}'
    src='https://flagcdn.com/40x30/${info.country.split(':')[0]}.png'
    srcset='httpscountrycdn.com/80x60/${info.country.split(':')[0]}.png 2x,
      https://flagcdn.com/120x90/${info.country.split(':')[0]}.png 3x'
    alt='${info.country.split(':')[1]}'>
  `;
    //  Interests
    //  eslint-disable-next-line no-plusplus
    for (let index = 0; index < 3; index++) {
      containerHome.querySelector(`#Interests-${index}`).src = info.interests[index];
      console.log(index);
    }
  };
  //  devuelve el uid del usuario que se encuentra en sesionStorage
  const uid = () => {
    const uidSS = sessionStorage.getItem('key');
    return uidSS;
  };
  readUser(uid())
    //  eslint-disable-next-line no-sequences
    .then((value) => {
      infoUser(value);
      reedPublications(value);
    })
    .catch((error) => console.log(error));

  /* ***** actualizacion tiempo real de publications ***** */

  function realOnSnapshot(documentFirebase) {
    const idPublication = documentFirebase.id;

    llenarPublications(documentFirebase, idPublication);
  }

  /* ***** muestra publicaciones realizadas ***** */

  async function llenarPublications(documentFirebase, idPublication) {
    const userOfPublication = await getDoc(
      doc(db, 'users', documentFirebase.data().author),
    );
    if (userOfPublication.exists()) {
      const nameUser = userOfPublication.data().name;
      const publicationText = documentFirebase.data().publication;

      /* ***** Constantes de fecha y hora por publicación ***** */
      const publicationDate = documentFirebase
        .data()
        .dateCreated.toDate()
        .toDateString();
      const publicationTime = documentFirebase
        .data()
        .dateCreated.toDate()
        .toLocaleTimeString('en-US');

      console.log('date: ', publicationDate);

      /* ***** Only Delete or Edit Post for UserCurrent ***** */
      const authorPublication = userOfPublication.data().uid;
      const userCurrent = sessionStorage.getItem('key');
      const myPost = authorPublication === userCurrent;
      const photo = userOfPublication.data().photo;
      const urls = documentFirebase.data().urlsImages;

      console.log('urls', documentFirebase.data());

      /* ***** Agrega una nueva publicación por usuario de primera ***** */

      divPublicado.prepend(
        publicationComponent(
          nameUser,
          myPost,
          idPublication,
          publicationText,
          photo,
          publicationDate,
          publicationTime,
          urls,
        ),
      );

      /* ***** Constantes para editar publicación ***** */
      const textPublication = document.querySelector('textArea[data-texto]');
      const editsPublication = document.querySelector('img[data-edit]');
      const savePublication = document.querySelector('button[data-save]');
      const cancelPublication = document.querySelector('button[data-cancel]');
      const btnsEditPostBox = document.querySelector('.btnsEditContainer');
      const btnsDeleteImgs = document.querySelector('#btnDeteleImgEdit');
      const btnCameraEdit = document.querySelector('#AddPhotoPostEdit');

      /* ***** Block btns of save and cancel edit publication ***** */
      editsPublication.addEventListener('click', (e) => {
        e.preventDefault();
        if (myPost && urls[0] !== '') {
          btnCameraEdit.classList.remove('hide');
          btnsDeleteImgs.classList.remove('hide');
          btnsEditPostBox.classList.remove('hide');
          textPublication.disabled = false;
          textPublication.select();
        }
        if (myPost && urls[0] == '') {
          btnCameraEdit.classList.remove('hide');
          btnsDeleteImgs.classList.add('hide');
          btnsEditPostBox.classList.remove('hide');
          textPublication.disabled = false;
          textPublication.select();
        }
      });
      //  console.log(editsPublication);

      /* ***** save edit publication ***** */
      savePublication.addEventListener('click', (e) => {
        e.preventDefault();
        //  editPublication(idPublication, publicationText);
        editPublication(idPublication, textPublication.value);
        textPublication.disabled = true;
        btnCameraEdit.classList.add('hide');
        btnsEditPostBox.classList.add('hide');
        btnsDeleteImgs.classList.add('hide');
      });

      /* ***** cancel edit publication ***** */
      cancelPublication.addEventListener('click', (e) => {
        //  e.preventDefault();
        //  editPublication(idPublication, publicationText);
        textPublication.disabled = true;
        btnCameraEdit.classList.add('hide');
        btnsEditPostBox.classList.add('hide');
        btnsDeleteImgs.classList.add('hide');

        const cancelEdit = e.target.dataset.cancel;

        //  eslint-disable-next-line eqeqeq
        if (cancelEdit == idPublication) {
          console.log('e.target', cancelEdit);
          readAPost(idPublication, textPublication);
        }
      });

      /* ***** delete publication ***** */
      //  import modal
      const cerrar = document.getElementById('close');
      const modalC = document.getElementById('modal-container');
      const btnModalConfirmDelete = document.getElementById('btn-modal-yes');
      const btnModalCancel = document.getElementById('btn-modal-no');

      //  delete
      let deleted = '';
      divPublicado
        .querySelector('.btnDelete')
        .addEventListener('click', (event) => {
          deleted = event.target.dataset.ref;
          //  INIT - Modal for Vericate Delete Publication
          let stateModal = false;
          //  view modal
          modalC.style.opacity = '1';
          modalC.style.visibility = 'visible';
          //  close modal
          cerrar.addEventListener('click', () => {
            modalC.style.opacity = '0';
            modalC.style.visibility = 'hidden';
            deleted = '';
            return stateModal;
          });
          //  cancel modal
          btnModalCancel.addEventListener('click', () => {
            modalC.style.opacity = '0';
            modalC.style.visibility = 'hidden';
            deleted = '';
            return stateModal;
          });
          //  confirm delete - YES
          btnModalConfirmDelete.addEventListener('click', () => {
            modalC.style.opacity = '0';
            modalC.style.visibility = 'hidden';
            stateModal = true;
            //  Delete publication for Firebase
            if (deleted !== '') {
              let removeDiv = divPublicado.querySelector(`#${deleted}`);
              //  Delete div publication
              deletePublication(deleted);
              removeDiv.remove();
              deleted = '';
              removeDiv = '';
            }
            return stateModal;
          });
          //  END - Modal for Vericate Delete Publication
        });
    } else {
      console.log('No such document!');
    }
    return userOfPublication;
  }

  /* ***** leer datos desde Firebase de la colección Publicaciones y Usuarios ***** */

  async function reedPublications(filterMyPost) {
    let querySnapshotPublications = await getDocs(
      collection(db, 'publications'),
    );

    // Validate View Search
    const userSearchSession = JSON.parse(sessionStorage.getItem('userSearch'));
    let nameSearch = userSearchSession.name;
    if (nameSearch !== '') {
      const q = query(
        collection(db, 'users'),
        where('name', '>=', nameSearch),
        where('name', '<=', `${nameSearch}\uf8ff`),
      );

      const querySnapshot = await getDocs(q);
      let uidUserFilter;
      querySnapshot.forEach((element) => {
        uidUserFilter = element.data().uid;
      });
      const qa = query(
        collection(db, 'publications'),
        where('author', '==', uidUserFilter),
      );
      querySnapshotPublications = await getDocs(qa);
    }
    const objName = { name: '' };
    sessionStorage.setItem('userSearch', (JSON.stringify(objName)));

    if (Object.keys(filterMyPost) == 'my') {
      const q = query(
        collection(db, 'publications'),
        where('author', '==', sessionStorage.getItem('key')),
      );
      querySnapshotPublications = await getDocs(q);
    }

    if (Object.keys(filterMyPost) == 'name') {
      //  console.log('filter user: ', filterMyPost.name);
      const q = query(
        collection(db, 'users'),
        where('name', '>=', filterMyPost.name.capitalize()),
        where('name', '<=', `${filterMyPost.name.capitalize()}\uf8ff`),
      );

      // console.log('q', q);
      const querySnapshot = await getDocs(q);
      let uidUserFilter;
      querySnapshot.forEach((element) => {
        uidUserFilter = element.data().uid;
      });

      const qa = query(
        collection(db, 'publications'),
        where('author', '==', uidUserFilter),
      );

      querySnapshotPublications = await getDocs(qa);
    }

    querySnapshotPublications.forEach((documentFirebase) => {
      clearBoxPosts();
      realOnSnapshot(documentFirebase);
    });

    return querySnapshotPublications;
  }
  return containerHome;
};

export default Home;
