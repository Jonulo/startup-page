const monthsFormatted = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]
const notify = () => {
  const deadLine = JSON.parse(localStorage.getItem("notes"))
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = monthsFormatted[today.getMonth()] 

  let notification = ""
  let notificationCount = 0

  if(deadLine) {
     
    deadLine.forEach(({ date }) => {
    
      let deadLineMonth = date.slice(0, 3)
      let deadLineDay = parseInt(date.slice(6, 8))
   
      if(deadLineMonth === currentMonth) {
        let firstNotification = deadLineDay - 3
        if(currentDay >= firstNotification && currentDay < deadLineDay) {
          notification = "almost there"
          notificationCount++
        }
        if(currentDay === deadLineDay) {
          notification = "its today"
          notificationCount++
        }
      }
    })
  }
  return notification 
}

export {
  notify
}
