import axios from 'axios'

const realTime = async (io) => {
  // console.log('Live  ---> ', io.opts)

  let scoketArr = []

  //on connect
  io.on('connection', (socket) => {
    // console.log('socket id just connected', socket.id)
    // console.log('socket ---> ', socket)

    // -----------------------start  of update only one group of machiunes  function  ------------------------  //
    //listen for this message

    socket.on('start', async (data) => {
      console.log('ACTIVE DATA => ', data)

      // let headers = { 'x-api-key': process.env.MACHINE_API }

      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

      // let response = await axios(`http://172.30.60.22:3069/dpu/api/get-machine-data?serialNumber=${data.serial}`)

      // console.log(response.data)

      // let obj = {
      //   bay: data.bay,
      //   serialNumber: data.serial,
      //   model: response.data.model,
      //   buildNumber: response.data.buildNumber,
      //   country: response.data.country,
      // }

      // console.log(obj)

      io.emit('start', data)
    })

    socket.on('end', (data) => {
      console.log('ACTIVE DATA => ', data)

      // let obj = {
      //   userId: data,
      //   socketId: socket.id,
      // }

      io.emit('end', data)
    })

    //on disconnect
    socket.on('disconnect', () => {
      // console.log('socket disconnected', socket.id)

      let found = scoketArr.find((elem) => elem.socketId === socket.id)

      if (found) {
        let userId = found.userId
        const removed = scoketArr.filter((item) => item.userId !== userId)

        const uniqueMap = new Map(removed.map((obj) => [JSON.stringify(obj), obj]))
        const filteredArr = Array.from(uniqueMap.values())

        scoketArr = removed
      }
    })

    // end of socket disconnect

    // console.log(scoketArr)
    // console.log(num)
  })
}

export default realTime
