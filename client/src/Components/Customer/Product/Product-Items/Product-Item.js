import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Product-Item.scss'

class ProductItem extends Component {
    render() {
        return (
            <div className="product-menu-box">
                <div className="product-menu-img">
                    <Link to='/productDetails' >
                        <img src={this.props.Information.image_name} alt="Chicke Hawain Pizza" className="img-responsive img-curve" />
                    </Link>
                </div>
                <div className="product-menu-desc">
                    <Link to='/productDetails'>
                        <h4>{this.props.Information.food_name}</h4>
                    </Link>
                    <p className="product-price">${this.props.Information.price}</p>
                    <p className="product-detail">{this.props.Information.description}</p>
                    <br />
                    <Link to="/order" className="btn btn-primary">Order Now</Link>
                </div>
            </div>
        );
    }
}



export default ProductItem;