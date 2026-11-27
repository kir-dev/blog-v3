import * as migration_20261126_191503_init from './20261126_191503_init';

export const migrations = [
  {
    up: migration_20261126_191503_init.up,
    down: migration_20261126_191503_init.down,
    name: '20261126_191503_init'
  },
];
