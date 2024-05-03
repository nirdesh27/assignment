import mongoose from 'mongoose';
import { Password } from '../services/password';

enum Genre {
    Action = 'Action',
    Comedy = 'Comedy',
    Drama = 'Drama',
    Fantasy = 'Fantasy',
    Horror = 'Horror',
    Romance = 'Romance',
    SciFi = 'SciFi'
}
interface ListAttrs{
    id: string;
    title: string;
    description: string;
    genres: Genre[]; // Array of Genre type
    email: String
}
interface ListDoc extends Document{
    id: string;
    title: string;
    description: string;
    genres: Genre[]; // Array of Genre type
    email: String
}
// An interface that describes the properties
// that a User Model has
interface ListModel extends mongoose.Model<ListDoc> {
  build(attrs: ListAttrs): ListDoc;
}


const listSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: { type: [{ type: String, enum: Object.values(Genre) }], required: true },
    email: {
        type: String,
        required: true
    }
}
);


listSchema.statics.build = (attrs: ListAttrs) => {
  return new List(attrs);
};

const List = mongoose.model<ListDoc, ListModel>('List', listSchema);

export { List, Genre };
