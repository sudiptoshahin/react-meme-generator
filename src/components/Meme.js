
import React from "react";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemeImages, setAllMemeImages] = React.useState([]);

    /**
     * *************************************************************************************
     * useEffects takes a function as its parameter. If that function returns something,
     * it needs to be cleanup funciton. Otherwise, it should return nothing. If we make it an
     * async function then it automatically returns a promise instead of a function or nothing.
     * Therefore, if you want to use async operations insted of useEffect, you need to define the
     * funciton separately instead of the callback function as seen below:
     * **************************************************************************************
     */

    React.useEffect(() => {

        async function getMemes() {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const data = await res.json();
            setAllMemeImages(data.data.memes);
        }

        getMemes();

        return () => {

        }

    }, []);

    const getMemeImage = (e) => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);

        const url = allMemeImages[randomNumber].url;

        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url
        }));
    };

    function handleChange(event) {

        const { name, type, value, checked } = event.target;

        setMeme(prevFormData => {
            return {
                ...prevFormData,
                [ name ]: value
            }
        });
    }

    return (
        <main>
            <div>
                <form action="" className="form">
                    <input className="form--input"
                         placeholder="Top text" 
                         type="text"
                         name="topText"
                         onChange={ handleChange }              
                         value={ meme.topText } />
                    <input className="form--input" 
                        placeholder="Bottom text" 
                        type="text"
                        name="bottomText"
                        onChange={handleChange}
                        value={ meme.bottomText } />
                    <button className="form--button" onClick={getMemeImage}>Get a new meme image</button>
                </form>
            </div>

            <div className="flex flex-col items-center bg-slate-300">
                <img src={meme.randomImage} alt={meme.randomImage}
                    className="relative" />
                <div className="absolute h-1/2 flex flex-col justify-between">
                    <h2 className="block text-center p-5 text-5xl fill-blue-700 stroke-black font-black text-white" style={{ WebkitTextStroke: "3px black" }}>{ meme.topText }</h2>
                    <h2 className="block text-center p-5 text-5xl fill-blue-700 stroke-black font-black text-white" style={{ WebkitTextStroke: "3px black" }}>{ meme.bottomText }</h2>
                </div>
            </div>
        </main>
    );
}