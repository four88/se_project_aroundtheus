import './index.css';
import logoSrc from '../images/logo.png';

const logo = document.querySelector('#image-logo');
logo.src = logoSrc;


//  import class
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js'
import {
  editBtn,
  addBtn,
  editForm,
  inputName,
  inputJob,
  addForm,
  avatarForm,
  updateAvatarButton,
  config,
  profileImage,
  profileJob,
  profileName
} from '../utils/constants.js';


// // declare class as obj here
//  formValiditor Class
const editValiditor = new FormValidator(editForm, config);
const addValiditor = new FormValidator(addForm, config);
const changeProfileAvatarValiditor = new FormValidator(avatarForm, config);

// api declare
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b8628092-ca99-4978-bdb3-720edea9284d",
    "Content-Type": "application/json",
  },
});
// decalre userInfo class
const userInfo = new UserInfo(
  profileName,
  profileJob,
  profileImage
)


// show image popup
const imagePopup = new PopupWithImage(".pic");
imagePopup.setEventListeners()

// for loading button "Saving..."
function onLoading(isLoading, form, text) {
  const submitButton = form.querySelector(".popup__button_save");
  if (isLoading) {
    submitButton.textContent = "Saving...";
  } else {
    submitButton.textContent = text;
  }
}


// Delete confirmation popup
const confirmDeletePopup = new PopupWithForm(".delete");
confirmDeletePopup.setEventListeners();

// Render new card
const renderCard = (cardItem) => {
  const renderNewCard = new Card(
    {
      cardItem,
      handleCardClick: ({ title, link }) => {
        imagePopup.open(title, link);
      },
      handleDeleteClick: (card) => {
        confirmDeletePopup.open();
        confirmDeletePopup.setNewSubmitHandler(() => {
          api
            .deleteCard(card.id())
            .then(() => {
              card.remove();
              confirmDeletePopup.close()
            })
            .catch((err) => {
              console.log(`${err}`)
            })
        });
      },
      handleLikeClick: (LikeButtonIsActive, cardId, likeCounter, e) => {
        api.updateLike(LikeButtonIsActive, cardId).then((result) => {
          likeCounter.textContent = result.likes.length;
        }).then(() => {
          renderNewCard.like(e)
        }).catch((err) => {
          console.log(`${err}`);
        })
      },
    },
    ".element-template",
    userInfo.getUserInfo().id
  );
  return renderNewCard.generateCard();
};

// fetch user and card data from server 
// I have some question my profile picture is not show on the page 
// i try userInfo.setUserInfo and userInfo.updateAvatar both are working when with out api
// but when have api is not working. I don't know the reason why this happend. 
const cardList = new Section(
  {
    renderer: (cardItem) => {
      cardList.addItem(renderCard(cardItem));
    },
  },
  ".elements"
);

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(
      {
        name: res.name,
        about: res.about,
        userId: res._id
      }
    );
    userInfo.setAvatar(res.avatar)
  })
  .catch((err) => {
    console.log(`${err}`)
  })
  .then(() => {
    api.getInitialCards().then((res) => {
      cardList.renderItems(res);
    }).catch((err) => {
      console.log(`${err}`);
    });
  });



//fucntion for add new card to server and render on the page
function addNewCards(inputValues) {
  const newCardTitle = inputValues["inputTitle"];
  const newCardURL = inputValues["inputLink"];

  // New place card object
  const newCardObject = {
    name: newCardTitle,
    link: newCardURL,
  };

  // Add new card to the server
  api
    .addNewCard(newCardObject.name, newCardObject.link)
    .then((newCardData) => {
      cardList.renderItem(newCardData);
      addPopupForm.close();

    })
    .finally(() => {
      onLoading(false, addForm, "Create");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

// add card popup
const addPopupForm = new PopupWithForm(
  ".add",
  (inputValues) => {
    addNewCards(inputValues);
    onLoading(true, addForm, "Create")
  }
);

addPopupForm.setEventListeners();
//open Add-place modal
addBtn.addEventListener("click", () => {
  addPopupForm.open();
  addValiditor.toggleButtonState()
});


// chage user info popup
const editPopupForm = new PopupWithForm(
  ".edit",
  (inputValues) => {
    // update user information
    console.log(inputValues)
    api
      .updateUserInfo(inputValues.inputName, inputValues.inputCareer)
      .then((res) => {
        console.log(res)
        userInfo.setUserInfo({
          name: res.name,
          about: res.about,
          userId: res._id
        });

        editPopupForm.close();
      }).finally(() => {
        onLoading(false, editForm, "Save");
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    onLoading(true, editForm, "Save");
  }
);

editPopupForm.setEventListeners();

editBtn.addEventListener("click", () => {
  editPopupForm.open();
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
});

// change profile avatar popup
const changeProfileAvatar = new PopupWithForm(
  ".avatar",
  (inputValues) => {
    console.log(inputValues.avatar)
    api
      .updateAvatar(inputValues.avatar)
      .then((res) => {
        console.log(res)
        userInfo.setAvatar(res.avatar)
        changeProfileAvatar.close();
      }).finally(() => {
        onLoading(false, avatarForm, "Save");
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    onLoading(true, avatarForm, "Save");
  }
);

updateAvatarButton.addEventListener("click", () => {
  changeProfileAvatar.open();
  changeProfileAvatarValiditor.toggleButtonState();
});

changeProfileAvatar.setEventListeners();
editValiditor.enableValidation();
addValiditor.enableValidation();
changeProfileAvatarValiditor.enableValidation();
