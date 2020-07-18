module.exports = {
    "url": "/hello",
    "headers":{
        "Content-Type": "application/json"
    },
    "parametrization_test": {
        "smoke_test": {
            vus: 1,  // 1 user looping for 1 minute
            duration: '1m',
            thresholds: {
              'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
            }
        },
        "load_test": {
            stages: [
                { duration: "5m", target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
                { duration: "10m", target: 100 }, // stay at 100 users for 10 minutes
                { duration: "5m", target: 0 }, // ramp-down to 0 users
              ],
              thresholds: {
                'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
                'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
              }
        }
    }
}