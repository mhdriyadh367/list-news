export default function useConvertTimeAgo() {
  const timeAgo = (dateString) => {
    const date = new Date(dateString)
    const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    const now = new Date()
    const timeDifference = now - newDate
    const minutesDifference = Math.floor(timeDifference / 60000)

    if (minutesDifference < 1) {
      return 'Just Now'
    } else if (minutesDifference === 1) {
      return '1 Minute Ago'
    } else if (minutesDifference < 60) {
      return `${minutesDifference} Minutes Ago`
    } else if (minutesDifference >= 60 && minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60)
      const remainingMinutes = minutesDifference % 60
      if (hoursDifference === 1) {
        return '1 Hour Ago'
      } else {
        return `${hoursDifference} Hours Ago`
      }
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440)
      const remainingMinutes = minutesDifference % 1440
      if (daysDifference === 1) {
        return '1 Day Ago'
      } else {
        return `${daysDifference} Days Ago`
      }
    }
  }
  return { timeAgo }
}
