import { URL_BACK_AUTHENTICATE, URL_BACK_ROADHISTORY, URL_BACK_REGISTER, URL_BACK_ROADREADHOME } from '../../constants/urls/urlBackEnd';
import apiBackEnd from './api.Backend';
import { URL_BACK_CONTACT, URL_BACK_SUPPUSER } from './../../constants/urls/urlBackEnd';

export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function register(values) {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function contact(values) {
    return apiBackEnd.post(URL_BACK_CONTACT, values);
}

export function suppUser(values) {
    return apiBackEnd.post(URL_BACK_SUPPUSER)
}
export function ReadRoadHome(values) {
    return apiBackEnd.get(URL_BACK_ROADREADHOME, values);
}

export function RoadHistory(values) {
    return apiBackEnd.get(URL_BACK_ROADHISTORY, values);
}
