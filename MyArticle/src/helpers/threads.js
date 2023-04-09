export const computeLastMessage = (thread, currentUserId) => {
  if (!thread || !currentUserId) {
    return '';
  }

  if (!thread.confirmed) {
    return thread.created_by === currentUserId
      ? 'Waiting for connection confirmation...'
      : 'Wants to connect with you.';
  } else if (thread.last_message) {
    return thread.last_message;
  }

  return '';
};

export const computeUnreadMessagesCount = (threadsCollection = {}) =>
  Object.keys(threadsCollection).reduce(
    (accumulator, threadId) =>
      accumulator + threadsCollection[threadId].unreadMessagesCount,
    0,
  );

export const computeMessagesHistoryDataset = (messagesArray = []) => {
  const MESSAGES_HISTORY_SIZE = 30;

  const convertMessagesDates = messages =>
    messages.map(messageItem => {
      if (messageItem.createdAt) {
        messageItem.createdAt = messageItem.createdAt.toString();
      }

      return messageItem;
    });

  if (!Array.isArray(messagesArray) || messagesArray.length < 1) {
    return [];
  } else if (messagesArray.length <= MESSAGES_HISTORY_SIZE) {
    return convertMessagesDates(messagesArray.slice());
  } else {
    return convertMessagesDates(
      messagesArray.slice(messagesArray.length - MESSAGES_HISTORY_SIZE),
    );
  }
};
