import styled from 'styled-components';
import React, { useState } from 'react';
import Default from './default-footer';
import Recorder from './audio-footer';

const Wrap = styled.View``;

export default (props: any) => {
  const [type, setType] = useState('default');

  let send = (message: any) => {
    console.log(message);
  };

  return (
    <Wrap>
      {type === 'default' && (
        <Default
          {...props}
          send={send}
          changeType={(value: string) => setType(value)}
        />
      )}
      {type === 'audio' && (
        <Recorder
          {...props}
          send={send}
          changeType={(value: string) => setType(value)}
        />
      )}
    </Wrap>
  );
};
