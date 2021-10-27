import styled from 'styled-components';
import React, { useState } from 'react';
import Default from './default-footer';
import Recorder from './audio-footer';

const Wrap = styled.View``;

export default (props: any) => {
  const [type, setType] = useState('default');

  let send = (message: any) => {
    props.send && props.send(message);
  };

  let switchType = (value: string) => {
    setType(value);
    value === 'audio'
      ? props.setRecording && props.setRecording(true)
      : props.setRecording && props.setRecording(false);
  };

  return (
    <Wrap>
      {type === 'default' && (
        <Default {...props} send={send} changeType={switchType} />
      )}
      {type === 'audio' && (
        <Recorder {...props} send={send} changeType={switchType} />
      )}
    </Wrap>
  );
};
