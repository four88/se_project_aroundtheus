export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
      id: this._id,
      avatar: this._avatar.style.backgroundImage,
    };
    return this._userData;
  }

  setUserInfo(name, job, avatar, id) {
    this._id = id;
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
    this._avatar.src = avatar
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
