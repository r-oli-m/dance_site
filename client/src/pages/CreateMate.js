import React, { useState } from 'react';
import './CreateMate.css';
import { supabase } from '../client';

const CreateMate = () => {
    const [mate, setMate] = useState({ title: "", description: "", url: "", created_at:null}); //props title, description, image 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMate((prev) => ({
            ...prev,
            [name]: value,
            created_at: new Date().toISOString()
        }));
    };

    const createMate = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from('info')
                .insert({ title: mate.title, description: mate.description , url: mate.url,
                    created_at: mate.created_at})
                .single();
    
            if (error) {
                console.error('Error creating crewmate:', error.message);
                return;
            }
    
            console.log('Crewmate created successfully:', data);
            window.location = '/gallery';
        } catch (error) {
            console.error('Error creating crewmate:', error.message);
        }
    };
    

    return (
        <div className='create-container'>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <input type="text" id="description" name="description" onChange={handleChange} /><br />
                <br />

                <label htmlFor="url">YouTube/Image URL (optional)</label><br />
                <input type="text" id="url" name="url" onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Submit" onClick={createMate} />
            </form>
        </div>
    );
};

export default CreateMate;
