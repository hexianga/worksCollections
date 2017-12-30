import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { isUndefined } from 'lodash';

class AlertWindow extends Component {
  optionsElement = () => {
    const { options, onPressCancel } = this.props;
    const optionsElement = options.map((item, index) => {
      const style = index > 0 ? [styles.operationItem, styles.leftBorder] : styles.operationItem;
      const fontStyle = index > 0 ? [styles.fontStyle, { fontFamily: 'PingFangSC-Medium' }] : styles.fontStyle;
      return (
        <TouchableOpacity
          key={index}
          style={style}
          onPress={() => {
            if (!isUndefined(item.onPress)) {
              item.onPress();
            }
            onPressCancel();
          }}
        >
          <Text style={fontStyle}>{item.text}</Text>
        </TouchableOpacity>
      );
    });
    return optionsElement;
  }

  render() {
    const { title, message, options } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.alert} >
          <Text style={styles.title}>{title}</Text>
          {!isUndefined(message) && <Text style={styles.message}>{message}</Text>}
          <View style={styles.operating}>
            {!isUndefined(options) ? this.optionsElement() :
            <TouchableOpacity
              style={styles.operationItem}
              onPress={() => { this.props.onPressCancel(); }}
            >
              <Text style={[styles.fontStyle, { fontFamily: 'PingFangSC-Medium' }]}>OK</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    );
  }
}

AlertWindow.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onPressCancel: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  alert: {
    flex: 0,
    marginHorizontal: '14%',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 45,
    fontSize: 17,
    lineHeight: 24,
    fontFamily: 'PingFangSC-Semibold',
    color: '#030303',
  },
  message: {
    paddingHorizontal: 20,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    color: '#030303',
  },
  operating: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  operationItem: {
    flex: 1,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderColor: '#e2e2e2',
  },
  fontStyle: {
    fontSize: 17,
    color: '#007aff',
  },
});

export default AlertWindow;
