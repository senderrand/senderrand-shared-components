import styled from 'styled-components';
import Helper from '../../config/helper';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import Fleetless from '../../common/svg/fleetless';
import Bike from '../../common/svg/bike';
import Car from '../../common/svg/car';
import Truck from '../../common/svg/truck';
import Bicycle from '../../common/svg/bicycle';
import Canoe from '../../common/svg/canoe';
import ActionSheet from 'react-native-actionsheet';

const FleetContainer = styled.View`
  width: 100%;
  padding: 0 20px 20px 20px;
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  border-top-color: ${(props: any) =>
    props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
  border-top-width: 0.3px;
`;
const EachCheck = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const FleetCheck = styled.View`
  height: 12px;
  width: 12px;
  border: 0.75px solid ${Helper.getColor().chatBoxTwo};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const CheckInner = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: any) =>
    props.check ? Helper.getColor().chatBoxTwo : 'transparent'};
`;
const WrapFleet = styled.View`
  height: 40px;
  justify-content: flex-end;
`;

let EachFleet = (props: any) => {
  let [check, setCheck] = useState(false);

  let toggle = () => {
    setCheck(!check);
    props.select && props.select();
  };

  return (
    <EachCheck onPress={toggle}>
      <WrapFleet>{props.fleet && props.fleet}</WrapFleet>
      <FleetCheck>
        <CheckInner check={check} />
      </FleetCheck>
    </EachCheck>
  );
};

export const FleetFooter = (props: any) => {
  let scheme = useColorScheme();
  return (
    <FleetContainer background={Helper.getColor().plane} scheme={scheme}>
      {fleets.map((item: any, index: number) => (
        <EachFleet
          key={index}
          fleet={item.icon}
          select={props.select ? () => props.select(index) : null}
        />
      ))}
    </FleetContainer>
  );
};

let fleets = [
  { id: 1, name: 'Fleetless', icon: <Fleetless /> },
  { id: 2, name: 'Bike', icon: <Bicycle /> },
  { id: 3, name: 'Car', icon: <Bike /> },
  { id: 4, name: 'Truck', icon: <Car /> },
  { id: 5, name: 'Truck', icon: <Truck /> },
  { id: 6, name: 'Truck', icon: <Canoe /> },
];

const BoxWrap = styled.TouchableOpacity`
  margin-top: 10px;
`;
const TimeTxt = styled.Text`
  margin-top: 4px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-size: 12px;
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.light : 'Light'};
`;

export const FleetBox = (props: any) => {
  let sheet: any;
  let [lang] = useState(props.lang ? props.lang : 'en');
  let [options] = useState(
    props.options && props.options.length
      ? [
          ...props.options,
          props.cancelTxt ? props.cancelTxt : Helper.t('cancel', lang),
        ]
      : [Helper.t('cancel', lang)]
  );
  let getFleet = () => {
    switch (props.index) {
      case 0:
        return <Fleetless />;
      case 1:
        return <Bicycle />;
      case 2:
        return <Bike />;
      case 3:
        return <Car />;
      case 4:
        return <Truck />;
      case 5:
        return <Canoe />;
      default:
        return <Fleetless />;
    }
  };

  let selectOption = (index: number) => {
    props.onSelectOption && props.onSelectOption(index);
  };

  return (
    <BoxWrap onPress={() => sheet.show()}>
      {getFleet()}
      <ActionSheet
        options={options}
        ref={(o: any) => (sheet = o)}
        cancelButtonIndex={options.length && options.length - 1}
        title={
          props.optionTitle ? props.optionTitle : Helper.t('options', lang)
        }
        onPress={(index: number) =>
          index !== options.length - 1 && selectOption(index)
        }
      />
      <TimeTxt family={props.family && props.family}>
        {props.date && typeof props.date === 'object'
          ? Helper.getDate(props.date)
          : props.date && props.date}
      </TimeTxt>
    </BoxWrap>
  );
};
