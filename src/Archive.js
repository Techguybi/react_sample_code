import React, { Component } from 'react';
import down from './assets/down.png';
import car from './assets/car.png';
import battery from './assets/battery.png';
import dashboard from './assets/dashboard.png';
import distance from './assets/distance.png';
import location from './assets/location.png';
import power from './assets/power.png';
import progress from './assets/progress.png';
import speedometer from './assets/speedometer.png';


class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomActive: props.bottomActive,
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ bottomActive: nextProps.bottomActive });
    }

    bottomActiveaToggle = () => {

        this.setState({ bottomActive: !this.state.bottomActive });
    };

    onCloseModal = () => {
        this.setState({ bottomActive: false });
    };

    render() {
        return (
            <div className="archive-wrapper"  >
                <div className="archive-title d-flex justify-content-between" onClick={this.bottomActiveaToggle}>
                    <h4>Archive</h4>
                    <img src={down} alt="down" height="18" />
                </div>
                <div className="action-wrapper">

                </div>
                <div className={`test-wrapper d-flex ${this.state.bottomActive ? '': 'footerToggle'}`}>
                    <div className="test-title">
                        <img src={car} alt="car" width="30" />
                        <p>TEST130#1 (offline)</p>
                    </div>
                    <div className="test-info">
                        <ul>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={dashboard} width="30" /> Speed</p>
                                    <span>45 <sup>Kmh</sup></span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={power} width="30" /> Power</p>
                                    <span>12354</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={battery} width="30" /> Battery</p>
                                    <span>30%</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={speedometer} width="30" /> Event</p>
                                    <span>240</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> io67</p>
                                    <span>4029</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> io240</p>
                                    <span>1</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> io21</p>
                                    <span>5</span>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> io181</p>
                                    <span>0</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> hdop</p>
                                    <span>0</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> io241</p>
                                    <span>50501</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={progress} width="30" /> io16</p>
                                    <span>0</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={distance} width="30" /> distance</p>
                                    <span>0</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={location} width="20" /> Ip</p>
                                    <span>1.126.108.140</span>
                                </div>
                            </li>
                            <li>
                                <div className="test-info-detail">
                                    <p><img alt="img" src={distance} width="30" /> Total Distance</p>
                                    <span>14140076.85</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Archive;