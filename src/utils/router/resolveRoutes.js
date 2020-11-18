const resolveRoutes = (route) => {
    if(route === '/')
      return route
    return `/${route}`
  }
  
  export default resolveRoutes
