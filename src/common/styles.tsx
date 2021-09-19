import Helper from '../config/helper';
import styled from 'styled-components';

const View = styled.View.attrs((props: any) => {
  let style = {};
  if (props.flex) style = { ...style, flex: props.flex };
  if (props.height) style = { ...style, height: props.height };
  if (props.width) style = { ...style, width: props.width };
  if (props.justify) style = { ...style, justifyContent: props.justify };
  if (props.align) style = { ...style, alignItems: props.align };
  if (props.direction) style = { ...style, flexDirection: props.direction };
  return style;
})`
  background-color: ${(props: any) =>
    props.background ? props.background : 'transparent'};
  border-radius: ${(props: any) => (props.radius ? props.radius : '0')}px;
  padding-top: ${(props: any) => (props.pad ? props.pad[0] : '0')}px;
  padding-right: ${(props: any) => (props.pad ? props.pad[1] : '0')}px;
  padding-bottom: ${(props: any) => (props.pad ? props.pad[2] : '0')}px;
  padding-left: ${(props: any) => (props.pad ? props.pad[3] : '0')}px;
  margin-top: ${(props: any) =>
    props.viewMargin ? props.viewMargin[0] : '0'}px;
  margin-right: ${(props: any) =>
    props.viewMargin ? props.viewMargin[1] : '0'}px;
  margin-bottom: ${(props: any) =>
    props.viewMargin ? props.viewMargin[2] : '0'}px;
  margin-left: ${(props: any) =>
    props.viewMargin ? props.viewMargin[3] : '0'}px;
`;

const Touch = styled.TouchableOpacity.attrs((props: any) => {
  let style = {};
  if (props.flex) style = { ...style, flex: props.flex };
  if (props.height) style = { ...style, height: props.height };
  if (props.width) style = { ...style, width: props.width };
  if (props.justify) style = { ...style, justifyContent: props.justify };
  if (props.align) style = { ...style, alignItems: props.align };
  if (props.direction) style = { ...style, flexDirection: props.direction };
  return style;
})`
  background-color: ${(props: any) =>
    props.background ? props.background : 'transparent'};
  border-radius: ${(props: any) => (props.radius ? props.radius : '0')}px;
  padding-top: ${(props: any) => (props.pad ? props.pad[0] : '0')}px;
  padding-right: ${(props: any) => (props.pad ? props.pad[1] : '0')}px;
  padding-bottom: ${(props: any) => (props.pad ? props.pad[2] : '0')}px;
  padding-left: ${(props: any) => (props.pad ? props.pad[3] : '0')}px;
  margin-top: ${(props: any) =>
    props.viewMargin ? props.viewMargin[0] : '0'}px;
  margin-right: ${(props: any) =>
    props.viewMargin ? props.viewMargin[1] : '0'}px;
  margin-bottom: ${(props: any) =>
    props.viewMargin ? props.viewMargin[2] : '0'}px;
  margin-left: ${(props: any) =>
    props.viewMargin ? props.viewMargin[3] : '0'}px;
`;

const Txt = styled.Text.attrs((props: any) => {
  let style = {};
  if (props.family) style = { ...style, fontFamily: props.family };
  return style;
})`
  font-family: ${(props: any) => (props.family ? props.family : 'Medium')};
  font-size: ${(props: any) => (props.size ? props.size : '12')}px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  text-align: ${(props: any) => (props.align ? props.align : 'left')};

  margin-top: ${(props: any) =>
    props.viewMargin ? props.viewMargin[0] : '0'}px;
  margin-right: ${(props: any) =>
    props.viewMargin ? props.viewMargin[1] : '0'}px;
  margin-bottom: ${(props: any) =>
    props.viewMargin ? props.viewMargin[2] : '0'}px;
  margin-left: ${(props: any) =>
    props.viewMargin ? props.viewMargin[3] : '0'}px;
`;

export { View, Touch, Txt };
