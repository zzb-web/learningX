import React from  'react';
import Loadable from 'react-loadable';
import LearningPackage from '../LearningPackage/index.js';
import EPU3 from '../EPU3/index.js';
function MyLoadingComponent({ error }) {
    if (error) {
      return <div>Error!</div>;
    } else {
      return <div>Loading...</div>;
    }
  }
const HomepageComponent = Loadable({
  loader: () => import('../Homepage/index.js'),
  loading: MyLoadingComponent,
});
 class HomepageLoadable extends React.Component {
  render() {
    return <HomepageComponent/>;
  }
}

const ErrorSumComponent = Loadable({
  loader: () => import('../ErrorSum/index.js'),
  loading: MyLoadingComponent,
});
 class ErrorSumLoadable extends React.Component {
  render() {
    return <ErrorSumComponent/>;
  }
}

const InfoInputComponent = Loadable({
  loader: () => import('../InfoInput/index.js'),
  loading: MyLoadingComponent,
});
 class InfoInputLoadable extends React.Component {
  render() {
    return <InfoInputComponent/>;
  }
}


const PassWordFormComponent = Loadable({
  loader: () => import('../PassWord/index.js'),
  loading: MyLoadingComponent,
});
 class PassWordFormLoadable extends React.Component {
  render() {
    return <PassWordFormComponent/>;
  }
}


const ReviewOfErrorComponent = Loadable({
  loader: () => import('../ReviewOfError/index.js'),
  loading: MyLoadingComponent,
});
 class ReviewOfErrorLoadable extends React.Component {
  render() {
    return <ReviewOfErrorComponent/>;
  }
}


const QuestionTestComponent = Loadable({
  loader: () => import('../QuestionTest/index.js'),
  loading: MyLoadingComponent,
});
 class QuestionTestLoadable extends React.Component {
  render() {
    return <QuestionTestComponent/>;
  }
}


const ErrorDetectionComponent = Loadable({
  loader: () => import('../ErrorDetection/index.js'),
  loading: MyLoadingComponent,
});
 class ErrorDetectionLoadable extends React.Component {
  render() {
    return <ErrorDetectionComponent/>;
  }
}


const TestDetectionComponent = Loadable({
  loader: () => import('../TestDetection/index.js'),
  loading: MyLoadingComponent,
});
 class TestDetectionLoadable extends React.Component {
  render() {
    return <TestDetectionComponent/>;
  }
}


const StudentMsgComponent = Loadable({
  loader: () => import('../StudentMsg/index.js'),
  loading: MyLoadingComponent,
});
 class StudentMsgLoadable extends React.Component {
  render() {
    return <StudentMsgComponent/>;
  }
}


const TestErrorMarkerComponent = Loadable({
  loader: () => import('../TestErrorMarker/index.js'),
  loading: MyLoadingComponent,
});
 class TestErrorMarkerLoadable extends React.Component {
  render() {
    return <TestErrorMarkerComponent/>;
  }
}

const TestErrorDetectionComponent = Loadable({
  loader: () => import('../TestErrorDetection/index.js'),
  loading: MyLoadingComponent,
});
 class TestErrorDetectionLoadable extends React.Component {
  render() {
    return <TestErrorDetectionComponent/>;
  }
}

const LearningPackageComponent = Loadable({
  loader: () => import('../LearningPackage/index.js'),
  loading: MyLoadingComponent,
  render(loaded,props){
    return <LearningPackage selectPackage={props.selectPackage}/>
  }
});
 class LearningPackageLoadable extends React.Component {
  render() {
    return <LearningPackageComponent selectPackage={this.props.selectPackage}/>;
  }
}

const EPU0Component = Loadable({
  loader: () => import('../EPU0/index.js'),
  loading: MyLoadingComponent,
});
 class EPU0Loadable extends React.Component {
  render() {
    return <EPU0Component/>;
  }
}

const EPU3Component = Loadable({
  loader: () => import('../EPU3/index.js'),
  loading: MyLoadingComponent,
  render(loaded,props){
    return <EPU3 test={props.test}/>
  }
});
 class EPU3Loadable extends React.Component {
   
  render() {
    console.log(this.props.test)
    return <EPU3Component test={this.props.test}/>;
  }
}

export {HomepageLoadable,
        ErrorSumLoadable , 
        InfoInputLoadable ,
        PassWordFormLoadable,
        ReviewOfErrorLoadable,
        QuestionTestLoadable,
        ErrorDetectionLoadable,
        TestDetectionLoadable,
        StudentMsgLoadable,
        TestErrorMarkerLoadable,
        TestErrorDetectionLoadable,
        LearningPackageLoadable,
        EPU0Loadable,
        EPU3Loadable
      }
