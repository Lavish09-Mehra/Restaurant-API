import express from 'express';
const app = express();

//Our Menu schema to store the food items 
import { menu as Menu } from './MenuData.js';

app.use(express.json());

import 'dotenv/config';

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected..');
        app.listen(3000, (req, res) => {
            console.log('http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error(err.message);
    });

app.get('/api/health', (req, res) => {
    res.status(200).json({
        sucess: 'up.. Boss'
    });
});

//To store Data in Menu 
app.post('/api/create-menu', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).json(menu);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//To add a new Items in exsisting one
app.post('/api/menu/add-item', async (req, res) => {
    const { meal, category, item } = req.body;
    // Valid meal and category names
    const meals = ["Breakfast", "Lunch", "Dinner"];
    const categories = ["mainCourse", "sides"];

    // Check if the meal is valid
    if (!meals.includes(meal)) {
        return res.status(400).json({
            message: "Invalid meal name"
        });
    }
    // Check if the category is valid
    if (!categories.includes(category)) {
        return res.status(400).json({
            message: "Invalid category"
        });
    }
    try {
        // Get the existing menu document
        const menu = await Menu.findOne();
        if (!menu) {
            return res.status(404).json({
                message: "Menu not found"
            });
        }
        // Add the new item to the selected array
        menu[meal][category].push(item);
        // Save the updated document
        await menu.save();
        res.status(200).json({
            message: "Item added successfully",
            menu
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//Display all the foods options Stored in Database
app.get('/api/menu', async (req, res) => {
    try {
        const foods = await Menu.find();
        res.status(200).json({
            message: "Enjoy the food..",
            result: foods
        });
    } catch (err) {
        res.status(500).json({
            message: "Oops... something went wrong",
            error: err.message
        });
    }
});

//To Search any specific meal category 
//Example by /api/meal/breakfast so it shows only breakfast
app.get('/api/menu/:meal', async (req, res) => {
  const meal = req.params.meal;

  //only allowed from the collections that we made not other 
  const allowed = ['Breakfast', 'Lunch', 'Dinner'];

  if (!allowed.includes(meal)) {
    return res.status(400).json({ message: 'Use Breakfast, Lunch, or Dinner' });
  }
  try {
    //Menu.findOne => means to just Find the specific meal not all
    const menuDoc = await Menu.findOne();
    if (!menuDoc) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    //return the meal ( Breakfast, Lunch and Dinner ) and items ( sides, MainCourse )
    return res.status(200).json({
      meal,
      items: menuDoc[meal] //items inside of sides, MainCourse
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//specific food item like Poha, Garlic naan
app.get('/api/menu-item/:item', async (req, res) => {
    //search item from database 
    const searchItem = req.params.item.toLowerCase();
    try {
        //find that specific item of food
        const menu = await Menu.findOne();
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        const meals = ["Breakfast", "Lunch", "Dinner"];
        //loop to find that specific food items in all arrays of meal
        for (const meal of meals) {
            //from both mainCourse and sides
            for (const category of ["mainCourse", "sides"]) {
                const normalize = str =>
                str.toLowerCase().replace(/\s+/g, "");
                //This line menu[meal][category] gets the array 
                //(like Breakfast.mainCourse or Dinner.sides) based on the current meal and category.
                const found = menu[meal][category].find(
                    food => normalize(food) === normalize(searchItem)
                );
                if (found) {
                    return res.json({
                        meal,          // Breakfast, lunch, dinner
                        category,     // Maincourse or sides
                        item: found  //  that specific food item
                    });
                }
            }
        }
        res.status(404).json({
            message: "Item not found"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.delete('/api/delete/:item', async (req, res) => {
    const item = req.params.item;
    try {
        const menu = await Menu.findOne();
        if (!menu) {
            return res.status(404).json({
                message: "Menu not found"
            });
        }
        const meals = ["Breakfast", "Lunch", "Dinner"];
        for (const meal of meals) {
            for (const category of ["mainCourse", "sides"]) {
                menu[meal][category] =
                    menu[meal][category].filter(
                        food => food.toLowerCase() !== item.toLowerCase()
                );
            }
        }
        await menu.save();
        res.json({
            message: `${item} deleted successfully`,
            menu
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});