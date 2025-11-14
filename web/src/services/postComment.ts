import axios from "axios";
import errorHandler from "../helpers/errorHandler";
import { ParamValue } from "next/dist/server/request/params";

type CommentPostProps = {
    body: string,
    headers?: any,
    slug: ParamValue,
}

async function postComment({ body, headers, slug }: CommentPostProps) {
    try {
        const { data } = await axios({
            data: { comment: { body } },
            headers,
            method: "POST",
            url: `api/posts/${slug}/comments`,
        });

        return data.comment;
    } catch (error) {
        errorHandler(error);
    }
}

export default postComment;