import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MenuItem extends Component {
    isActive() {
        let {item, listState} = this.props;
        let str = [];
        // console.log(item);
        // console.log(listState);
        if (this.props.listState[item.index] === 'active') {
            let menu_item;
            // console.log(index);
            // console.log(item.child)
            for (menu_item of item.child) {
                // console.log(menu_item);
                str.push(<li><Link to={menu_item.link}>{menu_item.content}</Link></li>)
            }
        }
        // str = "123";
        return str;
    }
    render() {
        // console.log(this.props.item);
        let {item, listState} = this.props;
        // console.log(item.index);
        let childs = item.child;
        // console.log(childs);

        return(
            <div>
                <li>
                <Link className={listState[item.index]} to={item.link} onClick={()=>this.props.handleClickMenu(item.index)}>{item.content}</Link>
            </li>
            {this.isActive()}
            </div>
            
        );
        
    }
}

export default MenuItem;