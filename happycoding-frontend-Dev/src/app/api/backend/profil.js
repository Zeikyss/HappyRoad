import apiBackEnd from './api.Backend';
import { URL_BACK_PROFILE_UPDATE_PASSWORD, URL_BACK_PROFILE_UPDATE_READ, URL_BACK_PROFILE_UPDATE_WRITE, URL_BACK_PROFILE_VIEW } from '../../constants/urls/urlBackEnd';

export function profilView(config) {
    return apiBackEnd.get(URL_BACK_PROFILE_VIEW, config)
}

export function profilUpdateRead(config) {
    return apiBackEnd.get(URL_BACK_PROFILE_UPDATE_READ, config)
}

export function profilUpdateWrite(values, config) {
    return apiBackEnd.patch(URL_BACK_PROFILE_UPDATE_WRITE, values, config)
}

export function profilUpdatePassword(values, config) {
    return apiBackEnd.patch(URL_BACK_PROFILE_UPDATE_PASSWORD, values, config)
}