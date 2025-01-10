import {RegistrationModel} from "../Model/RegistrationModel.js";
import {RegistrationView} from "../View/RegistrationView.js";
import {setToken, validateResultHasErrors} from "../Functions/functions.js";
import {BAD_REQUEST,MAIN_PAGE} from "../Constants/dimens.js";

class RegistrationController {
    model
    view

    constructor() {
        this.model = new RegistrationModel()
        this.view = new RegistrationView()
    }

    async register() {
        this.view.clearErrors()
        const registerData = this.view.getRegistrationData()
        const validateResult = this.model.validateRegisterData(registerData)
        if (validateResultHasErrors(validateResult)) {
            this.view.showErrors(validateResult)
        } else {
            const response = await this.model.sendRegistrationData(registerData)
            if (response === BAD_REQUEST) {
                this.view.showServerError()
            } else {
                const token = response.token
                setToken(token)
                window.location.href = MAIN_PAGE
            }
        }
    }
}

export {RegistrationController}