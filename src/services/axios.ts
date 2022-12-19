import axios from "axios";

export let customAxios = axios.create({
  baseURL: 'https://localhost:7175',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export function reload(){
  customAxios = axios.create({
    baseURL: 'https://localhost:7175',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}
