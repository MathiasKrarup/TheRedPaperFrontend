import axios from "axios";

export let customAxios = axios.create({
  baseURL: 'https://theredpaper.azurewebsites.net',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export function reload(){
  customAxios = axios.create({
    baseURL: 'https://theredpaper.azurewebsites.net',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}
