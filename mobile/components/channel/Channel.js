import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View
 } from 'react-native'
import { connect } from 'react-redux'

import { confirmMessage } from '../../lib/uiActions'
import { getUsersForMain } from '../../data/users'
import { getPostsForChannel } from '../../data/posts'
import { deleteChannel } from '../../data/channels'

import withPagination from '../helpers/withPagination'
import withDebouncedNav from '../helpers/withDebouncedNav'

import Stream from '../stream/Stream'
import Loading from '../ui/Loading'
import LinkButton from '../ui/LinkButton'
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

class Channel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      initialLoadDone: false
    }
  }

  get channel() {
    return this.props.navigation.state.params.channel
  }

  get sortedPosts() {
    return Object.values(this.props.posts)
      .filter((p) => p.channel_id == this.props.channelId)
      .sort((a, b) => (
        new Date(b.last_activity_time) - new Date(a.last_activity_time)
      ))
  }

  get needsPosts () {
    return this.sortedPosts.length === 0
  }

  markLoaded = () => {
    this.setState({initialLoadDone: true})
  }

  componentDidMount() {
    this.props.getPostsForChannel(this.channel.id, this.markLoaded)
    this.props.getUsersForMain()
  }

  removeChannel = () => {
    this.props.deleteChannel(this.channel.id, this.props.navigation.goBack)
  }

  removeChannelClick = () => {
    confirmMessage(
      'Remove Tag',
      'Are you sure?',
      this.removeChannel
    )
  }

  editChannelClick = () => {
    this.props.debouncedNav('EditTag', {channelInfo: this.channel})
  }

  refresh = (cb) => {
    this.props.getPostsForChannel(this.channel.id, cb)
  }

  onEndHitCb = () => {
    return this.props.onEndHitCb( (onSuccess, nextPage) => {
      this.props.getPostsForChannel(this.channel.id, onSuccess, nextPage)
    })
  }

  renderStream () {
    const {
      channels,
      navigation,
      posts,
      clubs,
      users
    } = this.props

    if (!this.state.initialLoadDone && this.needsPosts) { return <Loading /> }

    return (
      <Stream
        inChannel
        needsPosts={this.needsPosts}
        currentUserId={this.props.currentUserId}
        refresh={this.refresh}
        navigation={navigation}
        content={this.sortedPosts}
        channels={channels}
        clubs={clubs}
        users={users}
        onEndHit={this.onEndHitCb()}
        currentlyLoading={!this.props.atFinalPage}
      />
    )
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.content}>
          {this.renderStream()}
        </View>
        <Footer>
          <View style={styles.footerContent}>
            <LinkButton title="Remove Tag" onPress={this.removeChannelClick} />
            <LinkButton title="Edit Tag" onPress={this.editChannelClick} />
          </View>
        </Footer>
      </View>
    )
  }
}

// ===============
//   CONNECTION
// ===============

const mapStateToProps = (state, props) => {
  const channelId = props.navigation.state.params.channel.id
  const currentUserId = state.auth.currentUser.id

  return {
    posts: state.posts,
    channels: state.channels,
    clubs: Object.values(state.clubs),
    users: state.users,
    channelId,
    currentUserId
  }
}

export default connect(
  mapStateToProps,
  {
    deleteChannel,
    getPostsForChannel,
    getUsersForMain
  }
)(withPagination(withDebouncedNav(Channel)))
