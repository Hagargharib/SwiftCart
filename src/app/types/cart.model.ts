export interface Brand {
    image: string;
    name: string;
    slug: string;
    _id: string;
}
export interface Category {
    image: string;
    name: string;
    slug: string;
    _id: string;
}
export interface Subcategory {
    name: string;
    slug: string;
    _id: string;
    category: string;
}
export interface CartProduct {
    _id: string;
    count: number;
    price: number;
    product: {
        _id: string;
        id: string;
        title: string;
        imageCover: string;
        quantity: number;
        ratingAverage: number;
        brand: Brand;
        category: Category;
        subcategory: Subcategory[];
    };
}

export interface CartData {
    status: string;
    cartId: string;
    numOfCartItems: number;

    data: {
        _id: string;
        cartOwner: string;
        products: CartProduct[];
        totalCartPrice: number;
        createdAt: string;
        updatedAt: string;
        __v: number
    };
}