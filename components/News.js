import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    static defaultProps={
        pageSize:6,
        country:'in',
        category:'science'
    }
    
    static propTypes={
        pageSize:PropTypes.number,
        country:PropTypes.string,
        category:PropTypes.string
    }

    //the below code is for getting data from source no hardcode

    //capitalizing the first letter of the word
    capitalize(word){
        return word.charAt(0).toUpperCase()+word.slice(1);
    }

    //we write the state variables inside the constructor
    constructor(props){
        super(props);
        console.log("Hellow this is the constructor from News.js");
        //here state is the reserved keyword in the class component
        //the below object is our collection of state variables this is how we create state variables in class component
        
        // Remember states are like your global variables and here below we are setting its default value when the 
        //application is running for the very first time 
        //as we know class constructor call first
        //this is like initialization using constructor in OOPS
        this.state={
            articles:[],   //assiging the fetched data inside the article array all the data will be there in this array
            loading:false,
            page:1 ,//maintaing the page count of our news  this is important for the componentDidMount because there we dont have any page previouslly so here we are initializing that with 1
            totalResults:0   //default value
        }
        //changing the title dynamically
        document.title=`${ this.capitalize(this.props.category)}-newsDose`;
    }
    
    async updateNews(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=970fac16102944879c125004f8dd8d2d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let fetched_data= await fetch(url);
        this.props.setProgress(40);
        let parsed_data= await fetched_data.json();
        this.props.setProgress(80);
        console.log(parsed_data);
        
        //Here we are changing the state of our state variables after fetching the data from the source
        this.setState({
            articles:parsed_data.articles,    //here we are assiging all the articles data after fetching 
            totalResults: parsed_data.totalResults,  //setting the totalResults count
            loading:false
        })

        this.props.setProgress(100);
    }

    //This method allows us to execute the code of the react when the DOM is already rendered
    async componentDidMount(){
        this.updateNews();
    }

    // Previous and next btn onClick Event Handle start
    //No need when we are using infinite scroll
    previousClickHandle =async ()=>{
        this.setState({page:this.state.page-1});
        this.updateNews();


    }

    //No need when we are using infinite scroll
    nextClickHandle= async ()=>{
        //End of page condition
        // if(this.state.page+1<=Math.ceil(this.state.totalResults/this.props.pageSize)){
        this.setState({page:this.state.page+1});
        this.updateNews();


    }
    // Previous and next btn onClick Event Handle End


    //infinite scrole
    fetchMoreData = async () => {
        //changing page number for fetching more data
        this.setState({page:this.state.page+1});
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=970fac16102944879c125004f8dd8d2d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let fetched_data= await fetch(url);
        let parsed_data= await fetched_data.json();
        
        //Here we are changing the state of our state variables
        this.setState({
            //concating more data so this make infinite scrole 
            articles:this.state.articles.concat(parsed_data.articles),//here we are assiging all the articles data after fetching and we are concating it 
            totalResults: parsed_data.totalResults,  //setting the totalResults count
        })
        
    };
    



    render() {
        return (

            
            //Without infinite scrole bar
            // <>
            
                //     {/* This Container Will have All the News 
                //     <div className="container my-3">
                //         <h1 className="text-center" style={{margin:'10px 0px'}}>newsDose-Top {this.capitalize(this.props.category)} Headlines</h1>
                //         {/* Here we are saying call spinner component only when loading is true */}
                //         {this.state.loading && <Spinner/>}
                //         <div className="row">
                //             {/* Here inside this row div we are writing js so we have kept inside the {} that yellow one */}
                //             {   //here we are returning a Div elements from the 
                //                 //here in the below line we are saying when loading is false then only show the newsItems
                                
                //                 this.state.loading===false &&  this.state.articles.map((element)=>{
                //                     return <div className="col-sm-4 my-2" key={element.url}>  
                //                         {/* Ternary operator to handle null cases */}
                //                         <Newsitem title={element.title?element.title:" "}
                //                         description={element.description?element.description:" "}
                //                         imageUrl={element.urlToImage} newsUrl={element.url}
                //                         author={element.author} date={element.publishedAt}
                //                         source={element.source.name}
                //                         />
                //                     </div>
                //                 })
                //             } 
                //             {/* Returning a news Item Component */}
                //         </div>
                //     </div>
                //     {/* News Container End */}




                //     {/* Previous and next Button start */}
                //         <div className="container d-flex justify-content-between">
                //             <button disabled={this.state.page<=1} type="button" 
                //             className="btn btn-dark" onClick={this.previousClickHandle}>&larr;Previous</button>
                //             <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark "
                //             onClick={this.nextClickHandle}>Next&rarr;</button>   
                //         </div>
                //     {/* Previous and next button end */}
                // </> */}
            
            
                // With infinite scrole bar
            <>
                    <h1 className="text-center" style={{margin:'10px 0px'}}>newsDose-Top {this.capitalize(this.props.category)} Headlines</h1>
                    {this.state.loading && <Spinner/>}
                   
                    {/* Our InfiniteScroll is rendering the container of rows as output  */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!==this.state.totalResults}
                        loader={<Spinner/>}  //this will be called by the scroller package we dont have to take care of any thing
                    >
                        <div className="container">
                            <div className="row">
                                {   
                                    //map takes a callback method
                                    this.state.articles.map((element)=>{
                                        return (
                                            <div className="col-sm-4 my-2" key={element.url}>  
                                                <Newsitem title={element.title?element.title:" "}
                                                description={element.description?element.description:" "}
                                                imageUrl={element.urlToImage} newsUrl={element.url}
                                                author={element.author} date={element.publishedAt}
                                                source={element.source.name}
                                                />
                                            </div>
                                        )
                                    })
                                } 
                            </div>
                        </div>

                    </InfiniteScroll>        
        </>

                
        )
    }
}
