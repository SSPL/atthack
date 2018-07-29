import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import _ from 'lodash';

class ListAllReactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlList : props.reactionList,
            message: ""
        };
        this.getList = this.getList.bind(this);
    }

    /*
    componentDidMount(){
        if(localStorage.getItem("urlList")){
            this.setState({urlList:JSON.parse(localStorage.getItem("urlList")), message: ""})
            console.log("Inside Component Did Mount")
            console.log(this.state.urlList);
        }else{
            this.setState({message : "No reactions present !!!", urlList: []})
        }
    }*/

    getList(){
        console.log("Inside render");
        console.log(this.state.urlList);

        var vList = this.state.urlList;
        this.setState({
            urlList : vList
        })
        // if(vList!=undefined && vList.length != 0) {
        //     alert(vList.length);
        //     vList.map(video =>
        //         console.log(video)
        //     )
        // }else{
        //     alert(vList.size);
        // }
    }

    render() {
        console.log("Inside render of ListALlReactions:");
        console.log(this.props.reactionList);

        let urlReaction = this.props.reactionList;
        let displayList = "";
        if(!_.isEmpty(urlReaction)){
            displayList = urlReaction.map((elem) => {
                return <ReactPlayer className="mt20" url={elem} controls={true}/>
            });
        }

        //var videos = localStorage.getItem("urlList");
        //var vList = JSON.parse(videos);
        //console.log("",vList);
        var listOfVideos = "";//vList.split(",").map((video,i) => {
        //             return <div key={i}>
        //                 {if(i==0 ? (
        //                     <ReactPlayer url={video.substr(2,(video.length)-2)}/>
        //                     :()))}
        //                     else if(i==length-1){
        //                 <ReactPlayer url={video.substr(1,(video.length)-3)}/>
        //             }else{
        //                 <ReactPlayer url={video.substr(1,(video.length)-2)}/>
        //             }}
        //
        //             </div> })
        return (
            <div>{displayList}</div>
        );

    }
}

export default ListAllReactions;
