const getHash = () => 
  location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/'
  console.log('location:')
  console.log(location)

export default getHash