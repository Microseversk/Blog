import {LoginModel} from "../Model/LoginModel.js";
import {LoginView} from "../View/LoginView.js";
import {setToken, validateResultHasErrors} from "../Functions/functions.js";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR,MAIN_PAGE} from "../Constants/dimens.js";

class LoginController {
    model
    view

    constructor() {
        this.model = new LoginModel()
        this.view = new LoginView()
    }

    async login() {
        this.view.clearErrors()
        const loginData = this.view.getLoginData()
        const validateResult = this.model.validateLoginData(loginData)
        if (validateResultHasErrors(validateResult)) {
            this.view.showErrors(validateResult)
        } else {
            const response = await this.model.sendLoginData(loginData)
            if (response === BAD_REQUEST) {
                this.view.showServerError()
            }
            else if(response === INTERNAL_SERVER_ERROR){
                console.log('InternalServerError')
                }
             else {
                const token = response.token
                setToken(token)
                window.location.href = MAIN_PAGE
            }
        }


    }
}

export {LoginController}