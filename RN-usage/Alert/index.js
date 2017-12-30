import { isUndefined } from 'lodash';
import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import AlertWindow from './AlertWindow';


const Alert = function() {
  this.panel = null;

  return {
    alert(title, message, options) {
      if (!isUndefined(this.panel)) {
        this.panel.destroy();
      }

      this.panel = new RootSiblings(
        <AlertWindow
          title={title}
          message={message}
          options={options}
          onPressCancel={() => this.panel && this.panel.destroy()}
        />
      );
    },
  };
};

export default Alert();
