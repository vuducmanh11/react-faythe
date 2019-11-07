import React, {Component} from 'react';

import Button from './form/Button';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
  

class Clouds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: ""
        }
        this.handleGetListCloud = this.handleGetListCloud.bind(this);
        this.renderContent = this.renderContent.bind(this);
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
        return(
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>CloudURL:{data.Data[path[0]].auth.auth_url.slice(7,19)}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        );
    }

    handleGetListCloud(e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            // console.log(xhr.responseText)
            let  resp = xhr.responseText;
            var data = this.renderContent(resp)
            this.setState({
                Content: data
            });

        })
        xhr.open('GET', 'http://127.0.0.1:8600/clouds')
        xhr.send()
        
    }
    render() {
        return(
            <div>
                <form className="container" onSubmit={this.handleGetListCloud}>
                    <Button 
                        action = {this.handleGetListCloud}
                        type = {'primary'} 
                        title = {'Get list clouds'}
                        style={buttonStyle}
                    />
                </form>
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