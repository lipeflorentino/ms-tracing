import moment from 'moment';

import { Transaction, Request } from '../../models';

export const newTransaction = async (event, context) => {
  console.log('event', event.body);

  let statusCode;
  let data;
  let message;

  try {
    const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const { transactionId } = eventBody;

    const params = {
      status: 'initiated',
      transactionId,
      createdAt: moment().format("YYYY-MM-DD"),
      elapsedTime: Date.now(),
    };

    const transaction = await Transaction.create(params);

    console.log('transaction created successfully!', transaction);

    statusCode = 201;
    message = 'Trasaction created successfully!';
    data = transaction;
  } catch (error) {
    console.log('error', error);
    statusCode = 400;
    message = 'Failed to create transaction!';
    data = error;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      data,
    })
  }
};

export const deleteTransaction = async (event, context) => {
  let data;
  let message;
  let statusCode;

  console.log('event', event);

  try {
    const {
      transactionId,
      status,
      index,
    } = event.queryStringParameters;

    const requestsIds = await Transaction.query(index).eq(transactionId).where("status").eq(status).exec();

    console.log('requestsIds', requestsIds);

    return {

    };
  } catch (error) {
    console.log('error', error);
    return {

    }
  }
};

export const updateTransaction = async (event, context) => {
  console.log('event', event);

  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};

export const getTransaction = async (event, context) => {
  let message;
  let data;
  let statusCode;

  console.log('event', event);

  try {
    const {
      transactionId,
    } = event.queryStringParameters;

    const transaction = await Transaction.get(transactionId);

    console.log('transaction', transaction);

    const requests = await Request.query("transactionId").eq(transactionId).exec();

    console.log('response', requests);

    statusCode = 200;
    message = 'Transaction fecthed successfully!';
    data = { transaction, requests };
  } catch (error) {
    console.log('error', error);
    statusCode = 400;
    message = 'Failed to fecth transaction!';
    data = error;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
  }
};

export const listTransactions = async (event, context) => {
  let message;
  let data;
  let statusCode;

  console.log('event', event);

  const {
    param,
    index,
  } = event.queryStringParameters;

  console.log('params', { param, index });

  try {
    const transactions = await Transaction.query(index).eq(param).exec();

    console.log('transactions', transactions);

    statusCode = 200;
    message = 'Transaction fecthed successfully!';
    data = { transactions };
  } catch (error) {
    console.log('error', error);
    statusCode = 400;
    message = 'Failed to list transactions!';
    data = error;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
  }
}
