const FRIENDLY_FALLBACK = 'Something went wrong. Please try again.';

const sanitizeMessage = (message, fallbackMessage) => {
  if (typeof message !== 'string') {
    return fallbackMessage;
  }

  const trimmed = message.trim();

  if (!trimmed) {
    return fallbackMessage;
  }

  if (/^request failed with status code/i.test(trimmed)) {
    return fallbackMessage;
  }

  if (/^network error$/i.test(trimmed)) {
    return FRIENDLY_FALLBACK;
  }

  return trimmed;
};

const getApiError = (err, fallbackMessage = FRIENDLY_FALLBACK) => {
  const response = err && err.response;

  if (!response) {
    return {
      message: FRIENDLY_FALLBACK,
      statusText: FRIENDLY_FALLBACK,
      status: 0,
    };
  }

  const message = sanitizeMessage(response.data?.message, fallbackMessage);

  return {
    message,
    statusText: response.statusText || fallbackMessage,
    status: response.status || 500,
  };
};

export default getApiError;
export { FRIENDLY_FALLBACK, sanitizeMessage };
