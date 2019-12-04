import React, {Component} from 'react';

import Button from './form/Button';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {Link, Route, Switch, BrowserRouter as Router,} from 'react-router-dom';
import Global from '../env/faythe';
import CreateScaler from './CreateScaler';
import SweetAlert from 'sweetalert-react';
import '../../node_modules/sweetalert/dist/sweetalert.css';

class Clouds extends Component {
    constructor(props) {
        super(props);
        // var intervalID;
        this.state = {
            Content: "",
            showAlert: false,
            titleAlert: '',
            idAlert: ''
        }
        this.handleGetListCloud = this.handleGetListCloud.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.deleteCloud = this.deleteCloud.bind(this);
        this.editCloud = this.editCloud.bind(this);
        this.createScaler = this.createScaler.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
    }
    handleShowAlert(item) {
        console.log('fuck');
        // console.log(item);
        console.log(this.state.showAlert);
        console.log(this.state.idAlert);
        this.setState({
            showAlert: true,
            titleAlert: item.id,
            idAlert: item.id
        }, () =>   {
            console.log(this.state.idAlert);
        console.log(this.state.showAlert)    
        });
        

    }
    deleteCloud() {
        console.log('deletecloud')
        console.log(this.state.idAlert);
        // var xhr = new XMLHttpRequest()
        // xhr.addEventListener('load', () => {
        //     // console.log(xhr.responseText)
        //     let  resp = xhr.responseText;
        //     var data = this.renderContent(resp)
        //     this.setState({
        //         Content: data
        //     });
        //     // this.intervalID = setTimeout(this.handleGetListCloud.bind(this), 30000);

        // })
        // // xhr.open('GET', 'http://127.0.0.1:8600/clouds')
        // xhr.open('DELETE', 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/clouds"))
        // xhr.send()
    }
    editCloud(cid) {
        console.log(cid);
    }
    createScaler(cid) {
        console.log(cid);
    }
    renderContent(resp) {
        // return()
        let data = resp
        data = JSON.parse(data)
        console.log(data)
        var path = []
        var cloud;
        for (cloud in data.Data) {
            console.log(cloud);
            path.push(cloud);
        }
        console.log(path[0]);
        return [ Object.keys(data.Data).map((item, index) => (
            <div>
                <Card> 
                    <CardBody>
                        <CardTitle>CloudURL:{data.Data[item].auth.auth_url.split(":")[1].replace("//","")}</CardTitle>
                        <button className="btn btn-secondary"  
                            // onClick = { () => this.deleteCloud(data.Data[item].id)}>
                            onClick = { () => this.handleShowAlert(data.Data[item])}>
                            Delete cloud
                        </button>                        
                        <Link to={"/scalers/create/".concat(data.Data[item].id)} className="btn btn-secondary">Create scaler</Link>
            
                    </CardBody>
                </Card>
            </div>
        )), ]
    }
    componentDidMount() {
        this.handleGetListCloud();
    }
    // componentWillUnmount() {
    //     clearTimeout(this.intervalID);
    // }
    handleGetListCloud() {
        // e.preventDefault();
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            // console.log(xhr.responseText)
            let  resp = xhr.responseText;
            var data = this.renderContent(resp)
            this.setState({
                Content: data
            });
            // this.intervalID = setTimeout(this.handleGetListCloud.bind(this), 30000);

        })
        // xhr.open('GET', 'http://127.0.0.1:8600/clouds')
        xhr.open('GET', 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/clouds"))
        xhr.send()
        
    }
    render() {
        return(
            <div>
                {/* <form className="container" onSubmit={this.handleGetListCloud}>
                    <Button 
                        action = {this.handleGetListCloud}
                        type = {'primary'} 
                        title = {'Get list clouds'}
                        style={buttonStyle}
                    />
                </form> */}
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete cloud?"
                    text={this.state.titleAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showAlert: false })}
                    onEscapeKey={()     => this.setState({ showAlert: false })}
                    onCancel={()        => this.setState({ showAlert: false })}
                    onConfirm={()       => this.deleteCloud()}
                />
                <div>
                    {this.state.Content}
                </div>
            </div>
            
            
        )
    }
}

const buttonStyle = {
    margin : '10px 10px 10px 10px'
  }
  

export default Clouds;