export interface WishlistItem {
    _id: string;
    id: string;
    title: string;
    description: string;
    slug: string;
    imageCover: string;
    images: string[];
    price: number;
    priceAfterDiscount?: number;
    quantity: number;
    sold: number | null;
    ratingsAverage: number;
    ratingsQuantity: number;
    category: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    subcategory: {
        _id: string;
        name: string;
        slug: string;
        category: string;
    }[];
    brand?: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface WishlistData {
    data: WishlistItem[];
    count:number;
}
