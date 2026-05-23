import { toast } from 'react-toastify';
import { getMessages, postMessage } from '../api/postsApi';

const getMessagesAction = (payload) => {
  return {
    type: 'GET_MESSAGES',
    payload,
  };
};

const postMessagesAction = (payload) => {
  return {
    type: 'POST_MESSAGES',
    payload,
  };
};

export const GetMessages = (byTime) => async (dispatch) => {
  const messages = await getMessages(byTime);
  if (messages.status === 200) {
    dispatch(getMessagesAction(messages.data));
    window.localStorage.setItem('notifyCount', messages.data?.length)
  }
};

export const PostMessage = (data) => async (dispatch) => {
  const messages = await postMessage(data);
  if (messages.status === 201) {
    toast.success('Donation sent successfully');
    dispatch(postMessagesAction(messages.data));
  }
};
