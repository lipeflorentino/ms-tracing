import { v4 as uuid } from 'uuid';

import { Trace } from '../../models';

export const saveRequest = async (event, context) => {
  console.log('event', event);

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

  const newTrace = await Trace.create(params);

  console.log('Trace created!', params);

  return { message: 'Trace successfully created!', newTrace };
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

