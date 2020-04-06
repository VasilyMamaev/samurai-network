import { userInfoType, userType } from './../types/types';
import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": 'e10dfbbe-068b-4a22-94ec-46ea74c34511'
  }
})

export enum ResultCodeEnum {
  success = 0,
  error = 1
}

export enum ResultCodeWithCaptchaEnum {
  captchaRequired = 10
}

type GetUsersResponseType = {
  items: Array<userType>
  totalCount: number
  error: string
}

export const usersAPI = {
  getUsers(usersAtPageCount = 1, currentPage = 10) {
    return instance.get<GetUsersResponseType>(`users?count=${usersAtPageCount}&page=${currentPage}`)
    .then(response => response.data)
  },

  unfollowUser(id: number) {
    return instance.delete<AuthLogoutRosponseType>(`follow/${id}`)
    .then(response => response.data.resultCode)
  },

  followUser(id: number) {
    return instance.post<AuthLogoutRosponseType>(`follow/${id}`)
    .then(response => response.data.resultCode)
  },

  getProfile(userId: number) {
    return instance.get<userInfoType>(`profile/${userId}`)
    .then(response => response.data)
  }
}

export const userProfileAPI = {
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
    .then(response => response.data)
  },

  updateStatus(status: string) {
    return instance.put<AuthLogoutRosponseType>(`/profile/status`, {status: status})
  },

  saveAvatarImg(img: any) {
    const formData = new FormData();
    formData.append("image", img);

    return instance.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
  },

  saveProfile(profile: userInfoType) {
    return instance.put(`profile`, profile)
  }
}

type AuthMeRosponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type AuthLoginRosponseType = {
  resultCode: ResultCodeEnum | ResultCodeWithCaptchaEnum
  messages: Array<string>
  data: {userId: number}
}

type AuthLogoutRosponseType = {
  resultCode: ResultCodeEnum
  messages: Array<string>
  data: any
}

export const userAuthAPI = {

  authMe() {
    return instance.get<AuthMeRosponseType>(`auth/me`)
    .then(response => response.data)
  },

  userLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<AuthLoginRosponseType>('/auth/login', {email, password, rememberMe, captcha})
    .then(response => response.data)
  },

  userLogout() {
    return instance.delete<AuthLogoutRosponseType>('/auth/login')
    .then(response => response.data)
  }
}

type getCaptchaUrlRosponseType = {url: string}

export const securityAPI = {

  getCaptchaUrl() {
    return instance.get<getCaptchaUrlRosponseType>('security/get-captcha-url')
    .then(response => response.data)
  }
}