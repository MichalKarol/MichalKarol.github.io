import Listable from '@/models/listable';


interface Post extends Listable  {
    file: string;
    text: string;
}

export default Post;
