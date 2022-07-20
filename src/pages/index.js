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
const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
  avatarSelector: profileImage
})


// show image popup
const imagePopup = new PopupWithImage(".pic");
imagePopup.setEventListeners()

// for loading button "Saving..."
function onLoading(isLoading, form) {
  const submitButton = form.querySelector(".popup__button_save");
  if (isLoading) {
    submitButton.textContent = "Saving...";
  } else {
    submitButton.textContent = submitButton.textContent;
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
        });
      },
      handleLikeClick: (LikeButtonIsActive, cardId, likeCounter) => {
        api.updateLike(LikeButtonIsActive, cardId).then((result) => {
          likeCounter.textContent = result.likes.length;
        });
      },
    },
    ".element-template",
    userInfo.getUserInfo().id
  );
  return renderNewCard.generateCard();
};

// fetch user and card data from server 
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
  })
  .then(() => {
    api.getInitialCards().then((res) => {
      const cardList = new Section(
        {
          items: res,
          renderer: (cardItem) => {
            cardList.addItem(renderCard(cardItem));
          },
        },
        ".elements"
      );
      cardList.renderItem();
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
      document.querySelector(".elements").prepend(renderCard(newCardData));
      addPopupForm.close();

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
    onLoading(true, addForm)
  }
);

addPopupForm.setEventListeners();
//open Add-place modal
addBtn.addEventListener("click", () => {
  addPopupForm.open();
  onLoading(false, addForm);
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
        userInfo.setUserInfo(res.name, res.about, res.avatar);

        editPopupForm.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    onLoading(true, editForm);
  }
);

editPopupForm.setEventListeners();

editBtn.addEventListener("click", () => {
  editPopupForm.open();
  onLoading(false, editForm);
  const { name, job } = profileData.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
});

// change profile avatar popup
const changeProfileAvatar = new PopupWithForm(
  ".avatar",
  (inputValues) => {
    console.log(inputValues)
    api
      .updateAvatar(inputValues.avatarLink)
      .then((res) => {
        userInfo.setAvatar(res.avatar)
        changeProfileAvatar.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });

    onLoading(true, avatarForm);
  }
);

updateAvatarButton.addEventListener("click", () => {
  changeProfileAvatar.open();
  onLoading(false, avatarForm);
});

changeProfileAvatar.setEventListeners();
editValiditor.enableValidation();
addValiditor.enableValidation();
changeProfileAvatarValiditor.enableValidation();
