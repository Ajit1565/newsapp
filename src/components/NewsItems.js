import React, { Component } from 'react'



export default class NewsItems extends Component {
    render() {
        let { title, description,imageUrl,url, date, author,source } = this.props
        return (
            <div className='my-3'>
                <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>{source}</span>
                    <img src={!imageUrl?'/newslogo.png':imageUrl} className="card-img-top" alt="..."  height={200}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className='text-muted'>By {author?author:'Unknown'} on { new Date(date).toDateString() } </small></p>
                        <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
