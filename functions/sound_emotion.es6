import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export default (path, name) => {
  //Call analysis
  const formData = new FormData();
  formData.append('file', fs.createReadStream(path), name)
  return axios.post('https://api.aipcloud.io/analyze/sound/emotion',
    formData, {
      headers: formData.getHeaders(),
      auth: {
        username: 'test1@jdc.fr',
        password: 'dfgdfg1.'
      }
    })
}
