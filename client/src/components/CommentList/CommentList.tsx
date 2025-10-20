import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';


export default function CommentList() {
    const [comments, setComments] = useState([])
    const { slug } = useParams();


}
