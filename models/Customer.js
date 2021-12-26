const { Request } = require('tedious')
const { databaseUtil } = require('../utils')
const { connection } = databaseUtil

const getOrders = () => {
  return new Promise((resolve, reject) => {
    // Read all rows from table
    const request = new Request(
      'SELECT * FROM DonHang',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    const data = []

    request.on('row', columns => {
      const obj = {}

      for (const column of columns) {
        obj[column.metadata.colName] = column.value
      }

      data.push(obj)
    })

    request.on('requestCompleted', () => {
      resolve(data)
    })

    connection.execSql(request)
  })
}

module.exports = {
  getOrders
}
