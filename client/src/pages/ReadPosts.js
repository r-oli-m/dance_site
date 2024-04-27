import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'

const ReadMates = (props) => {

    const [mates, setMates] = useState([]);

    useEffect(() => {
        setMates(props.data);
        const fetchMates = async () => {
            const { data } = await supabase
                .from('info')
                .select()
                .order('created_at', { ascending: true })

            setMates(data);
        }
        fetchMates();
    }, [props]);

    return (
        <div className="ReadPosts">
            {
                mates && mates.length > 0 ?
                    mates.map((mate, index) =>
                        <Card key={mate.id} id={mate.id} title={mate.title} description={mate.description} url={mate.url} created_at={mate.created_at}/>
                    ) : <h2>{'No Posts Yet 🫥'}</h2>
            }
        </div>
    )
}

export default ReadMates;