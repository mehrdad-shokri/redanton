import React, { PureComponent } from 'react'
import {
  Button,
  StyleSheet,
  View
 } from 'react-native'
import { connect } from 'react-redux'

import { getUsersForMain } from '../../data/users'
import { getPostsForClub } from '../../data/posts'

import Stream from '../stream/Stream'
import Footer from '../ui/Footer'

// ===============
//     STYLES
// ===============

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  },
  content: {
    height: '90%'
  },
  footerContent: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

// ===============
//    PRESENTER
// ===============

class Club extends PureComponent {
  get club() {
    return this.props.navigation.state.params.club
  }

  // IMPLEMENT THIS FILTER FRD
  get sortedPosts() {
    return Object.values(this.props.posts)
      .sort((a, b) => (
        new Date(b.last_activity_time) - new Date(a.last_activity_time)
      ))
  }

  componentDidMount() {
    this.props.getPostsForClub(this.club.id)
    this.props.getUsersForMain()
  }

  refresh = (cb) => {
    this.props.getPostsForClub(this.channel.id, cb)
  }

  render() {
    const {
      channels,
      navigation,
      posts,
      users
    } = this.props

    return (
      <View style={styles.root}>
        <Stream
          currentUserId={this.props.currentUserId}
          refresh={this.refresh}
          navigation={navigation}
          content={this.sortedPosts}
          channels={channels}
          users={users}
        />
      </View>
    )
  }
}

// ===============
//   CONNECTION
// ===============

const mapStateToProps = (state, props) => {
  const clubId = props.navigation.state.params.club.id
  const currentUserId = state.auth.currentUser.id

  return {
    posts: state.posts,
    channels: state.channels,
    users: state.users,
    clubId,
    currentUserId
  }
}

export default connect(
  mapStateToProps,
  {
    getPostsForClub,
    getUsersForMain
  }
)(Club)
