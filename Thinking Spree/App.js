/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ProgressBarAndroid,
  FlatList
} from 'react-native';


const data = 
[
  {
    question:'Akbar',
    correctAnswerId:3,
    option:[
      {
        id:4,
        option:'Taj'
      },
      {
        id:2,
        option:'Agra'
      },
      {
        id:3,
        option:'Mughal'
      },
      {
        id:5,
        option:'The Great'
      },
      
    ]
  },
  {
    question:'How Many Days in February 2018',
    correctAnswerId:3,
    option:[
      {
        id:4,
        option:'14'
      },
      {
        id:2,
        option:'29'
      },
      {
        id:3,
        option:'28'
      },
      {
        id:5,
        option:'31'
      },
      
    ]
  },
  {
    question:'Android Is Owned By',
    correctAnswerId:5,
    option:[
      {
        id:4,
        option:'Microsoft'
      },
      {
        id:2,
        option:'Facebook'
      },
      {
        id:3,
        option:'Amazon'
      },
      {
        id:5,
        option:'Google'
      },
      
    ]
  },
  {
    question:'34-10=?',
    correctAnswerId:4,
    option:[
      {
        id:4,
        option:'24'
      },
      {
        id:2,
        option:'14'
      },
      {
        id:3,
        option:'-24'
      },
      {
        id:5,
        option:'-14'
      },
      
    ]
  },
  {
    question:'12,24,36,48,?',
    correctAnswerId:2,
    option:[
      {
        id:4,
        option:'50'
      },
      {
        id:2,
        option:'60'
      },
      {
        id:3,
        option:'70'
      },
      {
        id:5,
        option:'80'
      },
      
    ]
  },
];

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      currentQuestion:0,
      points: 0,
      selectedItem:null,
      correctItem:null,
      timer:10,
    }
    
  }

  componentDidMount(){
    this.setTimer()
  }

  setTimer = () => {
    var timerInterval = setInterval(()=>{
      if(this.state.currentQuestion>=data.length){
        clearInterval(timerInterval)
      }else{
        if(this.state.selectedItem==null && this.state.timer<=0){
          this.setState({
            currentQuestion:this.state.currentQuestion+1,
            timer:11
          })
        }
        if(this.state.timer>0){
          this.setState({timer:this.state.timer-1})
        }
      }
    },1000)
    
  }

  clickAnswered = (itemId) => {
    this.setState({selectedItem:itemId})
    const correctAnswerId = data[this.state.currentQuestion].correctAnswerId;
    if(correctAnswerId == itemId){
      this.setState({
        correctItem: correctAnswerId,
        points: this.state.points+1,
        
      })

    }
    if(this.state.currentQuestion<data.length){
      setTimeout(()=>{
        this.setState({
          currentQuestion:this.state.currentQuestion+1,
          selectedItem:null,
          correctItem:null,
          timer:10
        })
      },1000)
    }
    

 //   this.setState({currentQuestion:this.state.currentQuestion+1})

  }
  
  restartGame = () => {
    this.setState({
      currentQuestion:0,
      points: 0,
      selectedItem:null,
      correctItem:null,
      timer:10
    }),
    this.setTimer()
  }

  render(){

    let renderList = null
    if(this.state.currentQuestion<data.length){
      renderList =
        <View>
          <View style={styles.question}>
            <Text style={[styles.questionText, styles.white]}>{data[this.state.currentQuestion].question}</Text>
          </View>
            <FlatList 

            data={data[this.state.currentQuestion].option}
            keyExtractor={item => item.id.toString()}
            renderItem={({item})=>
             <Option option={item.option} 
                     id={item.id} 
                     currentQuestion={this.state.currentQuestion}
                     selected={this.state.selectedItem}
                     correctAnswer={this.state.correctItem}
                     onChange={this.clickAnswered.bind(this,item.id)}/>
            }
          />
        </View>
    }else if(this.state.points>=data.length/2){
      renderList =<View style={styles.congratsContainer}>
                    <Text style={[styles.white, styles.congratsText]}>Congrats!!! You Have Earned {this.state.points}/{data.length} !!!</Text>
                    <TouchableOpacity onPress={this.restartGame}>
                      <Text style={[styles.white,styles.restartButton]}>Restart</Text>
                    </TouchableOpacity>
                  </View>
    }else{
      renderList =<View style={styles.congratsContainer}>
                    <Text style={[styles.white, styles.congratsText]}>You Have Earned {this.state.points}/{data.length} !!! Better Luck Next Time!</Text>
                    <TouchableOpacity onPress={this.restartGame}>
                      <Text style={[styles.white,styles.restartButton]}>Restart</Text>
                    </TouchableOpacity>
                  </View>
    }


    currentQuestion = 3;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerContainer}>
            <Text style={[styles.timerSeconds, styles.white]}>{this.state.timer}</Text>
            <Text style={styles.white}> sec</Text>
          </View>
          <ProgressBarAndroid styleAttr='Horizontal' indeterminate={false} progress={this.state.timer/10} style={styles.progressBar}/>
          
          
        </View>
        <View style={styles.teamsContainer}>
            <View style={[styles.teamContainer, styles.blue]}>
              <Text style={styles.white}>TEAM A : </Text>
              <Text style={styles.white}>12</Text>
            </View>
            <View style={[styles.teamContainer, styles.green]}>
              <Text style={[styles.white]}>TEAM B : </Text>
              <Text style={styles.white}>16</Text>
            </View>
            
            
          </View>

          
        <View>

          
          
          {renderList}

          <Text style={styles.passed}>Passed {this.state.points}</Text>
          
          {/*
          <View style={styles.question}>
            <Text style={[styles.questionText, styles.white]}>Akbar</Text>
          </View>
          <View style={styles.question}>
            <Text style={[styles.questionText, styles.white]}>Akbar</Text>
          </View> */}
        </View>
      </View>
    );
  }
};

