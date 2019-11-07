import React, {Component} from 'react';

import Button from './form/Button';
import { Form, FormGroup, Label, Input,} from 'reactstrap';
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
        xhr.open('GET', 'http://127.0.0.1:8600/clouds')
        xhr.send()
        
    }

    selectCloud = (e) => {
        // let idx = e.target.selectedIndex;
        // let dataset = e.target.options[idx].dataset;
        // console.log(dataset);
        console.log(e.target.value);
        this.setState({
            cloudpath: e.target.value
        })
        console.log("123");
    }

    getListCloud(e) {
        e.preventDefault();
        console.log("Cloud path");
        console.log(this.state.cloudpath);
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            let data = xhr.responseText;
            console.log("list scaler");
            console.log(data);
            this.setState({
                Content: data
            })
        })
        var url = "http://127.0.0.1:8600/scalers/".concat(this.state.cloudpath.replace("/clouds/",""))
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
            // <div>
            //     <select>
            //         {cloudlist}
            //     </select>
            // </div>
            <div>

            
                <Form className="container" onSubmit={this.getListCloud} >
                    {/* <FormGroup>
                        <Label for="listcloud">Choose cloud</Label>
                        <Input type="select" name="selectcloud" id="listcloud"  onChange={this.selectCloud()}>
                            {cloudlist}
                            <option value="/clouds/7929723140d7673c776b281e1cac5689">10.60.17.232</option>
                        </Input>
                    </FormGroup> */}
                    <div className="form-group">
                        <label for="listcloud">Choose cloud </label>
                        <select id = "listcloud" name="selectcloud" onChange={this.selectCloud} className="form-control">
                        <option value="none" selected="selected">Select cloud</option>
                            {cloudlist}
                            <option value="/clouds/7929723140d7673c776b281e1cac5689" >10.60.17.232</option>
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