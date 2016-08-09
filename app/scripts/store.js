import SearchCollection from './collections/SearchCollection';
import VotedCollection from './collections/VotedCollection';
// import BandModel from './models/BandModel';
import SessionModel from './models/SessionModel';
import VoteModel from './models/VoteModel';


export default({
    anonToken: 'afe43b20-9499-48f1-a1f7-7ffa9d8b99d4.dDsyxSzL3cOFa0ctR35XC5yHVsCN2Sh5551M/a+SibQ=',
    session: new SessionModel(),
    searchCollection: new SearchCollection(),
    votedCollection: new VotedCollection(),
    settings: {
      appKey: 'kid_Bk73T0yt',
      appSecret: '459bd8dee40445efaff271ecd91675c2',
      basicAuth: btoa('kid_Bk73T0yt:459bd8dee40445efaff271ecd91675c2')
    },
  });
