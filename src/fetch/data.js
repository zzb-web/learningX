import axios from 'axios';
async function Get(api){
  var data;
  var url = api+'?t='+(new Date()).getTime().toString();
  await axios.get(url)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = null;
    });
  return data;
}
function Post(url, param){
  var url = url+'?t='+(new Date()).getTime().toString();
  axios.post(url, param)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}
export {Get, Post}