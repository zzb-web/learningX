import axios from 'axios';
async function Get(api){
  var data;
  var url = api;
  await axios.get(url)
    .then(function (response) {
      data = response;
    })
    .catch(function (error) {
      data = error.response;
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
    status= error.response;
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
    status= error.response;
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
    status= error.response;
  });
  return status;
}

async function Delete(url){
  var status;
  await axios.delete(url)
  .then(function (response) {
   status = response;
  })
  .catch(function (error) {
    status= error.response;
  });
  return status;
}
export {Get, Post, Put, Patch, Delete}