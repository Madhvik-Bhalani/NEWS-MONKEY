import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        // const {title,description}=this.props; 1st method destructiing

        return (
            <>

                <div className="card border-2" style={{ width: "300px", borderRadius: "6px", boxShadow: "1px 1px 1px 1px gray" }}>
                    
                    <img src={this.props.imgurl ? this.props.imgurl : "https://cdn.pixabay.com/photo/2015/11/03/09/00/browse-1019916_960_720.jpg"} className="card-img-top" alt="News" style={{ height: "160px" }} />

                    <span className={`position-relative  border translate-middle badge rounded-pill bg-${this.props.bg}`} style={{zIndex:"1",width:"48%",left:"75%",top:"2.5%",overflow:"hidden"}}>
                        {this.props.source}
                    </span>
                    
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title?this.props.title.slice(0,80):"this is demo title for newsmonkey"}...</h5>

                        <p className="card-text">{this.props.description ? this.props.description.slice(0, 88) : "this is dummy descrition for newsMonkey.!newsMonkey is india's biggest platform"}...</p>

                        <p className="card-text"><small className="text-muted">By {this.props.author ? this.props.author : "Unknown"} on {new Date(this.props.date).toLocaleString()}</small></p>

                        <a href={this.props.url} target="_blank" rel="noreferrer" className="btn btn-dark text-capitalize">read more</a>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem