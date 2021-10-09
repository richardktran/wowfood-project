import React, { Component } from 'react';
import { getProducts } from '../API/Connect-API';
import Footer from '../Footer/Footer';
import Product from '../Product/Product';
import Search from '../Search/Search';
import Social from '../Social/Social';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Products: []
        };
    }

    async componentDidMount() {
        //get list product limit 6 element
        const limit = 6;
        const products = await getProducts(limit);
        this.setState({
            Products: products.data
        });
    }

    static async getDerivedStateFromProps(nextProps) {
        if (nextProps.ClickProductsItem) {
            //get list product
            const limit = 6;
            const products = await getProducts(limit);
            return ({
                Products: products.data
            });
        }
        if (nextProps.NameCategoryWillLoad) {
            //this method run when click to category
            //load product in category name
            const limit = 6;
            const products = await getProducts(limit);
            //console.log(products);
            return ({
                Products: products.data
            });
        }
        return { undefined };
    }

    render() {
        return (
            <>
                <Search></Search>
                <Product Products={this.state.Products}></Product>
                <Social></Social>
                <Footer></Footer>
            </>
        );
    }
}

export default Products;