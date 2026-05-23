import initialState from './initialState';

export default (state = initialState.post, action) => {
  switch (action.type) {
    case 'CREATE_DONATION_POST': {
      return { ...state, donationPost: state.donationPost.concat(action.payload) };
    }

    case 'UPDATE_DONATION_POST': {
      const { _id } = action.payload;
      return { ...state, donationPost: state.donationPost.map((e) => (e._id === _id ? action.payload : e)) };
    }

    case 'GET_DONATION_POST': {
      return { ...state, donationPost: action.payload };
    }

    case 'DELETE_DONATION_POST': {
      return { ...state, donationPost: action.payload };
    }

    case 'CREATE_QUERY_POST': {
      return { ...state, queryPost: state.queryPost.concat(action.payload) };
    }

    case 'UPDATE_QUERY_POST': {
      const { _id } = action.payload;
      return { ...state, queryPost: state.queryPost.map((e) => (e._id === _id ? action.payload : e)) };
    }

    case 'GET_QUERY_POST': {
      return { ...state, queryPost: action.payload };
    }

    case 'DELETE_QUERY_POST': {
      return { ...state, queryPost: action.payload };
    }

    case 'GET_REPORTED_POSTS': {
      return { ...state, reportedPosts: action.payload}
    }

    case 'REPORT_POST': {
      const { id, userId } = action.payload;
      return { ...state, donationPost: state.donationPost.map((e) => (e._id === id ? {...e, reportIds: [...e.reportIds, userId]} : e)) };
    }

    case 'REPORT_QUERY': {
      const { id, userId } = action.payload;
      return { ...state, queryPost: state.queryPost.map((e) => (e._id === id ? {...e, reportIds: [...e.reportIds, userId]} : e)) };
    }

    case 'DELETE_REPORT_DONATION': {
      return { ...state, reportedPosts: {...state.reportedPosts, reportedDonations: action.payload.filter((donation) => donation.reportIds?.length !== 0)}}
    }

    case 'DELETE_REPORT_QUERY': {
      return { ...state, reportedPosts: {...state.reportedPosts, reportedQueries: action.payload.filter((query) => query.reportIds?.length !== 0)}}
    }

    case 'START_LOADING':
      return { ...state, loading: true };

    case 'STOP_LOADING':
      return { ...state, loading: false };

    default:
      return state;
  }
};
