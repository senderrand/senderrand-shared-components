import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { Header } from 'senderrand-shared-components';
import { useColorScheme } from 'react-native';
import Helper from '../../src/config/helper';
import { Entypo } from '@expo/vector-icons';

const Wrap = styled.View`
  flex: 1;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().background};
`;
const Dot = styled(Entypo)`
  color: ${(props: any) => props.color};
  font-size: 15px;
`;

let styles = {
  optionTxtStyle: { fontFamily: 'Regular' },
  titleStyle: { fontFamily: 'Bold' },
  detailStyle: { fontFamily: 'RegularItalic' },
};
export default () => {
  let scheme = useColorScheme();

  return (
    <Wrap scheme={scheme}>
      <Header
        detail={'Typing..'}
        title={'SendErrand'}
        titleStyle={styles.titleStyle}
        detailStyle={styles.detailStyle}
        optionTxtStyle={styles.optionTxtStyle}
        rightIcon={
          <Dot
            name={'dots-three-vertical'}
            color={Helper.getColor().primaryTxt}
          />
        }
        options={['Errand History', 'Saved Locations', 'Profile', 'FAQs']}
      />
    </Wrap>
  );
};
