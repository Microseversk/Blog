import {ADMIN, COMMUNITY, SUB, SUBSCRIBE, UN_SUBSCRIBE} from "../Constants/dimens.js";
import {checkToken, getToken} from "../Functions/functions.js";

class CommunitiesView {


    async renderCommunities(template, communities, callback) {
        let communitiesList = document.querySelector('#communities-list')
        communities.forEach(community => {
            let communityListElement = document.createElement('div')
            communityListElement.innerHTML = template.trim()

            communityListElement.querySelector('#community-template-name').innerText = community.name
            communityListElement.querySelector('#community-template-name').style.cursor = 'pointer'
            communityListElement.querySelector('#community-template-name').addEventListener('click', () => {
                window.location.pathname = COMMUNITY + community.id
            })

            let btn = communityListElement.querySelector('#community-template-btn')
            if (getToken() === null){
                btn.classList.add('d-none')
            }
            switch (community.userRole) {
                case ADMIN:
                    btn.classList.replace('d-block', 'd-none')
                    break
                case SUB:
                    btn.innerText = 'Отписаться'
                    btn.classList.add('btn-danger')
                    break
                default:
                    btn.innerText = 'Подписаться'
                    btn.classList.add('btn-primary')
                    break
            }
            btn.addEventListener('click', async () => {
                if (btn.innerText === 'Подписаться') {
                    if (await callback(SUBSCRIBE, community.id)) {
                        btn.innerText = 'Отписаться'
                        btn.classList.replace('btn-primary', 'btn-danger')
                    }
                } else {
                    if (await callback(UN_SUBSCRIBE, community.id)) {
                        btn.innerText = 'Подписаться'
                        btn.classList.replace('btn-danger', 'btn-primary')
                    }
                }
            })
            communitiesList.appendChild(communityListElement)
        })


    }
}


export {CommunitiesView}