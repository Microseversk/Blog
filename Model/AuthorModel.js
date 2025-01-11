import { AUTHOR } from '../Constants/ApiUrls.js';
import { getPageHtml, normalizeDate, sortAuthorsByRelevance } from '../Functions/functions.js';
import { AUTHOR_TEMPLATE_PATH, MALE, MAN, MEDAL_BRONZE, MEDAL_GOLD, MEDAL_SILVER, WOMAN } from '../Constants/dimens.js';

class AuthorModel {
  async getAuthors() {
    let authorList = [];
    try {
      const response = await fetch(AUTHOR, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      let data = (await response.json()).sort(sortAuthorsByRelevance);
      data.forEach((author, index) => {
        const newAuthor = {
          birthDate: normalizeDate(author.birthDate),
          created: 'Cоздан: ' + normalizeDate(author.created),
          posts: 'Постов: ' + author.posts,
          likes: 'Лайков: ' + author.likes,
          gender: author.gender,
          fullName: author.fullName,
          position: index + 1,
          image: author.gender === MALE ? MAN : WOMAN,
          medal: [MEDAL_GOLD, MEDAL_SILVER, MEDAL_BRONZE][index] || ''
        };

        authorList.push(newAuthor);
      });
      return authorList;
    } catch (error) {
      console.error(error);
    }
  }

  async getAuthorTemplate() {
    return await getPageHtml(AUTHOR_TEMPLATE_PATH);
  }
}

export { AuthorModel };
