import React, { Component } from 'react';
import { getProducts, getProductsByName } from '../API/Connect-API';
import "./Product.scss";
import ProductItem from './Product-Items/Product-Item';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            position: 0,
            status_load_element: "hide",
            content_search: false
        };
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.Products) {
            //get status for component
            const status_load_element = (nextProps.status_load_element) ? nextProps.status_load_element : "hide";
            //get position
            const position = nextProps.Products.length;
            //load product in category name
            return {
                Products: nextProps.Products,
                position: position,
                status_load_element: status_load_element,
                content_search: nextProps.ContentSearch
            }
        }
        return { undefined }
    }

    LoadMoreProduct = async () => {
        //function load more product
        //two case
        //1: load by all products
        //2: load by search result
        if (this.state.content_search) {
            //case 1
            const limit = 6;
            const position = this.state.position;
            const list_products = await getProducts(limit, position);
    
            let new_list_products = this.state.Products;
            new_list_products.push(...list_products.data);
    
            this.setState({
                Products: new_list_products,
                position: position + limit
            });
        } else {
            //case 2
            const limit = 6;
            const position = this.state.position;
            const list_products = await getProductsByName(this.state.content_search ,limit, position);
    
            let new_list_products = this.state.Products;
            new_list_products.push(...list_products.data);
    
            this.setState({
                Products: new_list_products,
                position: position + limit
            });
        }
    }

    render() {
        return (
            <section className="product-menu">
                <div className="container">
                    <h2 className="text-center">Foods Menu</h2>
                    {this.state.Products.map((Element, Index) => {
                        //render row
                        return (
                            <div className="product-reposive" key={Index}>
                                <ProductItem
                                    key={Index}
                                    Information={Element}
                                    ClickDetails={this.props.ClickDetails}
                                    HandleOrder={this.props.HandleOrder}
                                ></ProductItem>
                            </div>
                        );
                    })}
                </div>
                <div className="clearfix" />
                <p className={`text-center ${this.state.status_load_element}`}>
                    <span className="pink pointer" onClick={this.LoadMoreProduct}>See More Foods</span>
                </p>
            </section>

        );
    }
}

export default Product;