import React from 'react'
import { View, ScrollView } from 'react-native'
import { Hoshi } from 'react-native-textinput-effects'
import TextField from 'react-native-md-textinput'

import { font, spacing, colors } from '../styleConstants'

import ErrorText from './ErrorText'

const BasicTextInput = (props) => {
  return (
    <ScrollView>
      <TextField {...props} value={props.value || ''} />
      <ErrorText error={props.error} />
    </ScrollView>
  )
}

export default BasicTextInput
