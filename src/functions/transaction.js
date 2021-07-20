import { Transaction } from '../../models';

export const newTransaction = async (event, context) => {
  let statusCode;
  let data;
  let message;

  try {
    const params = {
      status: 'initiated',
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
  console.log('event', event);

  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};
