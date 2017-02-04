/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';


var REQUEST_URL= 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


export default class HelloRn extends Component {

constructor(props) {
  super(props);

  this.state = {
     dataSource: new ListView.DataSource({
      rowHasChanged:(row1,row2)=>row1!== row2,
     }
      ),

     loaded: false,
  };

  this.fetchData = this.fetchData.bind(this); 
}
 
  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

      this.setState({


      dataSource: this.state.dataSource.cloneWithRows(responseData.movies),

      loaded: true,

        });
    });
    
  }


  render() {
//     var MOCKED_MOVIES_DATA=[{title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
// ];
    
//     var movie = MOCKED_MOVIES_DATA[0];
//     return (
//       <View style={styles.container}>
     
    
//       <Image source={{uri: movie.posters.thumbnail}}
//       style={styles.thumbnail} />

//       <View style={styles.rightContainer}>

//       <Text style={styles.title}>{movie.title}</Text>
//       <Text style={styles.year}>{movie.year}</Text>

//       </View>
//       </View>
    
     
//     );

    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    // var movie=this.state.movies[0];

    // return this.renderMovie(movie);

    return (

      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderMovie}
      style={styles.listView}
/>

      );
  }



  renderLoadingView(){
    return(
    <View style={styles.container}>
      <Text>

      正在加载电影数据......
      </Text>

    </View>


      );

  }


  renderMovie(movie){
        return (
      <View style={styles.container}>
     
    
      <Image source={{uri: movie.posters.thumbnail}}
      style={styles.thumbnail} />

      <View style={styles.rightContainer}>
 
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.year}>{movie.year}</Text>

      </View>
      </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail:{
    width: 53,
    height: 81,
  },
  rightContainer:{
    flex: 1,
  },
  title:{
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year:{
    textAlign: 'center',
  },
  listView:{
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#F5FCFF'
  }
 
});

AppRegistry.registerComponent('HelloRn', () => HelloRn);