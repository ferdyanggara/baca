import React, { useState, useEffect } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCOptions from './MCOptions';
import PlacementTestScreen from '../screen/PlacementTestScreen';

const { width, height } = Dimensions.get('window');
const quiz = [
  {
    correctoption: 'A',
    options: ['G', 'A', 'H'],
    question: 'The capital letter of ‘a’ is',
  },
  {
    correctoption: 'E',
    options: ['G', 'A', 'E'],
    question: 'The capital letter of ‘e’ is',
  },
  {
    correctoption: 'T',
    options: ['P', 'Q', 'T'],
    question: 'The capital letter of ‘t’ is',
  },
  {
    correctoption: 'M',
    options: ['M', 'O', 'N'],
    question: 'The capital letter of ‘m’ is',
  },
  {
    correctoption: 'R',
    options: ['J', 'R', 'B'],
    question: 'The capital letter of ‘r’ is ',
  },
];
const TKQUIZStoryOne = ({ navigation, qno }) => {
  const [score, setscore] = useState(1);
  const [question, setQuestion] = useState(quiz[qno].question);
  const [options, setOptions] = useState(quiz[qno].options);
  const [correctOption, setCorrectOption] = useState(quiz[qno].correctoption);
  const [questionNo, setquestionNo] = useState(qno);
  const [answer, setAnswer] = useState([]);

  const getSelectedValue = (selectedValue) => {
    if (selectedValue != null) {
      setAnswer(answer.concat(selectedValue));
    }
  };
  const next = () => {
    if (questionNo < quiz.length - 1) {
      let tempqno = questionNo + 1;
      setquestionNo(tempqno);
      setQuestion(quiz[tempqno].question);
      setOptions(quiz[tempqno].options);
      setCorrectOption(quiz[tempqno].correctoption);
    } else {
      if (score <= 3) {
        navigation.navigate({
          routeName: 'QuizFinishScreen',
          params: { ResultScore: score, Text: 'Kindergarten' },
        });
      } else if (score > 3 && score <= 9) {
        navigation.navigate({
          routeName: 'QuizFinishScreen',
          params: { ResultScore: score, Text: 'Elementary' },
        });
      } else if (score == 10) {
        navigation.navigate({
          routeName: 'QuizFinishScreen',
          params: { ResultScore: score, Text: 'Junior High' },
        });
      }
    }
  };

  useEffect(() => {
    answer.map((ans, index) => {
      if (ans == quiz[index].correctoption) {
        let tempScore = score + 1;
        setscore(tempScore);
      } else {
        let tempScore = score;
        setscore(tempScore);
      }
    });
  }, [answer]);

  const currentOptions = options;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/placement-test-02.jpg')}
        style={styles.image}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '60%',
          }}
        >
          <View style={styles.oval}>
            <Text style={styles.welcome}>{question}</Text>
          </View>
          <View style={{ paddingBottom: '70%', textAlign: 'center' }}>
            <MCOptions
              options={currentOptions}
              getSelectedValue={getSelectedValue}
              next={next}
            />
          </View>
        </View>
        <Image source={require('../assets/LOGO.png')} style={styles.logo} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  oval: {
    width: (width * 90) / 100,
    borderRadius: 20,
    backgroundColor: 'green',
    alignItems: 'center',
    marginBottom: Dimensions.get('screen').height * 0.1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    width: Dimensions.get('screen').width,
  },
  logo: {
    marginLeft: Dimensions.get('screen').width * 0.4,
    width: Dimensions.get('screen').width * 0.2,
    height: Dimensions.get('screen').height * 0.15,
    backgroundColor: 'white',
  },
});

export default TKQUIZStoryOne;