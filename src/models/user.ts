import { Document, Schema, model } from 'mongoose';

export interface UserDocumentInterface extends Document {
  name: string,
  username: string
}

const UserSchema = new Schema<UserDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
})

export const User = model<UserDocumentInterface>('User', UserSchema);