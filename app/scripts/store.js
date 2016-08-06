import SearchCollection from './collections/SearchCollection';
import VotedCollection from './collections/VotedCollection';
import BandModel from './models/BandModel';
import SessionModel from './models/SessionModel';
import VoteModel from './models/VoteModel';


export default({
    session: new SessionModel(),
    searchCollection: new SearchCollection(),
    votedCollection: new VotedCollection(),
    settings: {
      appKey: 'kid_Bk73T0yt',
      appSecret: '459bd8dee40445efaff271ecd91675c2',
      basicAuth: btoa('kid_Bk73T0yt:459bd8dee40445efaff271ecd91675c2')
    },
  });
