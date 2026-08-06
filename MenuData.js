import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
    Breakfast:{
        sides: [{
            type: String,
            required: true
        }],
        mainCourse: [{
            type: String,
            required: true
        }],
    },
    Lunch:{
        sides: [{
            type: String,
            required: true
        }],
        mainCourse: [{
            type: String,
            required: true
        }],
    },
    Dinner:{
        sides: [{
            type: String,
            required: true
        }],
        mainCourse: [{
            type: String,
            required: true
        }],
    },
}, { timestamps: true });

export const menu = mongoose.model('Menu', MenuSchema);