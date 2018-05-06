import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, LayoutAnimation } from 'react-native';
import Modal from 'react-native-modal';

import {
  RkTextInput,
  RkButton,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { TextInput } from 'react-native-gesture-handler';

class InfoModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { Type, Municipalite, Frequence, Jour, Info, NearestDropOff, displayModal } = this.props.data;

    return (
      <Modal isVisible={displayModal}>
        <View style={styles.modalContent}>
          {NearestDropOff ? (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 25 }}>
              <View style={styles.row}>
                <RkTextInput label='Catégorie'
                  value={Type}
                  rkType='right clear' />
              </View>
              <View style={styles.row}>
                <Text style={{ paddingTop: 10, paddingBottom: 10 }}>{Info}</Text>
              </View>
            </View>
          ) : (
              <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 25 }}>
                <View style={styles.row}>
                  <RkTextInput label='Catégorie'
                    value={Type}
                    rkType='right clear' />
                </View>
                <View style={styles.row}>
                  <RkTextInput label='Municipalité'
                    value={Municipalite}
                    rkType='right clear' />
                </View>
                <View style={styles.row}>
                  <RkTextInput label='Fréquence'
                    value={Frequence}
                    rkType='right clear'
                  />
                </View>
                <View style={styles.row}>
                  <RkTextInput label='Jour'
                    value={Jour}
                    rkType='right clear'
                  />
                </View>
                <View style={styles.row}>
                  <Text style={{ paddingTop: 10, paddingBottom: 10 }}>{Info}</Text>
                </View>
              </View>
            )}
          <View style={{
            flexDirection: 'row',
          }}>
            <RkButton
              style={{ width: 110, justifyContent: 'flex-start' }}
              onPress={() => {
                this.props._closeModal();
                this.props.data.displayModal = false;
              }}
              rkType='medium success rounded'>
              <Icon
                style={[
                  UtilStyles.icon,
                  UtilStyles.iconRound,
                  { color: 'white', paddingRight: 10 }
                ]}
                name={'check-circle'}
                size={28} />
              Fermer
            </RkButton>
          </View>
        </View>
      </Modal >
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingTop: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  multiline: {
    height: 100
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

const mapStateToProps = ({ info }) => {
  const { data } = info;
  return { data };
};

export default connect(mapStateToProps, null)(InfoModal);