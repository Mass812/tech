declare module '@fortawesome/react-native-fontawesome' {
    import React from 'react';
    import { StyleProp, ViewStyle } from 'react-native';
    import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
  
    export class FontAwesomeIcon extends React.Component<{ icon: IconDefinition; color?: string, size?: number}> {}
  }