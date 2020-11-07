import Header from '../templates/Header'
import Home from '../pages/Home'
import getHash from '../utils/router/getHash'
import resolveRoutes from '../utils/router/resolveRoutes'
import Error404 from '../pages/Error404'
import English from '../pages/English'
import ToDo from '../pages/ToDo'

import { countDown } from '../utils/english/index'

import { videosManagment } from '../utils/homePage'

import { newNote } from '../utils/todo'

const routes = {
  '/': Home,
  '/english': English,
  '/todo': ToDo
}

const router = async () => {
  const header = null || document.getElementById('header')
  const content = null || document.getElementById('content')

  header.innerHTML = await Header()
    
  let hash = getHash()
  let route = await resolveRoutes(hash)
  let render = routes[route] ? routes[route] : Error404

  content.innerHTML = await render()

  let domMenu = document.getElementById("menu-list").children
  if(route === '/') {
    domMenu[0].classList.add("itemMenu-selected")
    domMenu[0].children[0].style.color = "black"
    videosManagment()
  }else if (route === '/english') {
    domMenu[1].classList.add("itemMenu-selected")
    domMenu[1].children[0].style.color = "black"
    countDown()
  }else if (route === '/todo') {
    domMenu[2].classList.add("itemMenu-selected")
    domMenu[2].children[0].style.color = "black"
    newNote()
  }
}

export default router
