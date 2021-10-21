import Helper from '../config/helper';
import { messageInterface, sender, UID } from './index';

export let getInvoiceMessage = (
  price: string,
  senderData: sender,
  location: string,
  lang?: string,
  invoiceID?: string
) => {
  let ng = lang ? lang : 'en';
  let data: any = { price };
  let msg: messageInterface = {
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
        { id: 'accept', title: Helper.t('decline', ng) },
      ],
    };
  }
  return { ...msg, data };
};

interface coordinateInterface {
  longitude: number;
  latitude: number;
  longitudeDelta?: number;
  latitudeDelta?: number;
}

export let getTrackerMessage = (
  region: coordinateInterface,
  position: coordinateInterface,
  senderData: sender,
  lang?: string
) => {
  let ng = lang ? lang : 'en';
  let msg: messageInterface = {
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
  status: string,
  senderData: sender,
  loading?: boolean,
  color?: string
) => {
  let msg: messageInterface = {
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
