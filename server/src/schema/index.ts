import './message.js';
import './post.js';
import './user.js';
import { DateTimeResolver } from 'graphql-scalars';
import { builder } from '../builder.js';

builder.mutationType({});
builder.queryType({});
builder.subscriptionType({});
builder.addScalarType('DateTime', DateTimeResolver, {});

export const schema = builder.toSchema();
