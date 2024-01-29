import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults :0
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
    }

    capitalize = (word) => {
        //const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    static defaultProps = {
        country: "in",
        pageSize: 20,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    async updateNews() {
        //console.log(this.props)
        //console.log(this.props.apikey)
        this.props.setProgress(10);
        const api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(api_url);
        this.props.setProgress(30);
        let parseData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalResults : parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews()
        
    }

    handlePrevClick = async () => {
        console.log("Prev")
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
        
    }

    handleNextClick = async () => {
        console.log("Next")
        this.setState({ page: this.state.page + 1 })
        this.updateNews()

    }

    fetchMoreData = async ()=>{
        
        this.setState({page:this.state.page+1})
        const api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //this.setState({ loading: true })
        let data = await fetch(api_url);
        let parseData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults : parseData.totalResults,
            loading: false
        })
    }

    render() {
        return (
            <>
                <h1 className='text-center'>NewsMonkey - Top headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
               <div className="container">
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItems title={element.title.slice(0, 40)} description={element.description != null ? element.description.slice(0, 60) : ''} imageUrl={element.urlToImage} url={element.url}
                                author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    })}
                </div>
                </div>
                </InfiniteScroll>
                
            </>
        )
    }
}
