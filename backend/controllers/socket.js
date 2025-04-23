const realTime = async (io) => {
  // console.log('Live  ---> ', io.opts)

  let scoketArr = []

  //on connect
  io.on('connection', (socket) => {
    console.log('socket id just connected', socket.id)
    // console.log('socket ---> ', socket)

    // -----------------------start  of update only one group of machiunes  function  ------------------------  //
    //listen for this message

    socket.on('start', (data) => {
      console.log('ACTIVE DATA => ', data)

      // let obj = {
      //   userId: data,
      //   socketId: socket.id,
      // }

      io.emit('start', data)
    })

    socket.on('end', (data) => {
      console.log('ACTIVE DATA => ', data)

      // let obj = {
      //   userId: data,
      //   socketId: socket.id,
      // }

      io.emit('start', data)
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
