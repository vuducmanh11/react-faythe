import React, {Component} from 'react';

import Button from './form/Button';
import { Form, } from 'reactstrap'; // FormGroup, Label, Input,
import { Card, CardBody, CardTitle, } from 'reactstrap'; //CardImg, CardText, CardSubtitle
import Global from '../env/faythe';
// import { thisTypeAnnotation } from '@babel/types';
import SweetAlert from 'sweetalert-react';
import '../../node_modules/sweetalert/dist/sweetalert.css';


class ListScaler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            titleAlert: '',
            textAlert: '',
            idAlert: '',
            showActiveAlert: false,
            textActiveAlert: '',
            showInactiveAlert: false,
            textInactiveAlert: '',
            showNotify: false,
            titleNotify: '',
            textNotify: '',
            Content: "No value",
            data: [],
            cloudpath: "",
            cloud_id: '',
            scaler_id: ''
        }
        // this.handeleGetListScalers = this.handeleGetListScalers.bind(this);
        this.selectCloud = this.selectCloud.bind(this);
        this.getScaler = this.getScaler.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.deleteScaler = this.deleteScaler.bind(this);
        this.updateScaler = this.updateScaler.bind(this);
        this.activeScaler = this.activeScaler.bind(this);
        this.inactiveScaler = this.inactiveScaler.bind(this);
        // this.handleShowAlert = this.handleShowAlert.bind(this);
        this.confirmDeleteScaler = this.confirmDeleteScaler.bind(this);
    }
    componentDidMount() {
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            let  data = xhr.responseText;
            data = JSON.parse(data).Data;
            
            this.setState({
                data: data
            })

        })
        // xhr.open('GET', 'http://127.0.0.1:8600/clouds')
        xhr.open('GET', 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/clouds"))
        xhr.send()
        
    }

    selectCloud = (e) => {
        console.log(e.target.value);
        this.setState({
            cloudpath: e.target.value
        })
    }

    updateScaler(c) {
        console.log(c)
    }
    confirmDeleteScaler(path, sid) {
        console.log("Confirm delete scaler");
        var cid = path.split('/')[2]
        console.log(cid, sid)
        this.setState({
            textAlert: sid,
            showAlert: true,
            cloud_id: cid,
            scaler_id: sid,
        })
    }
    confirmActiveScaler(path, sid) {
        console.log("Confirm active scaler");
        var cid = path.split('/')[2]
        console.log(path, cid, sid)
        this.setState({
            textActiveAlert: sid,
            showActiveAlert: true,
            cloud_id: cid,
            scaler_id: sid,
        })
    }
    confirmInactiveScaler(path, sid) {
        console.log("Confirm inactive scaler");
        var cid = path.split('/')[2]
        console.log(cid,sid)
        this.setState({
            textInactiveAlert: sid,
            showInactiveAlert: true,
            cloud_id: cid,
            scaler_id: sid,
        })
    }
    deleteScaler() {
        console.log("Delete scaler process")
        this.setState({
            showAlert: false
        })
        var xhr = new XMLHttpRequest()
        
        xhr.addEventListener('load', () => {
            this.getListScaler();
            console.log(xhr.response)
            var response = JSON.parse(xhr.response)
            if (response["Status"] === "OK") {
                this.setState({
                    showNotify: true,
                    titleNotify: "Delete success!",
                    textNotify: '',
                })
            } else {
                this.setState({
                    showNotify: true,
                    titleNotify: "Delete failed!!",
                    textNotify: '',
                })
            }
            // this.render();
        })
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/delete/")
        .concat(this.state.cloud_id).concat('/').concat(this.state.scaler_id);
        // console.log(url);
        xhr.open('POST', url);
        xhr.send();
    }
    
    handleHideNotify() {
        this.setState({
            showNotify: false
        })
    }

    activeScaler() {
        this.setState({
            showActiveAlert: false
        })
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            this.getListScaler();
            console.log("Active success");
        })
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/active/")
        .concat(this.state.cloud_id).concat('/').concat(this.state.scaler_id);
        console.log(url)
        xhr.open('POST', url);
        xhr.send();
    }
    
    inactiveScaler() {
        this.setState({
            showInactiveAlert: false
        })
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            this.getListScaler();
            console.log("Active success");
        })
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/inactive/")
        .concat(this.state.cloud_id).concat('/').concat(this.state.scaler_id);
        xhr.open('POST', url);
        xhr.send();
    }

    getListScaler() {
        console.log("Cloud path");
        console.log(this.state.cloudpath);
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            let data = xhr.responseText;
            data = JSON.parse(data);
            console.log("list scaler");
            console.log(typeof(data.Data));
            if (Object.keys(data.Data).length === 0) {
                this.setState({
                    Content: "No scaler found"
                })
            } else {
                var scalers = this.renderContent(data)
                this.setState({
                    Content: scalers
                })
            }
        })
        // var url = "http://127.0.0.1:8600/scalers/".concat(this.state.cloudpath.replace("/clouds/",""))
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/").concat(this.state.cloudpath.replace("/clouds/",""))
        console.log(url)
        xhr.open('GET', url)
        xhr.send()
    }
    getScaler(e) {
        e.preventDefault();
        this.getListScaler()
        // console.log("Cloud path");
        // console.log(this.state.cloudpath);
        // var xhr = new XMLHttpRequest()
        // xhr.addEventListener('load', () => {
        //     let data = xhr.responseText;
        //     data = JSON.parse(data);
        //     console.log("list scaler");
        //     console.log(typeof(data.Data));
        //     if (Object.keys(data.Data).length === 0) {
        //         this.setState({
        //             Content: "No scaler found"
        //         })
        //     } else {
        //         var scalers = this.renderContent(data)
        //         this.setState({
        //             Content: scalers
        //         })
        //     }
        // })
        // // var url = "http://127.0.0.1:8600/scalers/".concat(this.state.cloudpath.replace("/clouds/",""))
        // var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/").concat(this.state.cloudpath.replace("/clouds/",""))
        // console.log(url)
        // xhr.open('GET', url)
        // xhr.send()
    }

    renderContent(data) {
        console.log(data)
        var path = []
        var scaler;
        for (scaler in data.Data) {
            console.log(scaler);
            path.push(scaler);
        }
        console.log(path[0]);
        return Object.keys(data.Data).map((item, index) => (
            <div>
                <Card> 
                    <CardBody>
                        <button className={data.Data[item].active ? "btn btn-success": "btn btn-danger"}
                            style={{"float":"right","textAlign":"center","padding":"0","borderRadius":"50%",
                            "width":"35px","height":"35px","lineHeight":"35px","fontSize":"0.9rem"}} >
                        </button>
                        <CardTitle>ID:{data.Data[item].id}</CardTitle>
                        <CardTitle>State:{data.Data[item].active ? "active": "inactive"}</CardTitle>
                        <CardTitle>Tags: {data.Data[item].tags.toString()}</CardTitle>
                        <CardTitle>Query: ....{data.Data[item].query.substr(data.Data[item].query.length - 35)}</CardTitle>
                        <button className="btn btn-secondary"  
                            onClick = { () => this.confirmDeleteScaler(item, data.Data[item].id,)}>
                            Delete scaler
                        </button>
                        {   data.Data[item].active 
                        ? 
                        <button className="btn btn-secondary" 
                            style={{marginLeft: '2%'}} 
                            // onClick = { () => data.Data[item].active ? this.inactiveScaler(data.Data[item].cid,data.Data[item].id): 
                            // this.activeScaler(data.Data[item].cid,data.Data[item].id)}
                            onClick = { () => this.confirmInactiveScaler(item, data.Data[item].id)}
                            >
                            Inactive
                        </button>
                        :
                        <button className="btn btn-secondary" 
                            style={{marginLeft: '2%'}} 
                            // onClick = { () => data.Data[item].active ? this.inactiveScaler(data.Data[item].cid,data.Data[item].id): 
                            // this.activeScaler(data.Data[item].cid,data.Data[item].id)}
                            onClick = { () => this.confirmActiveScaler(item, data.Data[item].id)}
                            >
                            Active
                        </button>
                        }
                        {/* <button className="btn btn-secondary" 
                            style={{marginLeft: '2%'}} 
                            onClick = { () => data.Data[item].active ? this.inactiveScaler(data.Data[item].cid,data.Data[item].id): 
                            this.activeScaler(data.Data[item].cid,data.Data[item].id)}
                            onClick = { () => this.confirmActiveScaler(data.Data[item].cid,data.Data[item])}
                            >
                            {data.Data[item].active ? "Inactive": "Active"}
                        </button> */}
                    </CardBody>
                </Card>
            </div>
        ));
    }

    render() {

        const { data } = this.state;
        let cloudlist = Object.keys(data).map((k) => {
            // console.log(data[k].auth.auth_url);
            // console.log(k)
            return (
                <option key={k} value={k} >{data[k].auth.auth_url.split(":")[1].replace("//","")}</option>
            )
        }, this);
        return (
            <div>
                <Form className="container" onSubmit={this.getScaler} >
                    <div className="form-group">
                        <label for="listcloud">Choose cloud </label>
                        <select id = "listcloud" name="selectcloud" onChange={this.selectCloud} className="form-control">
                        <option value="none" selected="selected">Select cloud</option>
                            {cloudlist}
                        </select>
                    </div>
                    <Button 
                            onClick = {this.getScaler}
                            type = {'primary'} 
                            title = {'Get list scalers'}
                        />
                </Form>
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete scaler?"
                    text={this.state.textAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showAlert: false })}
                    onEscapeKey={()     => this.setState({ showAlert: false })}
                    onCancel={()        => this.setState({ showAlert: false })}
                    onConfirm={()       => this.deleteScaler()}
                />
                <SweetAlert
                    show={this.state.showActiveAlert}
                    title="Active scaler?"
                    text={this.state.textActiveAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showActiveAlert: false })}
                    onEscapeKey={()     => this.setState({ showActiveAlert: false })}
                    onCancel={()        => this.setState({ showActiveAlert: false })}
                    onConfirm={()       => this.activeScaler()}
                />
                <SweetAlert
                    show={this.state.showInactiveAlert}
                    title="Inactive scaler?"
                    text={this.state.textInactiveAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showInactiveAlert: false })}
                    onEscapeKey={()     => this.setState({ showInactiveAlert: false })}
                    onCancel={()        => this.setState({ showInactiveAlert: false })}
                    onConfirm={()       => this.inactiveScaler()}
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

export default ListScaler;