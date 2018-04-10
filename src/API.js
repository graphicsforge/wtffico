
// this is mock data
const userData = {
  'dugong@demo.edu': {
    text: 'Demo Dugong',
    value: 'dugong@demo.edu',
    image: {
      avatar: true,
      src: 'https://c402277.ssl.cf1.rackcdn.com/photos/330/images/story_full_width/SCR_58127.jpg',
    },
    data: {
      ficoScores: [
        { time: 1420088400, value: 570 },
        { time: 1435723200, value: 620 },
        { time: 1456808400, value: 600 },
        { time: 1480568400, value: 630 },
        { time: 1504238400, value: 580 },
        { time: 1509508800, value: 660 },
        { time: 1514869200, value: 694 },
        { time: 1517461200, value: 703 },
      ],
      ficoInfluencers: {
        creditHistoryLength: { value: 7 },
        creditAccounts: { value: 2 },
        creditUtilization: { value: 30 },
        latePayments: { value: 3 },
        newCreditAccounts: { value: 1 },
      },
    },
  },
  'donkey@demo.edu': {
    text: 'Demo Donkey',
    value: 'donkey@demo.edu',
    image: {
      avatar: true,
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/DemocraticLogo.svg',
    },
    data: {
      ficoScores: [
        { time: 1504409800, value: 620 },
        { time: 1509508800, value: 630 },
        { time: 1517461200, value: 694 },
      ],
      ficoInfluencers: {
        creditHistoryLength: { value: 1 },
        creditAccounts: { value: 1 },
      },
    },
  },
  'lichen@demo.edu': {
    text: 'Demo Lichen',
    value: 'lichen@demo.edu',
    image: {
      avatar: true,
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Letharia_vulpina_JHollinger_crop.jpg/220px-Letharia_vulpina_JHollinger_crop.jpg',
    },
    data: {
      ficoScores: [
        { time: 1522634667, value: 400 },
      ],
      ficoInfluencers: {
        creditUtilization: { value: 100 },
        creditAccounts: { value: 3 },
        newCreditAccounts: { value: 3 },
      },
    },
  },

};

class API {
  static getFICOInfo(user, callback) {
    // this should make a XMLHttpRequest to GET a user's FICO info
    // but is just a mock for demo purposes

    // we'd do this if we had a 4xx status
    if (!userData[user]) return callback('user not found!');

    // do this if we had a 2xx status
    return callback(null, userData[user]);
  }
}

API.userData = userData;
module.exports = API;
