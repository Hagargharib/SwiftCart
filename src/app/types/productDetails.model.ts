
export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string; 
}

export interface ProductDetails {
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    images: string[];
    category: Category;
    subcategory: SubCategory[];
    brand: Brand;
    ratingsAverage: number;
    ratingsQuantity: number;
    sold: number;
    reviews: any[]; 
    createdAt: string;
    updatedAt: string;
    id: string; 
    __v: number
}

