// composable.js
export default function useRemainingTime(start_time, end_time) {
  function getStatusTime(remainingTime) {
    if (
      remainingTime.daysRemaining <= 0 &&
      remainingTime.hoursRemaining <= 0 &&
      remainingTime.minutesRemaining <= 0
    ) {
      return 'Waktu Habis'
    } else {
      let status = 'Sisa waktu: '
      if (remainingTime.daysRemaining > 0) {
        status += `${remainingTime.daysRemaining} hari `
      }
      if (remainingTime.hoursRemaining > 0) {
        status += `${remainingTime.hoursRemaining} jam `
      }
      if (remainingTime.minutesRemaining > 0) {
        status += `${remainingTime.minutesRemaining} menit`
      }
      return status.trim()
    }
  }
  function getRemainingTime(start, end) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const timeDiff = endDate.getTime() - startDate.getTime()

    const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24))

    const hoursRemaining = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600))

    const minutesRemaining = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60))

    return { daysRemaining, hoursRemaining, minutesRemaining }
  }

  const remainingTime = getRemainingTime(start_time, end_time)

  const statusTime = getStatusTime(remainingTime)

  return { statusTime }
}
