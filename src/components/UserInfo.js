export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      id: this._userId
    };
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  setUserInfo({ name, about, userId }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._userId = userId;
  }
}
