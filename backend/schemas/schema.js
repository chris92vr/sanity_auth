// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import user from './user';
import budget from './budget';
import expense from './expense';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to implement our type
  // We can implement our type in various ways
  types: [...schemaTypes, user, budget, expense],
});
