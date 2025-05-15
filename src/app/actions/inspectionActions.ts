'use server'

import User from '@/models/User'
import { userData } from '@/db_seed_data/userData'
import bcrypt from 'bcryptjs'
import socket from '@/lib/socket'
import axios from 'axios'
import Inspection from '@/models/Inspection'
import { countryCodes } from '@/lib/countries'

import connectDB from '@/lib/db'
import { stringifyForComponent } from './../../lib/helper_functions'

export const startInspection = async (bay: string, serialNumber: string, dealerName: string) => {
  await connectDB()

  let obj = {
    bay,
    serialNumber,
    dealer: dealerName,
    inspectionMins: 60,
    model: 'TBC',
    buildNumber: 'TBC',
    countryName: 'TBC',
    countryFlag: '/country-flags/gb.svg',
    intFaults: 0,
    top5Internalfaults: [
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
    ],
    top5DoaClaims: [
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
    ],
    dpuArr: [
      { month: 'tbc', machines: 0, claims: 0, dpu: 0 },
      { month: 'tbc', machines: 0, claims: 0, dpu: 0 },
      { month: 'tbc', machines: 0, claims: 0, dpu: 0 },
      { month: 'tbc', machines: 0, claims: 0, dpu: 0 },
      { month: 'tbc', machines: 0, claims: 0, dpu: 0 },
      { month: 'tbc', machines: 0, claims: 0, dpu: 0 },
    ],
    started: Date.now(),
  }

  try {
    // console.log('BAY => ', bay)
    // console.log('SERIAL => ', serialNumber)
    // console.log('DEALER => ', dealerName)
    // ? web socket test start

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    // let response = await axios(`http://172.30.60.22:3069/dpu/api/get-machine-data?serialNumber=${serialNumber}`)
    const response = await axios(`http://quality-uptime.jcb.local/dpu/api/get-machine-data?serialNumber=${serialNumber}`)

    // console.log('RESPONSE DATA => ', response.data)

    await Inspection.updateMany(
      { open: true, bay },
      {
        open: false,
      }
    )

    if (response && response.data) {
      let mins = response.data.model.includes('AG') || response.data.model.includes('PRO') ? 60 : 30
      let foundCountry = countryCodes.find((country: any) => country.abbreviation === response.data.countryName)
      Object.assign(obj, {
        model: response.data.model,
        buildNumber: response.data.buildNumber,
        countryName: response.data.countryName,
        countryFlag: response.data?.countryFlag ? `/country-flags/${response.data?.countryFlag?.toLowerCase()}.svg` : `/country-flags/gb.svg`,
        intFaults: response.data.intFaults,
        top5Internalfaults: response.data.top5Internalfaults,
        inspectionMins: mins,
      })

      if (foundCountry) {
        obj.countryName = foundCountry.name
      }
    }

    // let warrantyResponse = await axios(`http://172.30.60.22:3030/warranty2/api/search/get-machine-dpu?model=${obj.model}`)
    let warrantyResponse = await axios(`http://quality-uptime.jcb.local/warranty2/api/search/get-machine-dpu?model=${obj.model}`)

    if (warrantyResponse.data) {
      obj.top5DoaClaims = warrantyResponse.data.data.top5DoaClaims
      obj.dpuArr = warrantyResponse.data.data.dpuArr
    }

    // console.log('RESPONSE DATA => ', warrantyResponse.data.data)

    await Inspection.create(obj)

    let data = {
      bay: bay,
    }
    // console.log('started')
    socket.emit('start', data)

    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const endInspection = async (bay: string) => {
  await connectDB()
  try {
    await Inspection.updateMany(
      { open: true, bay },
      {
        open: false,
      }
    )

    // ? web socket test start
    // console.log('end')
    socket.emit('end', { bay })

    // setTimeout(function () {
    //   console.log('finished')
    //   socket.emit('dpuUpdating', false)
    // }, 3000)

    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLatestData = async (bay: string) => {
  await connectDB()
  try {
    const latest = await Inspection.findOne({ bay, open: true })

    return stringifyForComponent(latest)
  } catch (error) {
    console.log(error)
    throw error
  }
}
