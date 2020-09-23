const resolveRoutes = (route) => {
    console.log('route is:')
    console.log(route)
    if(route === '/')
      return route
    return `/${route}`
  }
  
  export default resolveRoutes