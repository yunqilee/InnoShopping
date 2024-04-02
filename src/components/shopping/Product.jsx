export const Product = ({product, addToCart, cartItemsCount}) => {
    return (
        <div key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.thumbnail} alt={product.title} style={{width: '100px', height: '100px'}}/>
            <p>{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <button className="addToCartBtn" onClick={() => addToCart(product.id)}>
                Add to Cart {cartItemsCount > 0 && <> ({cartItemsCount})</>}
            </button>
        </div>
    )
}