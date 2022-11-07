const { Hero } = require('../models');

const heroData = [
    {
        name: "Iron Man",
        description: "Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity.",
        picture: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg",
    
    },
    {
        name: "Hulk",
        description: "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk.",
        picture: "https://cdn.vox-cdn.com/thumbor/Pvdo1lFYBBDbEG54FLW4tJ4pUcM=/0x0:2100x1181/1200x800/filters:focal(909x410:1245x746)/cdn.vox-cdn.com/uploads/chorus_image/image/67426099/experience_avengers_day.0.jpg"
            
    },
    {
        name: "Captain America",
        description: "Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America's one-man army.",
        picture: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg",
    },
    {
        name: "Black Widow",
        description: "",
        picture: "http://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b.jpg",
            
    },
    {
        name: "Black Panther",
        description: "",
        picture:  "http://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d.jpg",
            
    },
    {
        name: "Doctor Strange",
        description: "",
        picture:  "http://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85a501fe.jpg",
    
    },
    {
        name: "Agents of Atlas",
		description: "",
		picture: "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4ce18a834b7f5.jpg"
				
    },
    {
        name: "Agents Zero",
		description: "",
		picture: "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c0042121d790.jpg"
				
    },

   
]

const seedHero = () => Hero.bulkCreate(heroData);

module.exports = seedHero;