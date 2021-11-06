import Helper from '../config/helper';
import { messageInterface, senderInterface, UID } from './index';

export let getInvoiceMessage = (
  orderID: string,
  price: string,
  senderData: senderInterface,
  location: string,
  lang?: string,
  invoiceID?: string
) => {
  let ng = lang ? lang : 'en';
  let data: any = { price };
  let msg: messageInterface = {
    orderID,
    sender: senderData,
    id: UID(),
    status: 0,
    date: new Date(),
    text: invoiceID
      ? Helper.t('invoice', ng)
      : Helper.t2('total_amount_txt', ng, [`${location}`, `${price}`]),
    file: null,
    type: invoiceID ? 'invoice' : 'text',
  };
  if (invoiceID) data = { ...data, invoiceID };
  else {
    data = {
      ...data,
      footer: 'options',
      options: [
        { id: 'accept', title: Helper.t('accept', ng) },
        { id: 'decline', title: Helper.t('decline', ng) },
      ],
    };
  }
  return { ...msg, data };
};

export interface coordinateInterface {
  longitude: number;
  latitude: number;
  longitudeDelta?: number;
  latitudeDelta?: number;
}

export let getTrackerMessage = (
  orderID: string,
  region: coordinateInterface,
  position: coordinateInterface,
  senderData: senderInterface,
  lang?: string
) => {
  let ng = lang ? lang : 'en';
  let msg: messageInterface = {
    orderID,
    sender: senderData,
    id: UID(),
    status: 0,
    date: new Date(),
    text: Helper.t('track_delivery', ng),
    file: null,
    type: 'tracker',
    data: { region, position },
  };
  return msg;
};

export let getStatusMessage = (
  orderID: string,
  status: string,
  senderData: senderInterface,
  loading?: boolean,
  color?: string
) => {
  let msg: messageInterface = {
    orderID,
    sender: senderData,
    id: UID(),
    status: 0,
    date: new Date(),
    text: status,
    file: null,
    type: 'status',
    data: { loading, color },
  };
  return msg;
};

export interface runnerInterface {
  id: string;
  name: string;
  image: string;
  rate: number;
  runs: number;
}
export const getNewRunnerMessage = (
  orderID: string,
  runner: runnerInterface,
  lang?: string
) => {
  let ng = lang ? lang : 'en';
  let msg: messageInterface = {
    orderID,
    sender: { id: runner.id, name: runner.name, image: runner.image },
    id: UID(),
    status: 0,
    date: new Date(),
    text: Helper.t2('runner_joined', ng, [runner.name]),
    file: null,
    type: 'new_runner',
    data: {
      name: runner.name,
      image: runner.image,
      rate: runner.rate,
      runs: `${runner.runs}+ Runs`,
    },
  };
  return msg;
};
