import './message';
import './post';
import './user';
import { DateTimeResolver } from 'graphql-scalars';
import { builder } from '../builder';

builder.mutationType({});
builder.queryType({});
builder.subscriptionType({});
builder.addScalarType('DateTime', DateTimeResolver, {});

export const schema = builder.toSchema();
