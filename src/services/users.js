import {
    loginSupabase, signUpSupabase, logoutSupabase, recoverPasswordSupabase, updateData, createData, getData, fileRequest, getFileRequest,
} from './http.js';
export {
    loginUser, isLogged, registerUser, logout, updateProfile, getProfile, forgotPassword, loginWithToken,
  };
function expirationDate(expires_in) {
    return Math.floor(Date.now() / 1000) + expires_in;
  }
  
  async function loginUser(email, password) {
    const status = { success: false };
    try {
      const dataLogin = await loginSupabase(email, password);
      console.log(dataLogin);
      localStorage.setItem('access_token', dataLogin.access_token);
      localStorage.setItem('uid', dataLogin.user.id);
      localStorage.setItem('email', dataLogin.user.email);
      localStorage.setItem('expirationDate', expirationDate(dataLogin.expires_in));
      status.success = true;
    } catch (err) {
      console.log(err);
      status.success = false;
      status.errorText = err.error_description;
    }
  
    return status;
  }
  
  function loginWithToken(access_token, expires_in) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('expirationDate', expirationDate(expires_in));
  }
  
  function isLogged() {
    if (localStorage.getItem('access_token')) {
      if (localStorage.getItem('expirationDate') > Math.floor(Date.now() / 1000)) {
        return true;
      }
    }
    return false;
  }
  
  async function registerUser(email, password) {
    let info;
    let err = "";
    const status = { success: false };
  
    try {
     
      info = await signUpSupabase(email, password);
      console.log(info);
      status.success = true;
    } catch (error) {
      console.log(error);
      err = error.msg || "Error desconocido";
      status.success = false;
    } finally {

      return { err, status };
    }
  }
  
  function logout() {
    logoutSupabase(localStorage.getItem('access_token')).then((lOData) => {
      console.log(lOData);
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('uid');
  }
  
  async function updateProfile(profile) {
    const access_token = localStorage.getItem('access_token');
    const uid = localStorage.getItem('uid');
  
    const formImg = new FormData();
    formImg.append('avatar', profile.avatar, 'avatarProfile.png');
  
    console.log(formImg);
  
    const avatarResponse = await fileRequest(`/storage/v1/object/avatars/avatar${uid}.png`, formImg, access_token);
  
    // console.log(avatarResponse);
    profile.avatar_url = avatarResponse.urlAvatar;
    delete profile.avatar;
  
    const responseUpdate = await updateData(`profiles?id=eq.${uid}&select=*`, access_token, profile);
    // console.log(responseUpdate);
    // createData('profiles',access_token,profile);
  }
  
  async function getProfile() {
    const access_token = localStorage.getItem('access_token');
    console.log(access_token);
    const uid = localStorage.getItem('uid');
    const responseGet = await getData(`profiles?id=eq.${uid}&select=*`, access_token);
    console.log(responseGet);
    const { avatar_url } = responseGet[0];
    responseGet[0].avatar_blob = false;
    if (avatar_url) {
      const imageBlob = await getFileRequest(avatar_url, access_token);
      console.log(imageBlob);
      if (imageBlob instanceof Blob) {
        responseGet[0].avatar_blob = URL.createObjectURL(imageBlob);
      }
    }
    return responseGet;
  }
  
  async function forgotPassword(email) {
    const responseForgot = await recoverPasswordSupabase(email);
    console.log(responseForgot);
  }