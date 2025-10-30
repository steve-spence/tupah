'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import CommentList from "../CommentList/CommentList"
import postComment from "../../services/postComment"
import TableBody from '@mui/material/TableBody'
//import { useAuth } from "../../context/AuthContext";

type CommentEditorProps = {
    updateComments: (e: any) => void,
}

export default function CommentEditor({ updateComments }: CommentEditorProps) {
    const [{ body }, setForm] = useState({ body: "" })

    //const [form, setForm] = useState({ body: ""});
    //const { body } = form; ** what the above code is doing ** 

    //const { headers, isAuth, loggedUser } = useAuth();
    const headers = null;
    const { slug } = useParams();


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (body.trim() == "") return;

        postComment({ body, headers, slug })
            .then(updateComments)
            .then(() => setForm({ body: "" }))
            .catch(console.error);
    }

    const handleChange = (e: any) => {
        setForm({ body: e.target.value })
    }

    return (
        <form className="">
            <div>
                <textarea
                    className=''
                    onChange={handleChange}
                    placeholder='Write a comment'
                    value={body}
                ></textarea>
            </div>
            <div className="">
                <button className="">Post Comment</button>
            </div>
        </form>
    )
}