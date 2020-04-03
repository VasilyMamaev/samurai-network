export type userPostType = {
  id: number
  message: string
  likesCount: number
}

export type userInfoContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type userInfoPhotosType = {
  small: string | null
  large: string | null
}

export type userInfoType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: userInfoContactsType
  photos: userInfoPhotosType
}

export type userType = {
  name: string
  id: number
  uniqueUrlName: string | null
  photos: userInfoPhotosType
  status: string | null
  followed: boolean
}
