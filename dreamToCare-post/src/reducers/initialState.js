const initialState = {
  auth: {
    isSignedIn: false,
    isNgo: false,
    id: null,
    name: '',
    ngoName: '',
    accountHolderName: '',
    email: '',
    address: '',
    cnic: '',
    token: null,
    status: '',
    isAdmin: false
  },
  post: {
    loading: false,
    donationPost: [],
    queryPost: [],
    reportedPosts: {
      reportedDonations: [],
      reportedQueries: []
    }
  },
  messages: [],
  locations: [],
  gotNotification: false
};

export default initialState;
