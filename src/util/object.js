import { utcToDate } from '@util/date';

export const getTimestamps = (doc, pretty = false) => ({
  created: pretty ? utcToDate(doc.createTime.toDate()) : doc.createTime.seconds,
  updated: pretty ? utcToDate(doc.updateTime.toDate()) : doc.updateTime.seconds,
});

export const validate = async (schema, data) => schema.validate(data, { strict: true });

export const map = value => Object.entries(value).map(([id, name]) => ({ id, name }));
