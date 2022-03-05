import Store from '../Redux/Store'
import {addData} from '../Redux/Reducer'


test("Should set the data ", () => {
    Store.dispatch(addData([{
    id:0,
    questionNo:1,
    isAnswer:false,
    answerValue:[],
    question:"What is our National Bird",
    answers:[
"Hen","Peacock","Sparrow","Eagle"
    ],
correctAnswer:'Peacock'
      }]));
    let state = Store.getState().data
    const question = state.questionList.find((val) => val.id === 0);
    expect(question?.questionNo).toBe(1);
    expect(question?.correctAnswer).toBe("Peacock");
    expect(question?.question).toBe("What is our National Bird");
  });