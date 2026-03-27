import { Provider } from 'react-redux'
import { CustomProvider } from 'rsuite'
import {store} from './store/store'
import AppRouter from './routes/AppRouter'
import {  } from './apis/authApi'

export default function App() {
  return (
    <Provider store={store}>
      <CustomProvider theme="dark">
        <AppRouter />
      </CustomProvider>
    </Provider>
  )
}
