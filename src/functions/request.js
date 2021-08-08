import { v4 as uuid } from 'uuid';

import { Request, Transaction } from '../../models';

import Graph from 'graph-data-structure';

export const saveRequest = async (event, context) => {
  console.log('event', event.body);

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
      transactionId,
      type,
      service,
      input,
      output,
      errorTrace,
      status,
    };

    if (type !== 'body') {
      const request = await Request.query("type").eq(type).where("transactionId").eq(transactionId).exec();
      if (request && request.count > 0)
        throw new Error(`Already exists a request with type ${type} for the transaction ${transactionId}`);
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
    } = event.queryStringParameters || {};

    const request = await Request.get(requestId);

    if (!request) throw new Error(JSON.stringify({ errorMessage: 'Not found!', status: 404 }));

    console.log('request', request);

    data = request;
    message = 'Request retrieved successfully!';
    statusCode = 200;
  } catch (error) {
    const { errorMessage, status } = JSON.parse(error.message)
    console.log('error', errorMessage);

    data = null;
    message = errorMessage ? errorMessage : 'An error ocurred!';
    statusCode = status ? status : 400;
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
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  try {

  } catch (error) {

  }
};

