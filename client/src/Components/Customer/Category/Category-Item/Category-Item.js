import React, { Component } from 'react';
import './Category-Item.scss';
import { Link } from 'react-router-dom';

class CategoryItem extends Component {

    ClickComponent = () => {
        const NameCategory = this.props.Information.NameCategory;
        this.props.ClickCategoryItem(NameCategory);
    }

    handleNoImage = (e) => {
        e.target.src = "/Images/Categories/no-image.png"
        e.onerror = null
    }

    render() {
        return (
            <>
                <Link action="true" to="/products" onClick={this.ClickComponent}>
                    <div className="box-3 float-container img-curve">
                        <img
                            src={this.props.Information.PathImage}
                            alt="  "
                            className="img-curve"
                            onError={e => {this.handleNoImage(e)}}
                        />
                        <h3 className="float-text text-white">{this.props.Information.NameCategory}</h3>
                    </div>
                </Link>
            </>
        );
    }
}

export default CategoryItem;