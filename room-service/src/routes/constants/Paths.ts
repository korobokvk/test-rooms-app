/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';

const Paths = {
  Base: '/api',
  Room: {
    Base: '/rooms',
    GetAll: '/',
    Add: '/',
    Get: '/:id',
    Delete: '/:id',
    ConnectToRoom: '/connect-to-room',
    RemoveFromRoom: '/remove-room',
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
