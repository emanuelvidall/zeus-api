import {mongoose} from 'mongoose';

const expenseSchema = new mongoose.Schema({
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
    desc: {
      type: String,
      required: [true, 'nao pode ser vazio'],
    },
    date: {
      type: String,
      required: [true, 'nao pode ser vazio'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

const Expense = mongoose.model('Expense', expenseSchema, 'expenses');

export default Expense;

