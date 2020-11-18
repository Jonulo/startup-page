import Header from '../templates/Header'
import Home from '../pages/Home'
import getHash from '../utils/router/getHash'
import resolveRoutes from '../utils/router/resolveRoutes'
import Error404 from '../pages/Error404'
import English from '../pages/English'
import ToDo from '../pages/ToDo'

import { countDown } from '../utils/english/index'

import { videosManagment } from '../utils/homePage'

import { newNote, notify } from '../utils/todo'

const routes = {
  '/': Home,
  '/english': English,
  '/notes': ToDo
}

const router = async () => {
  const header = null || document.getElementById('header')
  const content = null || document.getElementById('content')

  header.innerHTML = await Header()
    
  let hash = getHash()
  let route = await resolveRoutes(hash)
  let render = routes[route] ? routes[route] : Error404

  content.innerHTML = await render()
  
  const domMenu = document.getElementById("menu-list").children
  const notification = notify()

  if(route === '/') {
    domMenu[0].classList.add("itemMenu-selected")
    domMenu[0].children[0].style.color = "black"
    videosManagment()
  }else if (route === '/english') {
    domMenu[1].classList.add("itemMenu-selected")
    domMenu[1].children[0].style.color = "black"
    countDown()
  }else if (route === '/notes') {
    domMenu[2].classList.add("itemMenu-selected")
    domMenu[2].children[0].style.color = "black"
    newNote()
  }
  if(notification === "almost there") {
    domMenu[2].classList.add("itemMenu-selected--notificationWarning")
  }
  if(notification === 'its today') {
    domMenu[2].classList.add("itemMenu-selected--notification")
  }
}

export default router
