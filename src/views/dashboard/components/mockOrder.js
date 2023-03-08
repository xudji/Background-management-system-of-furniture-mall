/* var data = [
  {
    data: '2022-3-20',
    orderNum: 40,
    returnNum: 3,

  },
  {
    data: '2022-3-20',
    orderNum: 40,
    returnNum: 3,

  }
] */
export function mockData() {
  let data = []
  for (let i = 1; i <= 31; i++) {
    data.push({
      data: `2022-03-${i > 9 ? i : '0' + i}`,
      orderNum: randomNum(40, 60),
      returnNum: randomNum(0, 5)
    })
  }
  return data
}
function randomNum(start, end) {
  return Math.floor(Math.random() * (end - start)) + start
}

