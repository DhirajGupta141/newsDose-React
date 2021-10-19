import React, { Component } from 'react'

export default class Newsitem extends Component {
    
    render() {
        let {title , description,imageUrl,newsUrl,author,date,source} = this.props;  //here destructing is happening 
        return (
            <div className="card">
                {/*We want the badge on the card so we gave the below span for that  */}
                <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                    <span className="badge rounded-pill bg-danger">
                                {source}
                    </span>
                </div>
                <img src={!imageUrl?"https://images.hindustantimes.com/img/2021/10/14/1600x900/Durga_Puja_pandal_1634195111813_1634195111996.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}
