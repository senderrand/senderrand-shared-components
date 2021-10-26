import * as SQLite from 'expo-sqlite';
import type { messageInterface } from './index';

const db = SQLite.openDatabase('errand.db');

export const createTable = async () => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'create table if not exists items (key integer primary key not null, ' +
        'id text, text text, date integer, file text, duration number, sender text, reply text, data text, type text, status integer, orderID text);'
    );
  });
};

export const sendMessage = async (
  data: messageInterface,
  callback: (res: any) => void
) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'insert into items (id text, text, date, file, duration, sender, reply, data, type, status, orderID) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );',
      [
        data.id,
        data.text,
        typeof data.date === 'object' ? data.date.toDateString() : data.date,
        data.file ? JSON.stringify(data.file) : data.file,
        data.duration ? data.duration : 0,
        data.sender ? JSON.stringify(data.sender) : null,
        data.reply ? JSON.stringify(data.reply) : null,
        data.data ? JSON.stringify(data.data) : null,
        data.type,
        data.status,
        data.orderID,
      ],
      (_res, { rows: { _array } }) => {
        callback(formatMessages(_array));
      },
      (_, _error) => {
        callback(false);
        return false;
      }
    );
  });
};

export const sendMessage2 = async (data: messageInterface) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'insert into items (id text, text, date, file, duration, sender, reply, data, type, status, orderID) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );',
      [
        data.id,
        data.text,
        typeof data.date === 'object' ? data.date.toDateString() : data.date,
        data.file ? JSON.stringify(data.file) : data.file,
        data.duration ? data.duration : 0,
        data.sender ? JSON.stringify(data.sender) : null,
        data.reply ? JSON.stringify(data.reply) : null,
        data.data ? JSON.stringify(data.data) : null,
        data.type,
        data.status,
        data.orderID,
      ],
      (_res, resultSet) => {
        return { ...data, id: resultSet.insertId };
      },
      (_, _error) => {
        return false;
      }
    );
  });
};

export const getMessages = async (orderID: string) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'select * from items where orderID = ?',
      [orderID],
      (_, { rows: { _array } }) => {
        return formatMessages(_array);
      },
      (_, _error) => {
        return false;
      }
    );
  });
};

export const deleteMessage = (
  key: string,
  value: string | number,
  callback: (res: any) => void
) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      `delete from items where ${key} = ?;`,
      [value],
      (_res, { rows: { _array } }) => {
        callback(formatMessages(_array));
      },
      (_, _error) => {
        callback(false);
        return false;
      }
    );
  });
};

export const updateMessage = (
  primaryKey: string,
  primaryValue: string | number,
  secondaryKey: string,
  secondaryValue: string | number,
  callback: (res: any) => void
) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      `update items set ${primaryKey} = ? where ${secondaryKey} = ?`,
      [primaryValue, secondaryValue],
      (_res, { rows: { _array } }) => {
        callback(formatMessages(_array));
      },
      (_, _error) => {
        callback(false);
        return false;
      }
    );
  });
};

let formatMessages = (_array: any[]) => {
  let messages: any[] = [];
  _array.map((item) => {
    let message = { ...item };
    if (item.data) message = { ...message, data: JSON.parse(item.data) };
    if (item.file) message = { ...message, file: JSON.parse(item.file) };
    if (item.sender) message = { ...message, sender: JSON.parse(item.sender) };
    if (item.reply) message = { ...message, reply: JSON.parse(item.reply) };
    messages = [...messages, message];
  });
  return messages;
};

/* TODO:
    1. Create DB ✅
    2: Send Messages ✅
    3: Get Messages ✅
    4: Delete Message ✅
    5: Edit Message ✅
 *  */
