import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [gamePrompt, setGamePrompt] = useState('Fire!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const [totalGame, setTotalGame] = useState(0);
  const [userWin, setUserWin] = useState(0);
  const [userLose, setUserLose] = useState(0);
  const Button = props => (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => props.onPress(props.name)}
    >
      <Text style={styles.buttonText}>
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
  const ChoiceCard = ({ player, choice: { uri, name } }) => {
    const title = name && name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceDescription}>{player}</Text>
        <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
        <Text style={styles.choiceCardTitle}>{title}</Text>
      </View>
    );
  };
  // const onPress = userChoice => {
  //   console.log('userChoice', userChoice);
  // };
  const onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
    if (result == 'Victory!')
      setUserWin(userWin + 1);
    else if (result == 'Defeat!')
      setUserLose(userLose + 1);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
    setTotalGame(totalGame + 1);
  };
  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };
  const randomComputerChoice = () =>
    CHOICES[Math.floor(Math.random() * CHOICES.length)];
  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: getResultColor() }}>{gamePrompt}</Text>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#5B86E5' }}>You win {userWin}, as {Math.round(userWin * 100 / totalGame || 0)}%</Text>
      <Text style={{ fontSize: 20, }}>Total game: {totalGame}, you lose {userLose} and tie {totalGame - userWin - userLose}</Text>
      <View style={styles.choicesContainer}>
        <ChoiceCard
          player="Player"
          choice={userChoice}
        />
        <Text style={{ color: '#250902' }}>vs</Text>
        <ChoiceCard
          player="Computer"
          choice={computerChoice}
        />
      </View>
      {
        CHOICES.map(choice => {
          return <Button key={choice.name} name={choice.name} onPress={onPress} />;
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#235EDD',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    borderRadius: 20,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#000000'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
const CHOICES = [
  {
    name: 'rock',
    uri: require('./assets/rock.png')
  },
  {
    name: 'paper',
    uri: require('./assets/paper.png')
  },
  {
    name: 'scissors',
    uri: require('./assets/scissor.png')
  }
];