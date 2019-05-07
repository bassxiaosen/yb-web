import moment from "moment"

export function getRangeTime(value) {
  const now = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  const pass = moment().subtract(value, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
  return [pass, now]
}

export function getDayTime(value) {
  const startTime = moment().subtract(value, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
  const endtTime = moment().subtract(value, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')
  return [startTime, endtTime]
}
