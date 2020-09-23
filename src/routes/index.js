import Header from '../templates/Header'
import Home from '../pages/Home'
import getHash from '../utils/router/getHash'
import resolveRoutes from '../utils/router/resolveRoutes'
import Error404 from '../pages/Error404'
import English from '../pages/English'

import { checkAnswer } from '../utils/englishLogic'

const routes = {
  '/': Home,
  '/english': English,
}

const router = async () => {
  const header = null || document.getElementById('header')
  const content = null || document.getElementById('content')

  header.innerHTML = await Header()
    
  let hash = getHash()
  let route = await resolveRoutes(hash)
  let render = routes[route] ? routes[route] : Error404

  content.innerHTML = await render()

  if (route === '/english') {
      checkAnswer()
  }
}

export default router