module.exports = {
    "url": "/user",
    "headers":{
        "Content-Type": "application/json"
    },
    "body": {
        "user": "juan",
        "pwd": "pwd"
    },
    "parametrization_test": {
        "smoke_test": {
            vus: 1,  // 1 user looping for 1 minute
            duration: '1m',
            thresholds: {
              'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
            },
            tags: { 
                stack: 'bb',   // variable de entorno
                layer: 'pb',   // variable de entorno
                env: 'dev',    // variable de entorno
                service: 'authentication',
                type_test: 'smoke_test' 
            },
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
              },
              tags: { 
                  stack: 'bb',     // variable de entorno
                  layer: 'pb',     // variable de entorno
                  env: 'dev',      // variable de entorno
                  service: 'authentication',
                  type_test: 'load_test' 
              },
        },
        "stress_test":{
            stages: [
                { duration: '2m', target: 100 }, // below normal load
                { duration: '5m', target: 100 },
                { duration: '2m', target: 200 }, // normal load
                { duration: '5m', target: 200 },
                { duration: '2m', target: 300 }, // around the breaking point
                { duration: '5m', target: 300 },
                { duration: '2m', target: 400 }, // beyond the breaking point
                { duration: '5m', target: 400 },
                { duration: '10m', target: 0 }, // scale down. Recovery stage.
              ],
            tags: { 
                stack: 'bb',
                layer: 'pb',
                env: 'dev',
                service: 'authentication',
                type_test: 'stress_test' 
            },
        }
    }
}