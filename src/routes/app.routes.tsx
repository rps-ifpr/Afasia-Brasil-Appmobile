import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { IWant } from '../screens/IWant';
import { YesOrNo } from '../screens/YesOrNo';
import { Activities } from '../screens/Activities';
import { Categorize } from '../screens/Activities/Categorize';
import { Relate } from '../screens/Activities/Relate';
import { Complement } from '../screens/Activities/Complement';
import { CategorizeTask } from '../screens/Activities/Categorize/CategorizeTask';
import { RelateTask } from '../screens/Activities/Relate/RelateTask';
import { ComplementTask } from '../screens/Activities/Complement/ComplementTask';
import { Synonyms } from '../screens/Activities/Synonyms';
import { SynonymsTask } from '../screens/Activities/Synonyms/SynonymsTask';
import { Antonyms } from '../screens/Activities/Antonyms';
import { AntonymsTask } from '../screens/Activities/Antonyms/AntonymsTask';
import { Report } from '../screens/Report';
import { ReportDetails } from '../screens/Report/ReportDetails';
import { ReportActivityDetails } from '../screens/Report/ReportDetails/ReportActivityDetails';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes(): JSX.Element {
  return (
    <Navigator
      headerMode="none"
      initialRouteName="Home"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="IWant" component={IWant} />
      <Screen name="YesOrNo" component={YesOrNo} />
      <Screen name="Activities" component={Activities} />
      <Screen name="Categorize" component={Categorize} />
      <Screen name="Relate" component={Relate} />
      <Screen name="Complement" component={Complement} />
      <Screen name="CategorizeTask" component={CategorizeTask} />
      <Screen name="RelateTask" component={RelateTask} />
      <Screen name="ComplementTask" component={ComplementTask} />
      <Screen name="Synonyms" component={Synonyms} />
      <Screen name="SynonymsTask" component={SynonymsTask} />
      <Screen name="Antonyms" component={Antonyms} />
      <Screen name="AntonymsTask" component={AntonymsTask} />
      <Screen name="Report" component={Report} />
      <Screen name="ReportDetails" component={ReportDetails} />
      <Screen name="ReportActivityDetails" component={ReportActivityDetails} />
    </Navigator>
  );
}
