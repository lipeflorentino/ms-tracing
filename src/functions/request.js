import { Request, Transaction } from '../../models';

import { default as generateId } from '../utils/generateId';

import moment from 'moment';

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
      function: functionName,
      input,
      output,
      errorTrace,
      status,
    } = eventBody;

    const params = {
      transactionId,
      type,
      service,
      function: functionName,
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

    params.requestId = generateId(`${Date.now + Math.random() + params}`);
    params.createdAt = moment().format("YYYY-MM-DDThh:mm:ss:SSS");
    params.elapsedTime = Date.now();

    console.log('saving request!', { params });

    const newRequest = await Request.create(params);

    console.log('Request saved!', newRequest);

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

    console.log('request', request);

    if (!request) throw new Error(JSON.stringify({ errorMessage: 'Not found!', status: 404 }));

    data = request;
    message = 'Request retrieved successfully!';
    statusCode = 200;
  } catch (error) {
    console.log('error', errorMessage);
    const { errorMessage, status } = JSON.parse(error.message)

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

export const listRequests = async (event, context) => {
  let data;
  let message;
  let statusCode;

  console.log('event', event);

  const {
    param,
    index,
  } = event.queryStringParameters || {};

  console.log('params', { param, index });

  try {
    const requests = await Request.query(index).eq(param).exec();

    console.log('requests', requests);

    data = { requests };
    message = 'Requests list retrieved successfully!';
    statusCode = 200;
  } catch (error) {
    console.log('error', error);
    statusCode = 400;
    message = 'Failed to list requests!';
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

export const deleteRequest = (event, context) => {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  try {

  } catch (error) {

  }
};

