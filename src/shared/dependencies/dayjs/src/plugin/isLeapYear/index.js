export default (o, c) => {
  c.prototype.isLeapYear = function () {
    return ((this.$y % 4 === 0) && (this.$y % 100 !== 0)) || (this.$y % 400 === 0)
  }
}

