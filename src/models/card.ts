import { Document, Schema, model } from 'mongoose';
import { UserDocumentInterface } from './user.js';

/**
 * Type representing the colors of Magic cards
 */
export type Color = 'White' | 'Blue'| 'Black' | 'Red' | 'Green' | 'Colorless' | 'Multicolor';

/**
 * Type representing the types of Magic cards
 */
export type LineType = 'Creature' | 'Planeswalker' | 'Instant' | 'Sorcery' | 'Enchantment' | 'Artifact' | 'Land';

/**
 * Type representing the rarities of Magic cards
 */
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Mythic';

interface CardDocumentInterface extends Document {
  owner: UserDocumentInterface,
  id: number,
  title: string,
  manaCost: number,
  color: Color
  type: LineType,
  rarity: Rarity,
  rulesText: string,
  powerToughness?: string,
  loyaltyCounter?: string,
  value: number
}

const CardSchema = new Schema<CardDocumentInterface>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  id : {
    type: Number,
    unique: true,
    required: true,
    trim:true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  manaCost: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    enum: ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless', 'Multicolor'],
  },
  type: {
    type: String,
    required: true,
    enum: ['Creature', 'Planeswalker', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Land'],
  },
  rarity: {
    type: String,
    required: true,
    enum: ['Common', 'Uncommon', 'Rare', 'Mythic'],
  },
  rulesText: {
    type: String,
    required: true,
    trim: true,
  },
  powerToughness: {
    type: String,
    trim: true,
  },
  loyaltyCounter: {
    type: String,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export const Card = model<CardDocumentInterface>('Card', CardSchema);