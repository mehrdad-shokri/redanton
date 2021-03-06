import React from 'react'
import AppIntro from 'react-native-app-intro'

import { colors } from '../styleConstants'

import hi from '../../assets/images/hi_white.png'
import group from '../../assets/images/group_white.png'
import signal from '../../assets/images/signal_white.png'
import feed from '../../assets/images/feed_white.png'
import run from '../../assets/images/run_white.png'

const Intro = (props) => {
  const pageArray = [{
    title: 'Welcome',
    description: 'Relayd makes it easy to share links and have discussions with private groups.',
    backgroundColor: colors.primary,
    img: hi,
    imgStyle: {
      height: 300,
      width: 100 * 2.5,
      marginBottom: -100
    },
    fontColor: '#fff',
    level: 5,
  }, {
    title: 'Clubs',
    img: group,
    imgStyle: {
      height: 100 * 2.5,
      width: 100 * 2.5,
      marginBottom: -100
    },
    description: 'The first step is to make a club. Clubs are the private groups you\'ll be sharing with.',
    backgroundColor: colors.primary,
    fontColor: '#fff',
    level: 5,
  }, {
    title: 'Tags',
    img: signal,
    imgStyle: {
      height: 130 * 2.5,
      width: 120 * 2.5,
      marginBottom: -100
    },
    description: 'Each time you post you can add tags. Tags help you group posts by topic (or however you want).',
    backgroundColor: colors.primary,
    fontColor: '#fff',
    level: 5,
  }, {
    title: 'Your Stream',
    img: feed,
    imgStyle: {
      height: 130 * 2.5,
      width: 100 * 2.5,
      marginBottom: -50
    },
    description: 'Your stream collects the posts from every club you are in. Posts with recent activity float to the top.',
    backgroundColor: colors.primary,
    fontColor: '#fff',
    level: 5,
  },
  {
    title: 'Get Started!',
    img: run,
    imgStyle: {
      height: 120 * 2.5,
      width: 100 * 2.5,
      marginBottom: -100
    },
    description: 'Get started by grouping up with your friends and sharing some links.',
    backgroundColor: colors.primary,
    fontColor: '#fff',
    level: 5,
  }]

  return (
    <AppIntro
      onDoneBtnClick={props.onIntroDone}
      onSkipBtnClick={props.onIntroDone}
      pageArray={pageArray}
    />
  )
}

export default Intro