import moment from "moment"

export function getPassWeek() {
  return moment().subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss')
}
