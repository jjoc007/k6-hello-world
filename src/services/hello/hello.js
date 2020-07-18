import http from 'k6/http';
import * as general_data from '../../../resources/services/general.js'
import * as hello_data from '../../../resources/services/hello.js'

export let execute = (data) => {

    hello_data.headers['Authorization'] = data.authResponse.token
    return http.get(`${general_data.base_url}${hello_data.url}`, hello_data.headers)
}
