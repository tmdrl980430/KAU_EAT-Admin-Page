// eslint-disable-next-line no-unused-vars
import React from 'react'
import { atom } from 'recoil'

export const severURLRecoilState = atom({
  key: 'severURLRecoilState',
  default: 'http://gaonnuri-env.eba-y3qcnx5y.ap-northeast-2.elasticbeanstalk.com/admin',
})

export const jwtRecoilState = atom({ key: 'jwtRecoilState', default: '' })

export const userIdxRecoilState = atom({ key: 'userIdxRecoilState', default: null })

export const isLoginRecoilState = atom({ key: 'isLoginRecoilState', default: true })

export const userIdRecoilState = atom({ key: 'userIdRecoilState', default: '' })

const now = new Date()

const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

const today =
  String(koreaNow.getFullYear()) +
  '-' +
  String(koreaNow.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(koreaNow.getDate()).padStart(2, '0')

//결제 uid를 위해 사용하는 시간
let hours = koreaNow.getHours() //시
let minutes = koreaNow.getMinutes() //분
let seconds = koreaNow.getSeconds() //초
let milliseconds = koreaNow.getMilliseconds() //밀리초
const currentTime = hours + ':' + minutes + ':' + seconds + ':' + milliseconds

export const currentTimeRecoilState = atom({ key: 'currentTimeRecoilState', default: currentTime })

export const dateRecoilState = atom({ key: 'dateRecoilState', default: today })
