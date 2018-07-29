import React, { Component } from 'react';
import '../App.css';
import MediaCapturer from 'react-multimedia-capture';
import ListAllReactions from './ListAllReactions';
import ReactPlayer from 'react-player';


class App extends Component {

    constructor() {
        super();
        this.state = {
            granted: false,
            rejectedReason: '',
            recording: false,
            paused: false,
            reactionVideos: []
        };

        let urlList = '';
        localStorage.setItem("urlList",urlList);

        this.handleGranted = this.handleGranted.bind(this);
        this.handleDenied = this.handleDenied.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleResume = this.handleResume.bind(this);
        this.setStreamToVideo = this.setStreamToVideo.bind(this);
        this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
        this.downloadVideo = this.downloadVideo.bind(this);
    }
    handleGranted() {
        this.setState({ granted: true });
        console.log('Permission Granted!');
    }
    handleDenied(err) {
        this.setState({ rejectedReason: err.name });
        console.log('Permission Denied!', err);
    }
    handleStart(stream) {
        this.setState({
            recording: true
        });

        this.setStreamToVideo(stream);
        console.log('Recording Started.');
    }
    handleStop(blob) {
        this.setState({
            recording: false
        });

        this.releaseStreamFromVideo();

        console.log('Recording Stopped.');
        this.downloadVideo(blob);


    }
    handlePause() {
        this.releaseStreamFromVideo();

        this.setState({
            paused: true
        });
    }
    handleResume(stream) {
        this.setStreamToVideo(stream);

        this.setState({
            paused: false
        });
    }
    handleError(err) {
        console.log(err);
    }
    setStreamToVideo(stream) {
        console.log("inside ser stream to video");
        let video = this.refs.app.querySelector('video');

        if(window.URL) {
            video.src = window.URL.createObjectURL(stream);
        }
        else {
            video.src = stream;
        }
    }
    releaseStreamFromVideo() {
        this.refs.app.querySelector('video').src = '';
    }
    downloadVideo(blob) {
        console.log("downloading video");
        console.log("URL.createObjectURL(blob)",URL.createObjectURL(blob));

        var key = URL.createObjectURL(blob);

        var videos = ["dfjkhaskfh","asdkashfk"];

        var chkList1 = localStorage.getItem("urlList");
        //var chkList2 = JSON.parse(chkList1);

        if(localStorage.getItem("urlList")){
            console.log("local storage not empty");
           //console.log("list is",JSON.parse(localStorage.getItem("urlList")));
            var vList = [];
            vList  = localStorage.getItem("urlList");
            var urlList = JSON.parse(vList);
            console.log("vLIst", urlList);
            urlList.push(key+"");
            localStorage.setItem("urlList",  JSON.stringify(urlList));
            this.setState({reactionVideos: urlList});
        }
        else{
            console.log("local storage is empty");
            var vList= [];
            vList.push(key+"");
            console.log("vLIst", vList);
            localStorage.setItem("urlList", JSON.stringify(vList));
            this.setState({reactionVideos: vList});
        }

    }

    render() {
        const granted = this.state.granted;
        const rejectedReason = this.state.rejectedReason;
        const recording = this.state.recording;
        const paused = this.state.paused;

        var id = this.props.match.params.linkUrl;
        console.log("url = "+this.props.match.params.linkUrl);
        var linkUrl = "";

        if(id == 1){
            linkUrl = "https://www.youtube.com/watch?v=gRiy5Pn9FaE";
        }else if (id == 2){
            linkUrl = "https://www.youtube.com/watch?v=7IcGYHU8WBo";
        }else if (id == 3){
            linkUrl = "https://www.youtube.com/watch?v=V-ZVhAlxkgg";
        }

        return (
            <div ref="app">
                <h3> Video Recorder</h3>
                <MediaCapturer
                    constraints={{ audio: true, video: true }}
                    timeSlice={10}
                    onGranted={this.handleGranted}
                    onDenied={this.handleDenied}
                    onStart={this.handleStart}
                    onStop={this.handleStop}
                    onPause={this.handlePause}
                    onResume={this.handleResume}
                    onError={this.handleError}
                    render={({ start, stop, pause, resume }) =>
                        <div className="col-md-offset-5">

                            <button className="btn btn-warning" onClick={start}>Record</button>
                            <button className="btn btn-warning ml40" onClick={stop}>Share</button>

                            <video autoPlay></video>
                        </div>
                    } />
                    <ReactPlayer url={linkUrl} controls={true}/>

                    <ListAllReactions
                        reactionList={this.state.reactionVideos}
                    />
            </div>
        );
    }
}

export default App;
