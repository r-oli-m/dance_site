import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client';

const EditPost = ({ data }) => {

    const { id } = useParams();
    const [mate, setMate] = useState({ title: "", description: "", url: ""}); //props title, description, image 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMate((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const updateMate = async (event) => {
        event.preventDefault();

        await supabase
            .from('info')
            .update({ title: mate.title, description: mate.description , url: mate.url})
            .eq('id', id);

        window.location = "/gallery";
    }

    const deleteMate = async (event) => {
        event.preventDefault();
        await supabase
            .from('info')
            .delete()
            .eq('id', id);
        window.location = '/gallery';
    }
    return (
        <div class='edit-container'>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <input type="text" id="description" name="description" onChange={handleChange} /><br />
                <br />

                <label htmlFor="url">Image URL</label><br />
                <input type="text" id="url" name="url" onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Submit" onClick={updateMate} />
                <button className="deleteButton" onClick={deleteMate}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost