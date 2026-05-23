import { toast } from 'react-toastify';
import {
  createDonationPost,
  createQueryPost,
  deleteDonationPost,
  deleteQueryPost,
  getDonationPost,
  getQueryPost,
  getReportedPosts,
  reportPost,
  updateDonationPost,
  updateQueryPost,
} from '../api/postsApi';

const donationPostAction = (payload) => {
  return {
    type: 'CREATE_DONATION_POST',
    payload,
  };
};

const updateDonationPostAction = (payload) => {
  return {
    type: 'UPDATE_DONATION_POST',
    payload,
  };
};

const getDonationPostAction = (payload) => {
  return {
    type: 'GET_DONATION_POST',
    payload,
  };
};

const deleteDonationPostAction = (payload) => {
  return {
    type: 'DELETE_DONATION_POST',
    payload,
  };
};

const queryPostAction = (payload) => {
  return {
    type: 'CREATE_QUERY_POST',
    payload,
  };
};

const updateQueryPostAction = (payload) => {
  return {
    type: 'UPDATE_QUERY_POST',
    payload,
  };
};

const getReportedPostsAction = (payload) => {
  return {
    type: 'GET_REPORTED_POSTS',
    payload
  }
}

const reportPostAction = (id, userId, type) => {
  return {
    type: `REPORT_${type.toUpperCase()}`,
    payload: { id, userId },
  };
};

const deleteReportDonationAction = (payload) => {
  return {
    type: 'DELETE_REPORT_DONATION',
    payload,
  };
};

const deleteReportQueryAction = (payload) => {
  return {
    type: 'DELETE_REPORT_QUERY',
    payload,
  };
};

const getQueryPostAction = (payload) => {
  return {
    type: 'GET_QUERY_POST',
    payload,
  };
};

const deleteQueryPostAction = (payload) => {
  return {
    type: 'DELETE_QUERY_POST',
    payload,
  };
};

export const startLoadingAction = () => {
  return {
    type: 'START_LOADING',
  };
};

export const stopLoadingAction = () => {
  return {
    type: 'STOP_LOADING',
  };
};

export const CreateDonationPost = (data) => async (dispatch) => {
  try {
    const post = await createDonationPost(data);
    if (post.status === 201) {
      dispatch(donationPostAction(post.data));
      toast.success('Donation created successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const UpdateDonationPost = (data, id) => async (dispatch) => {
  try {
    const post = await updateDonationPost(data, id);
    if (post.status === 200) {
      dispatch(updateDonationPostAction(post.data));
      toast.success('Donation updated successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const GetDonationPost = () => async (dispatch) => {
  dispatch(startLoadingAction());
  const post = await getDonationPost();
  if (post.status === 200) {
    dispatch(getDonationPostAction(post.data));
    dispatch(stopLoadingAction());
  }
};

export const DeleteDonationPost = (id) => async (dispatch) => {
  dispatch(startLoadingAction());
  const post = await deleteDonationPost(id);
  if (post.status === 200) {
    dispatch(deleteDonationPostAction(post.data));
    toast.success('Donation deleted successfully');
    dispatch(stopLoadingAction());
  }
};


export const CreateQueryPost = (data) => async (dispatch) => {
  try {
    const query = await createQueryPost(data);
    if (query.status === 201) {
      dispatch(queryPostAction(query.data));
      toast.success('Query created successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const GetQueryPost = () => async (dispatch) => {
  dispatch(startLoadingAction());
  const query = await getQueryPost();
  if (query.status === 200) {
    dispatch(getQueryPostAction(query.data));
    dispatch(stopLoadingAction());
  }
};

export const DeleteQueryPost = (id) => async (dispatch) => {
  dispatch(startLoadingAction());
  const query = await deleteQueryPost(id);
  if (query.status === 200) {
    dispatch(deleteQueryPostAction(query.data));
    toast.success('Query deleted successfully');
    dispatch(stopLoadingAction());
  }
};


export const UpdateQueryPost = (data, id) => async (dispatch) => {
  try {
    const post = await updateQueryPost(data, id);
    if (post.status === 200) {
      dispatch(updateQueryPostAction(post.data));
      toast.success('Query updated successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const GetReportedPosts = () => async (dispatch) => {
  dispatch(startLoadingAction());
  const post = await getReportedPosts();
  if (post.status === 200) {
    dispatch(getReportedPostsAction(post.data));
    dispatch(stopLoadingAction());
  }
};


export const ReportPost = (id, userId, type) => async (dispatch) => {
  try {
    const post = await reportPost(id, type);
    if (post.status === 200) {
      dispatch(reportPostAction(id, userId, type));
      toast.success(post.data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
  }
};

export const DeleteReportDonation = (id) => async (dispatch) => {
  dispatch(startLoadingAction());
  const post = await deleteDonationPost(id);
  if (post.status === 200) {
    dispatch(deleteReportDonationAction(post.data));
    toast.success('Donation deleted successfully');
    dispatch(stopLoadingAction());
  }
};

export const DeleteReportQuery = (id) => async (dispatch) => {
  dispatch(startLoadingAction());
  const query = await deleteQueryPost(id);
  if (query.status === 200) {
    dispatch(deleteReportQueryAction(query.data));
    toast.success('Query deleted successfully');
    dispatch(stopLoadingAction());
  }
};