const Option = (props) => {
  let style1 = null
  // if(data[props.currentQuestion].correctAnswerId==props.id){
  //   style1 =  {backgroundColor:'green'}
  // }
  if(props.selected==props.id){
    style1 =  {backgroundColor:'red'}
  }
  if(props.selected!=null && data[props.currentQuestion].correctAnswerId==props.id){
    style1 =  {backgroundColor:'green'}
  }
  
  console.log(props.selected)
  return(
    
    <TouchableOpacity  style={[styles.option, style1]} onPress={props.onChange} disabled={props.selected?true:false}>
      <Text style={[styles.optionText, styles.white]}>{props.option}</Text>
    </TouchableOpacity>
  )
}

// const Separator = () => {
//   return(
//     <View 
//       style={{backgroundColor:'#ccc',height:0.5, width:'60%', alignSelf:'center'}}
//     />
//   )
// }

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  header:{
    width:'100%',
    backgroundColor:'#222',
    height:131
  },
  timerContainer:{
    
    justifyContent: 'center',
    alignItems:'baseline',
    flexDirection:'row',
    paddingBottom:10
  },
    timerSeconds:{
      fontSize:60,      
      height:70
    },
  
  progressBar:{ 
    color:'white',
    width:'60%',
    alignSelf:'center',
    paddingBottom:20
  },

  teamsContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    top:-15
  },
    teamContainer:{
      flexDirection:'row',
      paddingLeft:15,
      paddingRight:15,
      paddingTop:5,
      paddingBottom:5,  
      borderRadius:5,
      width:'30%',
      justifyContent:'center',
      
    },
      teamContainerText:{
        fontSize:19,
      },

  mainContent:{
    flex:1,
    
  },  

  question:{
    width:'85%',
    
    alignSelf:'center',
    alignItems:'center',
    
    borderRadius:5,
    shadowOffset:{
      width:10,
      height:13
    },
    shadowColor:'#FFF',
    shadowOpacity:0.8,
    shadowRadius:5,
    backgroundColor:'#222',
    marginBottom:20
    //1FD8FF
  },
    questionText:{
      width:'70%',
      fontSize:30,
      alignSelf:'center',
      textAlign:'center',
      padding:10,  
    }, 

    option:{
      width:'80%',
      
      alignSelf:'center',
      alignItems:'center',
      
      // borderRadius:5,
      shadowOffset:{
        width:10,
        height:13
      },
      shadowColor:'#FFF',
      shadowOpacity:0.8,
      shadowRadius:5,
      backgroundColor:'#00ACEE',
      
      //1FD8FF
    },
      optionText:{
        width:'70%',
        fontSize:30,
        alignSelf:'center',
        textAlign:'center',
        padding:20,   
        fontFamily:'sans-serif',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
      }, 

  passed:{
    backgroundColor:'white',
    alignSelf:'center',
    padding:5,
    margin:5
  },

  congratsContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
    congratsText:{
      fontSize:40,
      textAlign:'center'
    },

  restartButton:{
    backgroundColor:'green',
    padding:10,
    borderRadius:50,
    borderColor:'white',
    borderWidth:1,
    fontSize:20
  },

  white:{
   color:'white'
  },
  blue:{
    backgroundColor:'#58CCED',
  },
  green:{
    backgroundColor:'#58EDCC',
  }
});

export default App;
