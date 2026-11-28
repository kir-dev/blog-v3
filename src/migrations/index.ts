import * as migration_20261126_191503_init from './20261126_191503_init';
import * as migration_20261128_001518_drop_sanity_ids from './20261128_001518_drop_sanity_ids';

export const migrations = [
  {
    up: migration_20261126_191503_init.up,
    down: migration_20261126_191503_init.down,
    name: '20261126_191503_init',
  },
  {
    up: migration_20261128_001518_drop_sanity_ids.up,
    down: migration_20261128_001518_drop_sanity_ids.down,
    name: '20261128_001518_drop_sanity_ids'
  },
];
