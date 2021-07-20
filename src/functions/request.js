import { v4 as uuid } from 'uuid';

import { Request, Transaction } from '../../models';

export const saveRequest = async (event, context) => {
  console.log('event', event);
  let message;
  let data;
  let statusCode;

  try {
    const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const {
      transactionId,
      type,
      service,
      input,
      output,
      errorTrace,
      status,
    } = eventBody;

    const params = {
      requestId: uuid(),
      transactionId,
      type,
      service,
      input,
      output,
      errorTrace,
      status,
    };

    const transaction = await Transaction.get(transactionId);

    if (!transaction) throw new Error(`The transaction ${transactionId} was not initiated!`);

    if (type !== 'body') {
      const request = await Request.query("type").eq(type).where("transactionId").eq(transactionId).exec();
      if (request && request.count > 0)
        throw new Error(`Already exists a request with type head for the transaction ${transactionId}`);
    }

    console.log('saving request!', params);

    const newRequest = await Request.create(params);

    console.log('Request saved!', params);

    if (type === 'tail') {
      console.log('updating transaction status...');
      await Transaction.update({ transactionId, status: errorTrace ? 'failed' : 'success' });
    }

    statusCode = 201;
    message = 'Request saved successfully!';
    data = newRequest;
  } catch (error) {
    console.log('error', error);
    statusCode = 400,
    message = 'Error saving request!';
    data = `${error}`;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
  }
};

export const getRequest = async (event, context) => {
  let data;
  let message;
  let statusCode;

  console.log('event', event);

  try {
    const {
      requestId,
      createdAt,
      status,
    } = event.queryStringParameters;

    const params = {
      requestId,
      createdAt,
      status,
    };

    const request = await Trace.get(params);

    console.log('request', request);

    data = request;
    message = 'Request retrieved successfully!';
    statusCode = 200;
  } catch (error) {
    console.log('error', error);
    data = error;
    message = 'An error ocurred!';
    statusCode = 400;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
  }
};

export const deleteRequest = (event, context) => {
  console.log('event', event);

  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
};

