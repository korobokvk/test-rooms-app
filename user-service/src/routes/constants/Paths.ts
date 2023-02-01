/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';

const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Create: '/signup',
    Login: '/login',
  },
  Users: {
    Base: '/users',
    GetStatus: '/get-status',
    ConnectRoom: '/connect-room',
    DeleteRoom: '/delete-room',
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
