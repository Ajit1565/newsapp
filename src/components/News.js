import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
    }

    capitalize = (word)=>{
        //const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase()+word.slice(1);
    }

    static defaultProps = {
        country:"in",
        pageSize:20,
        category:'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }

    async updateNews(){
        const api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2caaa9b0104f0ab3f0babdd801d987&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(api_url);
        let parseData = await data.json()

        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading:false
        })

    }

    async componentDidMount() {
        this.updateNews()
        // let api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2caaa9b0104f0ab3f0babdd801d987&pageSize=${this.props.pageSize}`;
        // let data = await fetch(api_url);
        // let parseData = await data.json()
        // this.setState({ articles: parseData.articles, totalResults:parseData.totalResults })
    }

    handlePrevClick = async () => {
        console.log("Prev")
        this.setState({page:this.state.page - 1})
        this.updateNews()
        // let api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2caaa9b0104f0ab3f0babdd801d987&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(api_url);
        // let parseData = await data.json()

        // this.setState({
        //     articles: parseData.articles,
        //     page: this.state.page - 1,
        //     loading:false
        // })
    }

    handleNextClick = async () => {
        console.log("Next")
        this.setState({page:this.state.page + 1})
        this.updateNews()
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // } else {
        //     // let api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e2caaa9b0104f0ab3f0babdd801d987&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     // this.setState({loading:true})
        //     // let data = await fetch(api_url);
        //     // let parseData = await data.json()

        //     // this.setState({
        //     //     articles: parseData.articles,
        //     //     page: this.state.page + 1,
        //     //     loading:false
        //     // })

        // }

    }

    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey - Top headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className="col-md-3" key={element.url}>
                            <NewsItems title={element.title.slice(0, 40)} description={element.description != null ? element.description.slice(0, 60) : ''} imageUrl={element.urlToImage} url={element.url}
                            author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    })}


                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&#8592; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &#8594;</button>
                </div>
            </div>
        )
    }
}
