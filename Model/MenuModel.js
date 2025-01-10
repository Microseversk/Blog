import { POST, TAG } from '../Constants/ApiUrls.js';
import { getPageHtml, getToken } from '../Functions/functions.js';
import { CURRENT_PAGE_SIZE, POST_TEMPLATE } from '../Constants/dimens.js';

class MenuModel {
  currentPageSize = CURRENT_PAGE_SIZE;
  currentPage = 1;
  currentPageCount;

  async getTags() {
    try {
      const response = await fetch(TAG);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  getFiltersValuesFromQuery(query) {
    return {
      tags: query.getAll('tags'),
      author: query.get('author'),
      min: query.get('min'),
      max: query.get('max'),
      sorting: query.get('sorting'),
      onlyMyCommunities: query.get('onlyMyCommunities') === 'true',
      size: query.get('size')
    };
  }
  async getPosts(query) {
    try {
      let url = POST;
      if (undefined !== query) {
        url += '?' + query;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      });
      const data = await response.json();

      this.currentPageCount = data.pagination.count;
      this.currentPage = data.pagination.current;
      this.currentPageSize = data.pagination.size;

      return data.posts;
    } catch (error) {
      console.error(error);
    }
  }

  async getPostTemplate() {
    return await getPageHtml(POST_TEMPLATE);
  }
}

export { MenuModel };
