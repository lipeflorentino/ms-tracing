import { Transaction } from '../../models';

export const newTransaction = (event, context) => {
  console.log('event', event);

  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
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

export const updateTransaction = (event, context) => {
  console.log('event', event);

  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};

export const getTransaction = (event, context) => {
  console.log('event', event);

  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};
