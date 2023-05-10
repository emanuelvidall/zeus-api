import {mongoose} from 'mongoose';

const costSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: [true, 'nao pode ser vazio'],
      },
    type: {
      type: String,
      required: [true, 'nao pode ser vazio'],
    },
    quantity: {
      type: Number,
      required: [true, 'nao pode ser vazio'],
    },
    description: {
      type: String,
      required: [true, 'nao pode ser vazio'],
    },
    date: {
      type: String,
      required: [true, 'nao pode ser vazio'],
    },
  });

const Expense = mongoose.model('Expense', costSchema);

module.exports = Expense;
