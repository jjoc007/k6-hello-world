import * as auth from './authentication.js'
import * as parametrization_data from '../../../resources/services/authentication.js'
import { check, group, sleep, fail } from 'k6';

export let options = parametrization_data.parametrization_test[__ENV.TYPE_TEST]

export default () => {
  let res = auth.execute()
  check(res, { 'status was 200': r => r.status == 200 })
  sleep(1)
}