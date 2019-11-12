import React, {Component} from 'react';

import Button from './form/Button';
import { Form, FormGroup, Label, Input,} from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Global from '../env/faythe';
import { thisTypeAnnotation } from '@babel/types';
// Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle ,
class ListScaler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: "No value",
            data: [],
            cloudpath: ""
        }
        // this.handeleGetListScalers = this.handeleGetListScalers.bind(this);
        this.selectCloud = this.selectCloud.bind(this);
        this.getListCloud = this.getListCloud.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.deleteScaler = this.deleteScaler.bind(this);
    }
    componentDidMount() {
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            // console.log(xhr.responseText)
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
        console.log("123");
    }
    renderContent(data) {
        // return()
        console.log(data)
        var path = []
        var scaler;
        for (scaler in data.Data) {
            console.log(scaler);
            path.push(scaler);
        }
        console.log(path[0]);
        // return(
        //     <div>
        //         <Card>
        //             <CardBody>
        //                 <CardTitle>Scaler ID:{data.Data[path[0]].cid}</CardTitle>
        //                 <CardTitle>Scaler State:{data.Data[path[0]].active ? "active": "inactive"}</CardTitle>
        //             </CardBody>
        //             <button className="btn btn-secondary"  onClick = { () => this.deleteScaler(data.Data[path[0]].cid,data.Data[path[0]].id)}>Delete scaler</button>
        //         </Card>
        //     </div>
        // );
        return Object.keys(data.Data).map((item, index) => (
            <div>
                <Card> 
                    <CardBody>
                        <CardTitle>Scaler ID:{data.Data[item].cid}</CardTitle>
                        <CardTitle>Scaler State:{data.Data[item].active ? "active": "inactive"}</CardTitle>
                    </CardBody>
                    <button className="btn btn-secondary"  
                        onClick = { () => this.deleteScaler(data.Data[item].cid,data.Data[item].id)}>
                        Delete scaler
                    </button>
                </Card>
            </div>
        ));
    }

    deleteScaler(c,s) {
        var xhr = new XMLHttpRequest()
        // var xh = new XDomainRequest();
        
        xhr.addEventListener('load', () => {
            console.log("Delete scaler success");
        })
        console.log(c)
        console.log(s)
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/").concat(c).concat('/').concat(s);
        console.log(url);
        url = 'http://10.60.17.243:8600/scalers/a4814fc0a872c2e0a2a62571458ff830'
        // url = 'http://127.0.0.1:8600/clouds'
        xhr.open('DELETE', url);
        xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.send();
        
    }
        

    getListCloud(e) {
        e.preventDefault();
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
    render() {

        const { data } = this.state;
        // console.log(data);
        let cloudlist = Object.keys(data).map((k) => {
            // console.log(data[k].auth.auth_url);
            // console.log(k)
            return (
                <option key={k} value={k} >{data[k].auth.auth_url.split(":")[1].replace("//","")}</option>
            )
        }, this);
        return (
            <div>
                <Form className="container" onSubmit={this.getListCloud} >
                    <div className="form-group">
                        <label for="listcloud">Choose cloud </label>
                        <select id = "listcloud" name="selectcloud" onChange={this.selectCloud} className="form-control">
                        <option value="none" selected="selected">Select cloud</option>
                            {cloudlist}
                            {/* <option value="/clouds/7929723140d7673c776b281e1cac5689" >10.60.17.232</option> */}
                        </select>
                    </div>
                    <Button 
                            onClick = {this.getListCloud}
                            type = {'primary'} 
                            title = {'Get list scalers'}
                            // style={buttonStyle}
                        />
                </Form>
                <div>
                    {this.state.Content}
                </div>
            </div>
        )
    }
}

export default ListScaler;