import React, { Component } from 'react';
import '../App.css';
import ReactPlayer from 'react-player';
//import ListAllReactions from 'ListAllReactions';
import {Link} from 'react-router-dom';

class Landing extends Component {

    createTable = () => {
        let links = [
            "https://www.youtube.com/watch?v=gRiy5Pn9FaE",
            "https://www.youtube.com/watch?v=7IcGYHU8WBo",
            "https://www.youtube.com/watch?v=V-ZVhAlxkgg"]
        let videoList =[
        ]
        let totalLinks = links.length;
        var linkUrl;
        for (let i= 0; i < totalLinks;i++){
            linkUrl = links[i];
            videoList.push(
                <tr className='videoRow table-border adjust-margins'>
                    <ReactPlayer className='video'
                                 className='react-player videoRow'
                                 url={links[i]}
                                 width='6in'
                                 height='4in'
                                 controls='true'
                                 margin="0px auto"
                    />
                    <td>
                        <Link to={'/capture/'+(i+1)} className="col-md-2 mt10 mb5">View</Link>
                    </td>
                </tr>
            )
        }
        return(videoList)
    }
    render() {
        return (
            <div className='App'>
                <div className='content'>
                    <table className="ml130">
                        {this.createTable()}
                    </table>
                </div>
            </div>
        );
    }
}

export default Landing;
