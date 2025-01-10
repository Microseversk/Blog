import { CreatePostModel } from '../Model/CreatePostModel.js';
import { CreatePostView } from '../View/CreatePostView.js';
import { MAIN_PAGE } from '../Constants/dimens.js';
import {
  addAddressSelect,
  checkToken,
  getPageHtml,
  getToken,
  smoothScrollToBottom,
  validateResultHasErrors
} from '../Functions/functions.js';

class CreatePostController {
  #model;
  #view;
  #currentQuery;
  #currentAddressLevel;
  #addressInfo;

  constructor() {
    this.#model = new CreatePostModel();
    this.#view = new CreatePostView();
    this.#currentQuery = new URLSearchParams(window.location.search);
    this.#currentAddressLevel = 1;
    this.#addressInfo = [
      {
        id: 0,
        guid: '',
        text: 'Страна'
      }
    ];
  }

  async init() {
    await checkToken(getToken(), true);
    const communities = await this.#model.getAdminUsersCommunities();
    const tags = await this.#model.getTags();
    this.#view.renderTags(tags);
    await this.#view.renderCommunities(communities);
    this.#view.renderCommunityValue(this.#model.getCommunityValueFromQuery(this.#currentQuery));

    await addAddressSelect(0, this.#currentAddressLevel, this.#addressInfo);
  }

  async createPost() {
    this.#view.clearErrors();
    let data = this.#view.getCreatePostData();

    if (this.#addressInfo.length > 1 && this.#addressInfo[1].guid !== '') {
      let latestAddressIndex = this.#addressInfo.length - 1;
      while (this.#addressInfo[latestAddressIndex].guid === '') {
        latestAddressIndex -= 1;
      }
      data.addressId = this.#addressInfo[latestAddressIndex].guid;
    }

    const validateResult = this.#model.validateCreatePostData(data);

    if (validateResultHasErrors(validateResult)) {
      this.#view.showErrors(validateResult);
      return;
    }

    await this.#model.sendNewPostData(data);
    window.location.href = MAIN_PAGE;
  }
}

export { CreatePostController };
