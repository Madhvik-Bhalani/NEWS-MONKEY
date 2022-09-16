import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {

        super(props); //for use props within constructor
        this.state = {
            data: [],
            page: 1,
            loading: false,
            bg: '',
            totalres: 0
        }
        // this.nextHandler = this.nextHandler.bind(this);
        //fat arrow use karo to bind ni jarur na pade
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }
    updateNews = async (pageno) => {

        this.setState({ loading: true })
        this.props.setprogress(25)
        const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page || pageno}&pageSize=${this.props.pagesize}`)


        this.props.setprogress(50)
        const finaldata = await data.json();
        this.props.setprogress(75)
        this.setState({ data: finaldata.articles, totalres: finaldata.totalResults, loading: false, bg: this.props.bg })
        this.props.setprogress(100)
    }

    componentDidMount = async () => {
        this.updateNews();
    }
    firstHandler = async () => {
        this.setState({ page: 1 }, (() => {

            this.updateNews(1);
        }))

    }
    lastHandler = async () => {
        this.setState({ page: Math.ceil(this.state.totalres / this.props.pagesize) }, (() => {

            this.updateNews(Math.ceil(this.state.totalres / this.props.pagesize));
        }))
    }
    nextHandler = async () => {
        this.setState({ page: this.state.page + 1 }, (() => {
            this.updateNews();
        }))

    }

    prevHandler = async () => {
        this.setState({ page: this.state.page - 1 }, (() => {
            this.updateNews();
        }))
    }

    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 }, (async () => {

            const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`)

            const finaldata = await data.json();
            this.setState({ data: this.state.data.concat(finaldata.articles), totalres: finaldata.totalResults, bg: this.props.bg })
        }))

    } //for infinite scroll
    render() {
        return (
            <>
                <div className="container" style={{ marginTop: "90px" }}>
                    <h1 className='text-center text-capitalize'>NewsMonkey-Top {this.props.category} Headlines</h1>
                    {this.state.loading && <Spinner />}

                    {/* <InfiniteScroll
                        dataLength={this.state.data.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.data.length !== this.state.totalres}
                        loader={<Spinner />}
                        style={{ overflow: "hidden" }}
                    > */}


                    <div className="row mt-4">
                        {
                            !this.state.loading &&
                            this.state.data.map((elem, ind) => {
                                return (

                                    <div className="col-md-4  d-flex justify-content-center mt-4" key={ind} >
                                        <NewsItem title={elem.title} description={elem.description} imgurl={elem.urlToImage} url={elem.url} author={elem.author} key={ind} date={elem.publishedAt} source={elem.source.name} bg={this.state.bg} />
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* </InfiniteScroll> */}

                    <div className="container d-flex justify-content-between my-3 " style={{ padding: "0 63px 0 63px" }}>
                        <div>
                            <button className='btn btn-dark text-capitalize mx-1 my-1' onClick={this.firstHandler}>&lt;&lt; first</button>
                            <button className='btn btn-dark text-capitalize mx-1 my-1' disabled={this.state.page <= 1} onClick={this.prevHandler}>&larr; previous</button>
                        </div>
                        <div>
                            <button disabled={(this.state.page + 1) > (Math.ceil(this.state.totalres / this.props.pagesize))} className='btn btn-dark text-capitalize mx-1 my-1' onClick={this.nextHandler}>next &rarr;</button>
                            <button className='btn btn-dark text-capitalize mx-1 my-1' onClick={this.lastHandler}>last &gt;&gt;</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

News.propTypes = {
    apikey: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pagesize: PropTypes.number.isRequired,
    con: PropTypes.string.isRequired
};

News.defaultProps = {

    category: "general",
    pagesize: 7,
    con: "in"

}

export default News