import Category from "./Category";

interface Channel {
    id: string;
    name: string;
    category: Category;
    price: number;
}

export default Channel;