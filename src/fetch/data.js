import axios from 'axios';
async function Get(api){
  var data;
  var url = api;
  await axios.get(url)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      data = null;
    });
  return data;
}
async function Post(url, param){
  var status;
  await axios.post(url, param)
  .then(function (response) {
   status = response;
  })
  .catch(function (error) {
    console.log(error);
  });
  return status;
}

async function Put(url, param){
  var status;
  await axios.put(url, param)
  .then(function (response) {
   status = response;
  })
  .catch(function (error) {
    console.log(error);
  });
  return status;
}

async function Patch(url, param){
  var status;
  await axios.patch(url, param)
  .then(function (response) {
   status = response;
  })
  .catch(function (error) {
    console.log(error);
  });
  return status;
}
export {Get, Post, Put, Patch}