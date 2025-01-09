import {AUTHOR} from "../Constants/ApiUrls.js";
import {compareAuthors, getPageHtml, normalizeDate} from "../Functions/functions.js";
import {
    AUTHOR_TEMPLATE,
    MALE, MAN, MEDAL_BRONZE, MEDAL_GOLD, MEDAL_SILVER,
    WOMAN,
} from "../Constants/dimens.js";

class AuthorModel {
    async getAuthors() {
        let authorList = []
        try {
            const response = await fetch(AUTHOR, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            let data = (await response.json()).sort(compareAuthors)
            data.forEach((author, index) => {
                const newAuthor = {
                birthDate: normalizeDate(author.birthDate),
                created: 'Cоздан: ' + normalizeDate(author.created),
                posts: 'Постов: ' + author.posts,
                likes: 'Лайков: ' + author.likes,
                gender: author.gender,
                fullName: author.fullName,
                position: index + 1,
                image: (author.gender === MALE) ? MAN : WOMAN,
                medal: [MEDAL_GOLD, MEDAL_SILVER, MEDAL_BRONZE][index] || ""
                } 

                authorList.push(newAuthor)
            })
            return authorList.sort((a,b) => a.fullName.localeCompare(b.fullName, 'en-US'))

        } catch (error) {
            console.error(error)
        }
    }

    async getAuthorTemplate() {
        return await getPageHtml(AUTHOR_TEMPLATE)
    }
}

export {AuthorModel}