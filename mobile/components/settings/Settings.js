import React, { Component } from 'react'

import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'

import ActionButton from '../ui/ActionButton'
import ClubList from '../club/ClubList'

import { connect } from 'react-redux'

import { authActions } from '../../data/auth'

// ===============
//     STYLES
// ===============

const styles = StyleSheet.create({
  root: {
    padding: 20
  },
  attributeHolder: {
    paddingTop: 10
  },
  attributeLabel: {
    fontWeight: '600',
    fontSize: 16
  },
  attribute: {
    fontWeight: '100',
    fontSize: 16
  },
  avatar: {
    width: 50,
    height: 50
  },
  signOutHolder: {
    marginBottom: 25
  }
})

// ===============
//    PRESENTER
// ===============

const defaultAvatar = 'http://www.archeosub.eu/images/BluLabTeamPeople/empty_user.png'

class Settings extends Component {
  goToEdit = () => {
    this.props.navigation.navigate('EditUser', {userInfo: this.props.currentUser})
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <View style={styles.attributeHolder}>
          <Text style={styles.attributeLabel} > Name: </Text>
          <Text style={styles.attribute} > {this.props.currentUser.name} </Text>
        </View>

        <View style={styles.attributeHolder}>
          <Text style={styles.attributeLabel} > Email: </Text>
          <Text style={styles.attribute} > {this.props.currentUser.email} </Text>
        </View>

        <ActionButton onPress={this.goToEdit}>
          edit profile
        </ActionButton>

        <View style={styles.attributeHolder}>
          <Text style={styles.attributeLabel} > Clubs: </Text>
          <ClubList navigation={this.props.navigation} />
        </View>

        <View style={styles.signOutHolder}>
          <ActionButton onPress={this.props.signOut}>
            sign out
          </ActionButton>
        </View>
      </ScrollView>
    )
  }
}

// ===============
//   CONNECTION
// ===============

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth && state.auth.currentUser || {}
  }
}

export default connect(
  mapStateToProps,
  {signOut: authActions.signOut}
)(Settings)
