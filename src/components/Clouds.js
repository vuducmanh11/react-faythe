import React, {Component} from 'react';

// import Button from './form/Button';
import { Card,  CardBody, CardTitle, } from 'reactstrap'; // CardImg, CardText, CardSubtitle 
import {Link, } from 'react-router-dom'; // Route, Switch, BrowserRouter as Router,
import Global from '../env/faythe';
// import CreateScaler from './CreateScaler';
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
            textAlert: '',
            idAlert: '',
            showNotify: false,
            titleNotify: '',
            textNotify: ''
        }
        this.handleGetListCloud = this.handleGetListCloud.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.deleteCloud = this.deleteCloud.bind(this);
        this.editCloud = this.editCloud.bind(this);
        this.createScaler = this.createScaler.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.handleConfirmCloud = this.handleConfirmCloud.bind(this);
    }
    handleConfirmCloud(item) {
        console.log('confirm delete');
        // console.log(item);
        console.log(this.state.showAlert);
        console.log(this.state.idAlert);
        this.setState({
            showAlert: true,
            // titleAlert: item.id,
            idAlert: item.id
        }, () =>   {
            console.log(this.state.idAlert);
        console.log(this.state.showAlert)    
        });
    }
    handleShowAlert() {
        console.log('handle show aler');
        // console.log(item);
        console.log(this.state.showAlert);
        console.log(this.state.idAlert);
        this.setState({
            showAlert: true,
            titleAlert: `Delete cloud ${this.state.idAlert}`,
            textAlert: "Success!"
        }
        // , () =>   {
        //     console.log(this.state.idAlert);
        // console.log(this.state.showAlert)    
        // }
        );
    }

    handleHideAlert() {
        this.setState({
            showAlert: false,
        })
    }

    handleHideNotify() {
        this.setState({
            showNotify: false,
        })
    }

    deleteCloud() {
        console.log('deletecloud');
        this.handleHideAlert();
        console.log(this.state.idAlert);
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            // console.log(xhr.responseText)
            console.log(xhr)
            // var response = JSON.parse(xhr.response)
            // if (response["Code"] !== 200) {
            //     this.setState({
            //         titleAlert: response["Status"],
            //         textAlert: response["Err"]
            //     })
            // } else {
            //     this.setState({
            //         titleAlert: "Delete success!!"
            //     })
            // }
            var response = JSON.parse(xhr.response)
            if (response["Status"] === "OK") {
                this.setState({
                    showNotify: true,
                    titleNotify: "Delete success!",
                    textAlert: '',
                })
            }
            console.log(xhr.response)
            this.handleGetListCloud()

        })
        // xhr.open('GET', 'http://127.0.0.1:8600/clouds')
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/clouds/delete/").concat(this.state.idAlert)
        console.log(url)
        xhr.open('POST', url)
        xhr.send()
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
                            onClick = { () => this.handleConfirmCloud(data.Data[item])}>
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
    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }
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
            this.intervalID = setTimeout(this.handleGetListCloud.bind(this), 300000);

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
                <h1>Danh sách các hệ thống đám mây</h1> 
                <br />
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete cloud?"
                    text={this.state.idAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showAlert: false })}
                    onEscapeKey={()     => this.setState({ showAlert: false })}
                    onCancel={()        => this.setState({ showAlert: false })}
                    onConfirm={()       => this.deleteCloud()}
                />
                <SweetAlert
                    show={this.state.showNotify}
                    title={this.state.titleNotify}
                    text={this.state.textNotify}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showNotify: false })}
                    onEscapeKey={()     => this.setState({ showNotify: false })}
                    onCancel={()        => this.setState({ showNotify: false })}
                    onConfirm={()       => this.handleHideNotify()}
                />
                <div>
                    {this.state.Content}
                </div>
            </div>
            
            
        )
    }
}

// const buttonStyle = {
//     margin : '10px 10px 10px 10px'
//   }
  

export default Clouds;