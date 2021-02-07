import Content from 'components/pages/Content';
import { store } from 'configs/storeConfig';
import { CssGlobalContext, CssGlobalContextDefaultState } from 'contexts/cssGlobal';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'ui/css/common.scss';
        
const Index = (props: any) => {

  return (
    <React.Fragment> 
      <CssGlobalContext.Provider value={CssGlobalContextDefaultState}>
        <Provider store={store}>
          <Router>
            <Content />
          </Router>
        </Provider>
      </CssGlobalContext.Provider>
    </React.Fragment> 
  );
};

ReactDOM.render(
  <Index />
  , document.getElementById('root')
)

