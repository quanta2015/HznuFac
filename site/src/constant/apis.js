var mode = process.env.NODE_ENV
let API_SERVER = 'http://localhost'



if (mode === 'development') {
  API_SERVER = 'http://121.43.120.234'
  // API_SERVER = 'http://localhost'
}

if (mode === 'production') {
  API_SERVER = 'http://121.43.120.234'
}

export { API_SERVER }