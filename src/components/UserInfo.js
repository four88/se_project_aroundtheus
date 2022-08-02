export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._name = document.querySelector(nameSelector).textContent;
    this._job = document.querySelector(jobSelector).textContent;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
      id: this._userId
    };
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  setUserInfo({ name, about, userId }) {
    this._name = name;
    this._job = about;
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._userId = userId;
  }
}
