import * as auth from '../authentication/authentication.js'
import * as parametrization_data from '../../../resources/services/hello.js'
import * as hello from './hello.js'
import { check, group, sleep, fail } from 'k6';

export let options = parametrization_data.parametrization_test[__ENV.TYPE_TEST]

export function setup() {
  console.log("Se ejecuto Setup")
  return {
    authResponse: JSON.parse(auth.execute().body)
  }
}

export default (data) => {
  let res = hello.execute(data)
  check(res, { 'status was 200': r => r.status == 200 })
  sleep(1);
}

